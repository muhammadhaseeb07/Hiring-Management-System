using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HMS_API.Models;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace HMS_API.Controllers
{
    public class JobOfferController : ApiController
    {

        private string conn = ConfigurationManager.ConnectionStrings["HRMSystem"].ConnectionString;

        [HttpGet]
        [Route("api/JobOffer")]
        public IHttpActionResult GetDetailList()
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Job_Offer", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                            select new
                            {
                                job_ID = item.Field<int>("job_ID"),
                                can_ID = item.Field<int>("can_ID"),
                                Salary = item.Field<int>("Salary"),
                                Joining_Date = item.Field<DateTime>("Joining_Date"),
                            }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Job_Offer = List } });
        }

        [HttpGet]
        [Route("api/JobOffer")]
        public IHttpActionResult GetDetailByID(int id)
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Job_Offer where job_ID = '"+id+"'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                            select new
                            {
                                job_ID = item.Field<int>("job_ID"),
                                can_ID = item.Field<int>("can_ID"),
                                Salary = item.Field<int>("Salary"),
                                Joining_Date = item.Field<DateTime>("Joining_Date"),
                            }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Job_Offer = List } });
        }


        [HttpPost]
        [Route("api/JobOffer")]
        public IHttpActionResult deleteJob(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Job_Offer where job_ID = '" + id + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("jobDelete", con);
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
        [Route("api/JobOffer")]
        public IHttpActionResult updateJob(int id,Job_Offer job)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Job_Offer where job_ID = '" + id + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("jobUpdate", con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@job_ID", job.job_ID);
                        cmd.Parameters.AddWithValue("@can_ID", job.can_ID);
                        cmd.Parameters.AddWithValue("@Salary", job.Salary);
                        cmd.Parameters.AddWithValue("@Joining_Date", job.Joining_Date);
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
        [Route("api/JobOffer")]
        public IHttpActionResult insertJob(Job_Offer job)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("jobInsert", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@can_ID", job.can_ID);
                    cmd.Parameters.AddWithValue("@Salary", job.Salary);
                    cmd.Parameters.AddWithValue("@Joining_Date", job.Joining_Date);
                    cmd.ExecuteNonQuery();
                    con.Close();     
                }

            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }
            return Json(new { Status = true, Message = "Data Successfull Inserted" });
        }
    }
}
