using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Qualifying.Service.EventHandlers.Commands;
using Qualifying.Service.Queries.DTO.StoredProcedure;
using Qualifying.Service.Queries.StoredProcedure;
using Service.Common.Collection;

namespace Qualifying.Api.Controllers
{
    [ApiController]
    [Route("qualifying")]
    [EnableCors("AllowOrigin")]
    public class QualifyingController : ControllerBase
    {
        private readonly ILogger<QualifyingController> _logger;
        private readonly IMediator _mediator;
        private readonly string? routeRoot;
        private readonly string? _defaultConnection;
        private IConfiguration _configuration { get; }
        private readonly IGetCourseQueryService _IGetCourseQueryService;
        //private Funciones funciones = new Funciones();
        public QualifyingController(
          ILogger<QualifyingController> logger,
          IMediator mediator,
          IConfiguration configuration,
          IGetCourseQueryService IGetCourseQueryService
          )
        {
            _logger = logger;
            _mediator = mediator;
            _configuration = configuration;
            routeRoot = _configuration.GetSection("ConfigDocument").GetSection("RouteRoot").Value;
            _defaultConnection = _configuration.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value;
            _IGetCourseQueryService = IGetCourseQueryService;
        }

        [HttpGet("courses")]
        public async Task<List<GetCourseDto>> GetCourseParticipant(Int64 StudentId)
        {
            return await _IGetCourseQueryService.GetCourse(StudentId);
        }

        [HttpPost("qualify")]
        public async Task<DataResponse> GetCourseParticipant(QualifyCreateCommand comand)
        {
            return await _mediator.Send(comand);
        }
        

    }
}
