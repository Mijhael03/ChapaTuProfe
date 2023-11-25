using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Qualifying.Persistence.Database;
using Qualifying.Service.Queries.DTO.StoredProcedure;
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
    public interface IGetTeachersQueryService
    {
        Task<List<GetTeachersDto>> GetTeachers(int CourseId);
    }
    public class GetTeachersQueryService : IGetTeachersQueryService
    {
        private readonly ApplicationDbContext _context;

        public GetTeachersQueryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<GetTeachersDto>> GetTeachers(int CourseId)
        {
            SqlParameter pCourseId = new() { ParameterName = "@CourseId", SqlDbType = SqlDbType.Int, Value = CourseId };
            var collection = await _context.Teachers.FromSqlRaw("EXEC [dbo].[uspGetTeachers] @CourseId", pCourseId).ToListAsync();
            return collection.MapTo<List<GetTeachersDto>>();
        }
    }
}
