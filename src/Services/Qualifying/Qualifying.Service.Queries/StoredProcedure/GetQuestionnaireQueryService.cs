using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Qualifying.Persistence.Database;
using Qualifying.Service.Queries.DTOs.StoredProcedure;
using Service.Common.Mapping;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifying.Service.Queries.StoredProcedure
{
    public interface IGetQuestionnaireQueryService
    {
        Task<List<GetQuestionnaireDto>> GetQuestionnaire(int StudentId, int TeacherId, int CourseId, int CycleNumber);
    }
    public class GetQuestionnaireQueryService : IGetQuestionnaireQueryService
    {
        private readonly ApplicationDbContext _context;

        public GetQuestionnaireQueryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<GetQuestionnaireDto>> GetQuestionnaire(int StudentId, int TeacherId, int CourseId, int CycleNumber)
        {
            SqlParameter pStudentId = new() { ParameterName = "@StudentId", SqlDbType = SqlDbType.Int, Value = StudentId };
            SqlParameter pTeacherId = new() { ParameterName = "@TeacherId", SqlDbType = SqlDbType.Int, Value = TeacherId };
            SqlParameter pCourseId = new() { ParameterName = "@CourseId", SqlDbType = SqlDbType.Int, Value = CourseId };
            SqlParameter pCycleNumber = new() { ParameterName = "@CycleNumber", SqlDbType = SqlDbType.Int, Value = CycleNumber };
            var collection = await _context.Questionnaires.FromSqlRaw("EXEC [dbo].[uspGetQuestionnaire] @StudentId, @TeacherId, @CourseId, @CycleNumber", pStudentId, pTeacherId, pCourseId, pCycleNumber).ToListAsync();
            return collection.MapTo<List<GetQuestionnaireDto>>();
        }
    }
}
