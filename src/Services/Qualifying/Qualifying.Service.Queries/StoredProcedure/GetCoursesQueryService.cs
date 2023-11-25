using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Qualifying.Persistence.Database;
using Qualifying.Service.Queries.DTO.StoredProcedure;
using Service.Common.Mapping;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifying.Service.Queries.StoredProcedure
{
    public interface IGetCoursesQueryService
    {
        Task<List<GetCoursesDto>> GetCourses(int StudentId, int CareerId);
    }
    public class GetCoursesQueryService : IGetCoursesQueryService
    {
        private readonly ApplicationDbContext _context;

        public GetCoursesQueryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<GetCoursesDto>> GetCourses(int StudentId, int CareerId)
        {
            SqlParameter pStudentId = new() { ParameterName = "@StudentId", SqlDbType = SqlDbType.Int, Value = StudentId };
            SqlParameter pCareerId = new() { ParameterName = "@CareerId", SqlDbType = SqlDbType.Int, Value = CareerId };
            var collection = await _context.Courses.FromSqlRaw("EXEC [dbo].[uspGetCourses] @StudentId, @CareerId", pStudentId, pCareerId).ToListAsync();
            return collection.MapTo<List<GetCoursesDto>>();
        }
    }
}
