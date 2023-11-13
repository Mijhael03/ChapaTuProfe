using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifying.Domain
{
    public class Course
    {
        public int CourseId { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
    }
}
