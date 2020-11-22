using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HMS_API.Models
{
    public class Request
    {
        public int Req_ID { get; set; }
        public int Dept_no { get; set; }
        public string Domain { get; set; }
        public string Sub__Domain { get; set; }
        public string Experience { get; set; }
        public int Vacancies { get; set; }
        public string Job_Position { get; set; }
        public DateTime Expected_Joining_Date { get; set; }
        public string Descriptionn { get; set; }
        public int StatusOfReq { get; set; }
    }
}