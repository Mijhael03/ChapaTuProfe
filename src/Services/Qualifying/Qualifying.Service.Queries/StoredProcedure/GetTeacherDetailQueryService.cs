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
    public interface IGetTeacherDetailQueryService
    {
        Task<List<GetTeacherDetailDto>> GetTeacherDetail(int TeacherId, int courseId);
    }
    public class GetTeacherDetailQueryService : IGetTeacherDetailQueryService
    {
        private readonly ApplicationDbContext _context;

        public GetTeacherDetailQueryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<GetTeacherDetailDto>> GetTeacherDetail(int TeacherId, int courseId)
        {
            SqlParameter pTeacherId = new() { ParameterName = "@TeacherId", SqlDbType = SqlDbType.Int, Value = TeacherId };
            SqlParameter pCourseId = new() { ParameterName = "@CourseId", SqlDbType = SqlDbType.Int, Value = courseId };
            var collection = await _context.TeachersDetail.FromSqlRaw("EXEC [dbo].[uspGetTeacherDetail] @TeacherId, @CourseId", pTeacherId, pCourseId).ToListAsync();
            return collection.MapTo<List<GetTeacherDetailDto>>();
        }
    }
}
