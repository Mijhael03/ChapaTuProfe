using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Authentication.Domain
{
    public class User
    {
        public int UserId { get; set; }
        public int CareerId { get; set; }
        public int CycleNumber { get; set; }
        public int RolId { get; set; }
        public string? Code { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Status { get; set; }
    }
}
