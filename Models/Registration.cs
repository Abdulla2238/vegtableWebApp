﻿using System;
using System.Collections.Generic;

namespace ApiCreation.Models
{
    public partial class Registration
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
