using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Configuration ;
using HMS_API.Models;

namespace HMS_API.Controllers
{
    public class CandidateController : ApiController
    {
        private string conn = ConfigurationManager.ConnectionStrings["HRMSystem"].ConnectionString;
        
        [HttpGet]
        [Route("api/Candidate")]
        public IHttpActionResult GetDetailList()
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Candidate", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                            select new
                            {
                                Can_ID = item.Field<int>("Can_ID"),
                                Father_Name = item.Field<string>("Fathers_Name"),
                                DOB = item.Field<DateTime>("DOB"),
                                Gender = item.Field<string>("Gender"),
                                CNIC = item.Field<string>("CNIC"),
                                Permanent_Address = item.Field<string>("Permanent_Address"),
                                Current_Address = item.Field<string>("Current_Address"),
                                username = item.Field<string>("username"),
                                First_Name = item.Field<string>("First_Name"),
                                Last_Name = item.Field<string>("Last_Name"),
                                Job_ID = item.Field<int>("Job_ID"),
                                Email = item.Field<string>("Email"),
                                Experience = item.Field<string>("Experience"),
                                password1 = item.Field<string>("password1"),
                                CGPA = item.Field<decimal>("CGPA"),
                                Institute = item.Field<string>("Institute"),
                                Duration_of_Degree = item.Field<string>("Duration_of_Degree"),
                                Degree = item.Field<string>("Degree"),
                                Mobile = item.Field<string>("Mobile"),
                                Home = item.Field<string>("Home"),
                            }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Candidate = List } });
        }
        [HttpGet]
        [Route("api/Candidate")]
        public IHttpActionResult GetDetailbyID(int id)
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Candidate where Can_ID ='"+id+"'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                                select new
                                {
                                    Can_ID = item.Field<int>("Can_ID"),
                                    Father_Name = item.Field<string>("Fathers_Name"),
                                    DOB = item.Field<DateTime>("DOB"),
                                    Gender = item.Field<string>("Gender"),
                                    CNIC = item.Field<string>("CNIC"),
                                    Permanent_Address = item.Field<string>("Permanent_Address"),
                                    Current_Address = item.Field<string>("Current_Address"),
                                    username = item.Field<string>("username"),
                                    First_Name = item.Field<string>("First_Name"),
                                    Last_Name = item.Field<string>("Last_Name"),
                                    Job_ID = item.Field<int>("Job_ID"),
                                    Email = item.Field<string>("Email"),
                                    Experience = item.Field<string>("Experience"),
                                    password1 = item.Field<string>("password1"),
                                    CGPA = item.Field<decimal>("CGPA"),
                                    Institute = item.Field<string>("Institute"),
                                    Duration_of_Degree = item.Field<string>("Duration_of_Degree"),
                                    Degree = item.Field<string>("Degree"),
                                    Mobile = item.Field<string>("Mobile"),
                                    Home = item.Field<string>("Home"),
                                }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Candidate = List } });
        }

        //Login
        [HttpGet]
        [Route("api/Login")]
        public IHttpActionResult authenticateUser(string username , string password)
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Candidate where username ='" + username + "' and password1='"+ password + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                                select new
                                {
                                    Can_ID = item.Field<int>("Can_ID"),
                                    Fathers_Name = item.Field<string>("Fathers_Name"),
                                    DOB = item.Field<DateTime>("DOB"),
                                    Gender = item.Field<string>("Gender"),
                                    CNIC = item.Field<string>("CNIC"),
                                    Permanent_Address = item.Field<string>("Permanent_Address"),
                                    Current_Address = item.Field<string>("Current_Address"),
                                    username = item.Field<string>("username"),
                                    First_Name = item.Field<string>("First_Name"),
                                    Last_Name = item.Field<string>("Last_Name"),
                                    Job_ID = item.Field<int>("Job_ID"),
                                    Email = item.Field<string>("Email"),
                                    Experience = item.Field<string>("Experience"),
                                    password1 = item.Field<string>("password1"),
                                    CGPA = item.Field<decimal>("CGPA"),
                                    Institute = item.Field<string>("Institute"),
                                    Duration_of_Degree = item.Field<string>("Duration_of_Degree"),
                                    Degree = item.Field<string>("Degree"),
                                    Mobile = item.Field<string>("Mobile"),
                                    Home = item.Field<string>("Home"),
                                }).ToList();
                    }
                    else
                    {
                        return Json(new { Status = false, Message = ("Username or Password might be wrong") });

                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Successfully Login", Data = new { Candidate = List } });
        }
        [HttpPost]
        [Route("api/updateCandidate")]
        public IHttpActionResult updateCandidate(Candidate cand)
        {
            try
            {
                int id = cand.Can_ID;
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Candidate where Can_ID ='" + id + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("candidateDataUpdate", con);
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@id", cand.Can_ID);
                        cmd.Parameters.AddWithValue("@father_name", cand.Fathers_Name);
                        cmd.Parameters.AddWithValue("@dob", cand.DOB);
                        cmd.Parameters.AddWithValue("@Gender", cand.Gender);
                        cmd.Parameters.AddWithValue("@CNIC", cand.CNIC);
                        cmd.Parameters.AddWithValue("@PA", cand.Permanent_Address);
                        cmd.Parameters.AddWithValue("@CA", cand.Current_Address);
                        cmd.Parameters.AddWithValue("@Username", cand.username);
                        cmd.Parameters.AddWithValue("@first_name", cand.First_Name);
                        cmd.Parameters.AddWithValue("@last_name", cand.Last_Name);
                        cmd.Parameters.AddWithValue("@job_ID", cand.Job_ID);
                        cmd.Parameters.AddWithValue("@Mail", cand.Email);
                        cmd.Parameters.AddWithValue("@Experience", cand.Experience);
                        cmd.Parameters.AddWithValue("@pass", cand.password1);
                        cmd.Parameters.AddWithValue("@CGPA", cand.CGPA);
                        cmd.Parameters.AddWithValue("@Institute", cand.Institute);
                        cmd.Parameters.AddWithValue("@Duration_of_Degree", cand.Duration_of_Degree);
                        cmd.Parameters.AddWithValue("@Degree", cand.Degree);
                        cmd.Parameters.AddWithValue("@Mobile", cand.Mobile);
                        cmd.Parameters.AddWithValue("@Home", cand.Home);
                        cmd.ExecuteNonQuery();
                        con.Close();
                    }
                    else
                    {
                        return Json(new { Status = false, Message = (cand.Can_ID.ToString()+" is not Exist")});
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
        [Route("api/insertCandidate")]
        public IHttpActionResult insertCandidate(Candidate cand)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("candidateDataInsert", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    
                    cmd.Parameters.AddWithValue("@father_name", cand.Fathers_Name);
                    cmd.Parameters.AddWithValue("@dob", cand.DOB);
                    cmd.Parameters.AddWithValue("@Gender", cand.Gender);
                    cmd.Parameters.AddWithValue("@CNIC", cand.CNIC);
                    cmd.Parameters.AddWithValue("@PA", cand.Permanent_Address);
                    cmd.Parameters.AddWithValue("@CA", cand.Current_Address);
                    cmd.Parameters.AddWithValue("@Username", cand.username);
                    cmd.Parameters.AddWithValue("@first_name", cand.First_Name);
                    cmd.Parameters.AddWithValue("@last_name", cand.Last_Name);
                    cmd.Parameters.AddWithValue("@job_ID", cand.Job_ID);
                    cmd.Parameters.AddWithValue("@Mail", cand.Email);
                    cmd.Parameters.AddWithValue("@Experience", cand.Experience);
                    cmd.Parameters.AddWithValue("@pass", cand.password1);
                    cmd.Parameters.AddWithValue("@CGPA", cand.CGPA);
                    cmd.Parameters.AddWithValue("@Institute", cand.Institute);
                    cmd.Parameters.AddWithValue("@Duration_of_Degree", cand.Duration_of_Degree);
                    cmd.Parameters.AddWithValue("@Degree", cand.Degree);
                    cmd.Parameters.AddWithValue("@Mobile", cand.Mobile);
                    cmd.Parameters.AddWithValue("@Home", cand.Home);
                    cmd.ExecuteNonQuery();
                    con.Close();
                }

            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Data Successfull Saved" });
        }

        [HttpPost]
        [Route("api/Candidate")]
        public IHttpActionResult deleteCandidate(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Candidate where Can_ID ='" + id + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("candidateDataDelete", con);
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

            return Json(new { Status = true, Message = "Caandidate Successfully Delete" });
        }

    }
}
