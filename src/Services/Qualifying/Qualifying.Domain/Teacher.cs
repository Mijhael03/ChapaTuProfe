﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qualifying.Domain
{
    public class Teacher
    {
        public int TeacherId { get; set; }
        public string? Code { get; set; }
        public string? Name { get; set; }
        public string? Photo { get; set; }
        public string? CourseName { get; set; }
    }
}
