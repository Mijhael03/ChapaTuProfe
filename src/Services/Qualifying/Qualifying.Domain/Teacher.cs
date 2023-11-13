using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifying.Domain
{
    public class Teacher
    {
        public Int64 TeacherId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Photo { get; set; }
        public string Status { get; set; }
        public string OverallGrade { get; set; }
        public Int64 HasQualify { get; set; }
    }
}
