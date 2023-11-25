using MediatR;
using Service.Common.Collection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifying.Service.EventHandlers.Commands
{
    public class QualifyCreateCommand : IRequest<DataResponse>
    {
        public int StudentId { get; set; }
        public int TeacherId { get; set; }
        public int CourseId { get; set; }
        public int CareerId { get; set; }
        public int CycleNumber { get; set; }
        public int QualificationTotal { get; set; }
        public decimal QuestionScoreAverage { get; set; }
        public string? User { get; set; }
        public QualifyDetail[]? Detail { get; set; }
    }

    public class QualifyDetail
    {
        public int QuestionNumber { get; set; }
        public int QuestionSequence { get; set; }
        public int Score { get; set; }
    }
}
