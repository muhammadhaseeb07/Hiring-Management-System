using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HMS_API.Models
{
    public class Job_Offer
    {
        public int job_ID { get; set; }
        public int can_ID { get; set; }
        public int Salary { get; set; }
        public DateTime Joining_Date { get; set; }
    }
}