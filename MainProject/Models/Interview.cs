using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MainProject.Models
{
    public class Interview
    {
        public int int_ID { get; set; }
        public int Emp_ID { get; set; }
        public int Can_ID { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
    }
}