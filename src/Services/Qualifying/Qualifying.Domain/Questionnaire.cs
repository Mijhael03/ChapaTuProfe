using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifying.Domain
{
    public class Questionnaire
    {
        public int QuestionNumber { get; set; }
        public int SequenceQuestion { get; set; }
        public string? Description { get; set; }
    }
}
