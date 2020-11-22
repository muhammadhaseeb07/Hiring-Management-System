using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HMS_API.Models
{
    public class Employee
    {
        public int emp_ID { get; set; }
        public string username { get; set; }
        public string passwordd { get; set; }
        public DateTime D_O_B { get; set; }
        public int Dept_no { get; set; }
        public string Job_Title { get; set; }
        public string permanent_Address { get; set; }
        public string current_address { get; set; }
        public string Gender { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public string Father_Name { get; set; }
        public string degree { get; set; }
        public string Email { get; set; }
        public string Employee_type { get; set; }
        public int Salary { get; set; }
        public DateTime Joining_Date { get; set; }
        public string Home { get; set; }
        public string Mobile { get; set; }
        public string CNIC { get; set; }
        public string Duration_of_Degree { get; set; }
        public string Institute { get; set; }
        public decimal CGPA { get; set; }
        public string Experience { get; set; }
    }
}