using Authentication.Service.Queries.DTOs.RequestFilter;
using Authentication.Service.Queries.DTOs.StoredProcedure;
using Authentication.Service.Queries.StoredProcedure;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Service.Common.Util;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authentication.Api.Controllers
{
    [ApiController]
    [Route("auth")]
    [EnableCors("AllowOrigin")]
    public class AuthenticationController : ControllerBase
    {
        private readonly string? _keyData;
        private IConfiguration _configuration { get; }
        private readonly IGetUserQueryService _IGetUserQueryService;

        public AuthenticationController(
          IConfiguration configuration,
          IGetUserQueryService IGetUserQueryService
          )
        {
            _configuration = configuration;
            _keyData = _configuration.GetSection("ConfigDocument").GetSection("keyData").Value;
            _IGetUserQueryService = IGetUserQueryService;
        }

        [HttpPost]
        public async Task<GetUserDto?> Auth(RequestGetUser request)
        {
            GetUserDto? result = await _IGetUserQueryService.GetUser(request.code, request.password);

            if (result != null)
            {
                result.Token = GetToken(request);
            }

            return result;
        }

        private string GetToken(RequestGetUser request)
        {
            // generate token that is valid for 7 days
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(_keyData);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("user", request.code), new Claim("code", request.password) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
