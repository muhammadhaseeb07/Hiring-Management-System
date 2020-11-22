using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HMS_API.Models
{
    public class Evaluation
    {
        public int Eval_ID { get; set; }
        public string Past_work_experience { get; set; }
        public int int_ID { get; set; }
        public string technical_qualification { get; set; }
        public string Leadership_ability { get; set; }
        public string customer_service_skills { get; set; }
        public string communication_skills { get; set; }
        public string overall_impression { get; set; }
        public string comments { get; set; }
        public string candidate_enthusiasm { get; set; }
        public string administrative_skills { get; set; }
        public string educational_background { get; set; }
    }
}