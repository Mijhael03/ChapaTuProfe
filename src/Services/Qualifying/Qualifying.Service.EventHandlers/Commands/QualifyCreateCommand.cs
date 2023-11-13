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
        public int CourseId { get; set; }
        public int TeacherId { get; set; }
    }
}
