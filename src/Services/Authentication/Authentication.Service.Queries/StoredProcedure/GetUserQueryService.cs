using Authentication.Persistence.Database;
using Authentication.Service.Queries.DTOs.StoredProcedure;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Service.Common.Mapping;
using System.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Authentication.Service.Queries.StoredProcedure
{
    public interface IGetUserQueryService
    {
        Task<GetUserDto> GetUser(string? code, string? password);
    }
    public class GetUserQueryService : IGetUserQueryService
    {
        private readonly ApplicationDbContext _context;

        public GetUserQueryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<GetUserDto?> GetUser(string? code, string? password)
        {
            SqlParameter pCode = new() { ParameterName = "@code", SqlDbType = SqlDbType.VarChar, Value = code };
            SqlParameter pPassword = new() { ParameterName = "@Password", SqlDbType = SqlDbType.VarChar, Value = password };
            var collection = await _context.Users.FromSqlRaw("EXEC [dbo].[uspGetUser] @Code, @Password", pCode, pPassword).ToListAsync();

            if(collection.Count > 0)
            {
                return collection.First().MapTo<GetUserDto>();
            }
            else
            {
                return null;
            }
        }
    }
}
