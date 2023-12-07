using MediatR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Qualifying.Persistence.Database;
using Qualifying.Service.EventHandlers.Commands;
using Service.Common.Collection;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Formats.Asn1.AsnWriter;

namespace Qualifying.Service.EventHandlers.StoredProcedure
{
    public class QualifyCreateEventHandler : IRequestHandler<QualifyCreateCommand, DataResponse>
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<QualifyCreateEventHandler> _logger;

        public QualifyCreateEventHandler(ApplicationDbContext context, ILogger<QualifyCreateEventHandler> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<DataResponse> Handle(QualifyCreateCommand command, CancellationToken cancellationToken)
        {
            using var transaction = _context.Database.BeginTransaction();
            DataResponse resp = new();
            resp.Code = DataResponse.STATUS_ERROR;
            resp.Status = false;
            resp.IDbdGenerado = -1;
            try
            {
                _context.Database.OpenConnection();
                SqlParameter pStudentId = new() { ParameterName = "@StudentId", SqlDbType = SqlDbType.Int, Value = command.StudentId };
                SqlParameter pTeacherId = new() { ParameterName = "@TeacherId", SqlDbType = SqlDbType.Int, Value = command.TeacherId };
                SqlParameter pCourseId = new() { ParameterName = "@CourseId", SqlDbType = SqlDbType.Int, Value = command.CourseId };
                SqlParameter pCareerId = new() { ParameterName = "@CareerId", SqlDbType = SqlDbType.Int, Value = command.CareerId };
                SqlParameter pCycleNumber = new() { ParameterName = "@CycleNumber", SqlDbType = SqlDbType.Int, Value = command.CycleNumber };
                SqlParameter pQualificationTotal = new() { ParameterName = "@QualificationTotal", SqlDbType = SqlDbType.Int, Value = command.QualificationTotal };
                SqlParameter pQuestionScoreAverage = new() { ParameterName = "@QuestionScoreAverage", SqlDbType = SqlDbType.Int, Value = command.QuestionScoreAverage };
                SqlParameter pUser = new() { ParameterName = "@User", SqlDbType = SqlDbType.VarChar, Value = command.User };
                SqlParameter oCode = new() { ParameterName = "@Code", SqlDbType = SqlDbType.Int, Direction = ParameterDirection.Output };
                await _context.Database.ExecuteSqlRawAsync("EXEC [dbo].[uspAddQualify]  @studentId, @TeacherId, @CourseId, @CareerId, @CycleNumber, @QualificationTotal, @QuestionScoreAverage, @User, @Code OUTPUT",
                                                                                        pStudentId, pTeacherId, pCourseId, pCareerId, pCycleNumber, pQualificationTotal, pQuestionScoreAverage, pUser, oCode);

                int QualifyId = string.IsNullOrEmpty(oCode.Value.ToString()) ? 0 : int.Parse(oCode.Value.ToString());

                if (QualifyId <= 0)
                {
                    await transaction.RollbackAsync();
                    if (QualifyId == -3)
                    {
                        return MessageError("Usted ya cuenta con un registro de calificación");
                    }
                    else
                    {
                        return MessageError("Algo ocurrió, por favor vuelva ha intentarlo en unos segundos");
                    }
                }

                foreach (QualifyDetail item in command.Detail)
                {
                    SqlParameter pQualifyDetId = new() { ParameterName = "@QualifyId", SqlDbType = SqlDbType.Int, Value = QualifyId };
                    SqlParameter pQuestionNumber = new() { ParameterName = "@QuestionNumber", SqlDbType = SqlDbType.Int, Value = item.QuestionNumber };
                    SqlParameter pQuestionSequence = new() { ParameterName = "@QuestionSequence", SqlDbType = SqlDbType.Int, Value = item.QuestionSequence };
                    SqlParameter pScore = new() { ParameterName = "@Score", SqlDbType = SqlDbType.Int, Value = item.Score };
                    SqlParameter oCodeDetail = new() { ParameterName = "@Code", SqlDbType = SqlDbType.Int, Direction = ParameterDirection.Output };
                    await _context.Database.ExecuteSqlRawAsync("EXEC [dbo].[uspAddQualifyDetail]  @QualifyId, @QuestionNumber, @QuestionSequence, @Score, @User, @Code OUTPUT",
                                                                                               pQualifyDetId, pQuestionNumber, pQuestionSequence, pScore, pUser, oCodeDetail);

                    int QualifyDetId = string.IsNullOrEmpty(oCodeDetail.Value.ToString()) ? 0 : int.Parse(oCodeDetail.Value.ToString());

                    if (QualifyDetId <= 0)
                    {
                        await transaction.RollbackAsync();
                        return MessageError("Por favor vuelva ha intentarlo en unos segundos");
                    }
                }

                if (QualifyId > 0)
                {
                    resp.Code = DataResponse.STATUS_CREADO;
                    resp.Message = "Su calificación ha sido registrado correctamente";
                    resp.Status = true;
                    resp.IDbdGenerado = QualifyId;
                    await transaction.CommitAsync();
                }
                else
                {
                    await transaction.RollbackAsync();
                    return MessageError("Vuelva ha intentarlo en unos segundos");
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                resp.Code = DataResponse.STATUS_EXCEPTION;
                resp.Message = ex.Message;
                resp.Status = false;
                resp.IDbdGenerado = -1;
                await transaction.RollbackAsync();
            }
            finally
            {
                _context.Database.CloseConnection();
            }

            return resp;
        }

        public static DataResponse MessageError(string message)
        {
            DataResponse resp = new()
            {
                Code = DataResponse.STATUS_ERROR,
                Message = message,
                Status = false,
                IDbdGenerado = -1
            };
            return resp;
        }
    }
}
