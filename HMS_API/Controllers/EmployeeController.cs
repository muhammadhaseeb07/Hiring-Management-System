using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HMS_API.Models;

namespace HMS_API.Controllers
{
    public class EmployeeController : ApiController
    {

        private string conn = ConfigurationManager.ConnectionStrings["HRMSystem"].ConnectionString;

        [HttpGet]
        [Route("api/Employee")]
        public IHttpActionResult GetDetailList()
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from employees", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                                select new
                                {
                                    emp_ID = item.Field<int>("emp_ID"),
                                    username = item.Field<string>("username"),
                                    passwordd = item.Field<string>("passwordd"),
                                    D_O_B = item.Field<DateTime>("D_O_B"),
                                    Dept_no = item.Field<int>("Dept_no"),
                                    Job_Title = item.Field<string>("Job_Title"),
                                    permanent_Address = item.Field<string>("permanent_Address"),
                                    current_address = item.Field<string>("current_address"),
                                    Gender = item.Field<string>("Gender"),
                                    First_Name = item.Field<string>("First_Name"),
                                    Last_Name = item.Field<string>("Last_Name"),
                                    Father_Name = item.Field<string>("Father_Name"),
                                    degree = item.Field<string>("degree"),
                                    Email = item.Field<string>("Email"),
                                    Employee_type = item.Field<string>("Employee_type"),
                                    Salary = item.Field<int>("Salary"),
                                    Joining_Date = item.Field<DateTime>("Joining_Date"),
                                    Home = item.Field<string>("Home"),
                                    Mobile = item.Field<string>("Mobile"),
                                    CNIC = item.Field<string>("CNIC"),
                                    Duration_of_Degree = item.Field<string>("Duration_of_Degree"),
                                    Institute = item.Field<string>("Institute"),
                                    CGPA = item.Field<decimal>("CGPA"),
                                    Experience = item.Field<string>("Experience"),
                                }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Employee = List } });
        }

        [HttpGet]
        [Route("api/Employee")]
        public IHttpActionResult GetDetailByID(int id)
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from employees where emp_ID='"+id+"'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                                select new
                                {
                                    emp_ID = item.Field<int>("emp_ID"),
                                    username = item.Field<string>("username"),
                                    passwordd = item.Field<string>("passwordd"),
                                    D_O_B = item.Field<DateTime>("D_O_B"),
                                    Dept_no = item.Field<int>("Dept_no"),
                                    Job_Title = item.Field<string>("Job_Title"),
                                    permanent_Address = item.Field<string>("permanent_Address"),
                                    current_address = item.Field<string>("current_address"),
                                    Gender = item.Field<string>("Gender"),
                                    First_Name = item.Field<string>("First_Name"),
                                    Last_Name = item.Field<string>("Last_Name"),
                                    Father_Name = item.Field<string>("Father_Name"),
                                    degree = item.Field<string>("degree"),
                                    Email = item.Field<string>("Email"),
                                    Employee_type = item.Field<string>("Employee_type"),
                                    Salary = item.Field<int>("Salary"),
                                    Joining_Date = item.Field<DateTime>("Joining_Date"),
                                    Home = item.Field<string>("Home"),
                                    Mobile = item.Field<string>("Mobile"),
                                    CNIC = item.Field<string>("CNIC"),
                                    Duration_of_Degree = item.Field<string>("Duration_of_Degree"),
                                    Institute = item.Field<string>("Institute"),
                                    CGPA = item.Field<decimal>("CGPA"),
                                    Experience = item.Field<string>("Experience"),
                                }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Employee = List } });
        }

        [HttpGet]
        [Route("api/EmployeeLogin")]
        public IHttpActionResult employeeLogin(string username,string password)
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from employees where username='" + username + "' and passwordd = '"+ password + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                                select new
                                {
                                    emp_ID = item.Field<int>("emp_ID"),
                                    username = item.Field<string>("username"),
                                    passwordd = item.Field<string>("passwordd"),
                                    D_O_B = item.Field<DateTime>("D_O_B"),
                                    Dept_no = item.Field<int>("Dept_no"),
                                    Job_Title = item.Field<string>("Job_Title"),
                                    permanent_Address = item.Field<string>("permanent_Address"),
                                    current_address = item.Field<string>("current_address"),
                                    Gender = item.Field<string>("Gender"),
                                    First_Name = item.Field<string>("First_Name"),
                                    Last_Name = item.Field<string>("Last_Name"),
                                    Father_Name = item.Field<string>("Father_Name"),
                                    degree = item.Field<string>("degree"),
                                    Email = item.Field<string>("Email"),
                                    Employee_type = item.Field<string>("Employee_type"),
                                    Salary = item.Field<int>("Salary"),
                                    Joining_Date = item.Field<DateTime>("Joining_Date"),
                                    Home = item.Field<string>("Home"),
                                    Mobile = item.Field<string>("Mobile"),
                                    CNIC = item.Field<string>("CNIC"),
                                    Duration_of_Degree = item.Field<string>("Duration_of_Degree"),
                                    Institute = item.Field<string>("Institute"),
                                    CGPA = item.Field<decimal>("CGPA"),
                                    Experience = item.Field<string>("Experience"),
                                }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Employee = List } });
        }

        [HttpPost]
        [Route("api/Employee")]
        public IHttpActionResult deleteEmployee(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from employees where emp_ID = '"+id+"'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("empDelete", con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", id);
                        cmd.ExecuteNonQuery();
                        con.Close();
                    }
                    else
                    {
                        return Json(new { Status = false, Message = (id.ToString() + " is not Exist") });
                    }
                }

            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Data Successfull Deleted" });
        }

        [HttpPost]
        [Route("api/Employee")]
        public IHttpActionResult updateEmployee(int id,Employee emp)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from employees where emp_ID = '" + id + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("empUpdate", con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@emp_ID", emp.emp_ID);
                        cmd.Parameters.AddWithValue("@username", emp.username);
                        cmd.Parameters.AddWithValue("@passwordd", emp.passwordd);
                        cmd.Parameters.AddWithValue("@D_O_B", emp.D_O_B);
                        cmd.Parameters.AddWithValue("@Dept_no", emp.Dept_no);
                        cmd.Parameters.AddWithValue("@Job_Title", emp.Job_Title);
                        cmd.Parameters.AddWithValue("@permanent_Address", emp.permanent_Address);
                        cmd.Parameters.AddWithValue("@current_address", emp.current_address);
                        cmd.Parameters.AddWithValue("@Gender", emp.Gender);
                        cmd.Parameters.AddWithValue("@First_Name", emp.First_Name);
                        cmd.Parameters.AddWithValue("@Last_Name", emp.Last_Name);
                        cmd.Parameters.AddWithValue("@Father_Name", emp.Father_Name);
                        cmd.Parameters.AddWithValue("@degree", emp.degree);
                        cmd.Parameters.AddWithValue("@Email", emp.Email);
                        cmd.Parameters.AddWithValue("@Employee_type", emp.Employee_type);
                        cmd.Parameters.AddWithValue("@Salary", emp.Salary);
                        cmd.Parameters.AddWithValue("@Joining_Date", emp.Joining_Date);
                        cmd.Parameters.AddWithValue("@Home", emp.Home);
                        cmd.Parameters.AddWithValue("@Mobile", emp.Mobile);
                        cmd.Parameters.AddWithValue("@CNIC", emp.CNIC);
                        cmd.Parameters.AddWithValue("@Duration_of_Degree", emp.Duration_of_Degree);
                        cmd.Parameters.AddWithValue("@Institute", emp.Institute);
                        cmd.Parameters.AddWithValue("@CGPA", emp.CGPA);
                        cmd.Parameters.AddWithValue("@Experience", emp.Experience);
                        cmd.ExecuteNonQuery();
                        con.Close();
                    }
                    else
                    {
                        return Json(new { Status = false, Message = (id.ToString() + " is not Exist") });
                    }
                }

            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Data Successfull Updated" });
        }

        [HttpPost]
        [Route("api/Employee")]
        public IHttpActionResult insertEmployee(Employee emp)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("empInsert", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@username", emp.username);
                    cmd.Parameters.AddWithValue("@passwordd", emp.passwordd);
                    cmd.Parameters.AddWithValue("@D_O_B", emp.D_O_B);
                    cmd.Parameters.AddWithValue("@Dept_no", emp.Dept_no);
                    cmd.Parameters.AddWithValue("@Job_Title", emp.Job_Title);
                    cmd.Parameters.AddWithValue("@permanent_Address", emp.permanent_Address);
                    cmd.Parameters.AddWithValue("@current_address", emp.current_address);
                    cmd.Parameters.AddWithValue("@Gender", emp.Gender);
                    cmd.Parameters.AddWithValue("@First_Name", emp.First_Name);
                    cmd.Parameters.AddWithValue("@Last_Name", emp.Last_Name);
                    cmd.Parameters.AddWithValue("@Father_Name", emp.Father_Name);
                    cmd.Parameters.AddWithValue("@degree", emp.degree);
                    cmd.Parameters.AddWithValue("@Email", emp.Email);
                    cmd.Parameters.AddWithValue("@Employee_type", emp.Employee_type);
                    cmd.Parameters.AddWithValue("@Salary", emp.Salary);
                    cmd.Parameters.AddWithValue("@Joining_Date", emp.Joining_Date);
                    cmd.Parameters.AddWithValue("@Home", emp.Home);
                    cmd.Parameters.AddWithValue("@Mobile", emp.Mobile);
                    cmd.Parameters.AddWithValue("@CNIC", emp.CNIC);
                    cmd.Parameters.AddWithValue("@Duration_of_Degree", emp.Duration_of_Degree);
                    cmd.Parameters.AddWithValue("@Institute", emp.Institute);
                    cmd.Parameters.AddWithValue("@CGPA", emp.CGPA);
                    cmd.Parameters.AddWithValue("@Experience", emp.Experience);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }

            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Data Successfull Updated" });
        }
    }
}
