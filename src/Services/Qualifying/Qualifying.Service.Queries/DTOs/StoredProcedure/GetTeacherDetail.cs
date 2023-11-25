using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifying.Service.Queries.DTOs.StoredProcedure
{
    public class GetTeacherDetailDto
    {
        public string? QuestionDescription { get; set; }
        public decimal QuestionScoreAverage { get; set; }
        public decimal QualificationAverage { get; set; }
        public int QualificationQuantity { get; set; }
        public string? CourseName { get; set; }
        public string? TeacherCodeName { get; set; }
        public string? TeacherPhoto { get; set; }
    }
}
