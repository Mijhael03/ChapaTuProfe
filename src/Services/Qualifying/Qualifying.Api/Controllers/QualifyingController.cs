using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Qualifying.Service.EventHandlers.Commands;
using Qualifying.Service.Queries.DTO.StoredProcedure;
using Qualifying.Service.Queries.DTOs.StoredProcedure;
using Qualifying.Service.Queries.StoredProcedure;
using Service.Common.Collection;
using Service.Common.Util;

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
        private readonly IGetCoursesQueryService _IGetCoursesQueryService;
        private readonly IGetTeachersQueryService _IGetTeachersQueryService;
        private readonly IGetTeacherDetailQueryService _IGetTeacherDetailQueryService;
        private readonly IGetQuestionnaireQueryService _IGetQuestionnaireQueryService;
        public QualifyingController(
          ILogger<QualifyingController> logger,
          IMediator mediator,
          IConfiguration configuration,
          IGetCoursesQueryService IGetCourseQueryService,
          IGetTeachersQueryService IGetTeachersQueryService,
          IGetTeacherDetailQueryService IGetTeacherDetailQueryService,
          IGetQuestionnaireQueryService IGetQuestionnaireQueryService
          )
        {
            _logger = logger;
            _mediator = mediator;
            _configuration = configuration;
            routeRoot = _configuration.GetSection("ConfigDocument").GetSection("RouteRoot").Value;
            _defaultConnection = _configuration.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value;
            _IGetCoursesQueryService = IGetCourseQueryService;
            _IGetTeachersQueryService = IGetTeachersQueryService;
            _IGetTeacherDetailQueryService = IGetTeacherDetailQueryService;
            _IGetQuestionnaireQueryService = IGetQuestionnaireQueryService;
        }

        [HttpGet("courses")]
        public async Task<List<GetCoursesDto>> GetCourses(int StudentId, int CareerId)
        {
            return await _IGetCoursesQueryService.GetCourses(StudentId, CareerId);
        }

        [HttpGet("teachers")]
        public async Task<List<GetTeachersDto>> GetTeachers(int CourseId)
        {
            return await _IGetTeachersQueryService.GetTeachers(CourseId);
        }

        [HttpGet("teacher/detail")]
        public async Task<List<GetTeacherDetailDto>> GetTeacherDetail(int TeacherId, int courseId)
        {
            return await _IGetTeacherDetailQueryService.GetTeacherDetail(TeacherId, courseId);
        }

        [HttpGet("questionnaire")]
        public async Task<List<GetQuestionnaireDto>> GetQuestionnaire(int StudentId, int TeacherId, int CourseId, int CycleNumber)
        {
            return await _IGetQuestionnaireQueryService.GetQuestionnaire(StudentId, TeacherId, CourseId, CycleNumber);
        }

        [HttpPost("qualify")]
        public async Task<DataResponse> Qualify(QualifyCreateCommand comand)
        {
            return await _mediator.Send(comand);
        }
    }
}
