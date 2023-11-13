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
    public interface IGetCourseQueryService
    {
        Task<List<GetCourseDto>> GetCourse(Int64 StudentId);
    }
    public class GetCourseQueryService : IGetCourseQueryService
    {
        private readonly ApplicationDbContext _context;

        public GetCourseQueryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<GetCourseDto>> GetCourse(Int64 StudentId)
        {
            var collection = await _context.Courses.FromSqlRaw("EXEC [dbo].[GetCourse] @StudentId", StudentId).ToListAsync();

            return collection.MapTo<List<GetCourseDto>>();
        }
    }
}
