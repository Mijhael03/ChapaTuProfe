using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifying.Service.Queries.DTOs.StoredProcedure
{
    public class GetQuestionnaireDto
    {
        public int QuestionNumber { get; set; }
        public int SequenceQuestion { get; set; }
        public string? Description { get; set; }
    }
}
