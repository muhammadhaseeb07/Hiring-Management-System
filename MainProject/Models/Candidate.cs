using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MainProject.Models
{
    public class Candidate
    {
        public int Can_ID { get; set; }
        public string Fathers_Name { get; set; }
        public DateTime DOB { get; set; }
        public string Gender { get; set; }
        public string CNIC { get; set; }
        public string Permanent_Address { get; set; }
        public string Current_Address { get; set; }
        public string username { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public int Job_ID { get; set; }
        public string Email { get; set; }
        public string Experience { get; set; }
        public string password1 { get; set; }
        public decimal CGPA { get; set; }
        public string Institute { get; set; }
        public string Duration_of_Degree { get; set; }
        public string Degree { get; set; }
        public string Mobile { get; set; }
        public string Home { get; set; }
    }
}