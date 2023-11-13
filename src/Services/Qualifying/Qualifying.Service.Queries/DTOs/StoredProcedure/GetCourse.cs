using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifying.Service.Queries.DTO.StoredProcedure
{
    public class GetCourseDto
    {
        public Int64 UserId { get; set; }
        public Int64 RolId { get; set; }
        public string? Code { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Photo { get; set; }
        public string? Status { get; set; }
    }
}
