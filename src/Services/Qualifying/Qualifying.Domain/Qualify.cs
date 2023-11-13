using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifying.Domain
{
    public class Qualify
    {
        public Int64 QualifyId { get; set; }
        public Int64 QuestionnaireId { get; set; }
        public Int64 QuestionnaireSequence { get; set; }
        public string QuestionnaireDescription { get; set; }
        public Int64 Score { get; set; }
    }
}
