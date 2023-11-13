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

            try
            {
                _context.Database.OpenConnection();
                SqlParameter pStudentId = new() { ParameterName = "@studentId", SqlDbType = SqlDbType.Int, Value = command.StudentId };
                SqlParameter oCode = new() { ParameterName = "@code", SqlDbType = SqlDbType.Int, Value = command.StudentId, Direction = ParameterDirection.Output };
                await _context.Database.ExecuteSqlRawAsync("EXEC [dbo].[uspAddQualify]  @studentId, @code OUTPUT", pStudentId, oCode);

                int respId = string.IsNullOrWhiteSpace(oCode.Value.ToString()) ? 0 : int.Parse(oCode.Value.ToString());

                if (respId > 0)
                {
                    resp.Code = DataResponse.STATUS_CREADO;
                    resp.Status = true;
                    resp.IDbdGenerado = respId;
                    await transaction.CommitAsync();
                }
                else
                {
                    resp.Code = DataResponse.STATUS_ERROR;
                    resp.Status = false;
                    resp.IDbdGenerado = -1;
                    await transaction.RollbackAsync();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                resp.Code = DataResponse.STATUS_EXCEPTION;
                resp.Message = ex.Message;
                resp.Status = false;
                await transaction.RollbackAsync();
            }
            finally
            {
                _context.Database.CloseConnection();
            }

            return resp;
        }
    }
}
