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
    public class InterviewController : ApiController
    {
        private string conn = ConfigurationManager.ConnectionStrings["HRMSystem"].ConnectionString;

        [HttpGet]
        [Route("api/Interview")]
        public IHttpActionResult GetDetailList()
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from interview", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                                select new
                                {
                                    int_ID = item.Field<int>("int_ID"),
                                    Emp_ID = item.Field<int>("Emp_ID"),
                                    Can_ID = item.Field<int>("Can_ID"),
                                    Date = item.Field<DateTime>("Date"),
                                    Time = item.Field<TimeSpan>("Time"),
                                }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Interview = List } });
        }

        [HttpGet]
        [Route("api/Interview")]
        public IHttpActionResult GetDetailByID(int id)
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from interview where int_ID='"+id+"'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                            select new
                            {
                                int_ID = item.Field<int>("int_ID"),
                                Emp_ID = item.Field<int>("Emp_ID"),
                                Can_ID = item.Field<int>("Can_ID"),
                                Date = item.Field<DateTime>("Date"),
                                Time = item.Field<TimeSpan>("Time"),
                            }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Interview = List } });
        }

        [HttpPost]
        [Route("api/Interview")]
        public IHttpActionResult deleteInterview(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from interview where int_ID='" + id + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("interviewDelete", con);
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
        [Route("api/Interview")]
        public IHttpActionResult updateInterview(int id,Interview interv)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from interview where int_ID='" + id + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("interviewUpdate", con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@int_ID", interv.int_ID);
                        cmd.Parameters.AddWithValue("@Emp_ID", interv.Emp_ID);
                        cmd.Parameters.AddWithValue("@Can_ID", interv.Can_ID);
                        cmd.Parameters.AddWithValue("@Date", interv.Date);
                        cmd.Parameters.AddWithValue("@Time", interv.Time);
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
        [Route("api/Interview")]
        public IHttpActionResult insertInterview(Interview interv)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    
                    con.Open();
                    SqlCommand cmd = new SqlCommand("interviewUpdate", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Emp_ID", interv.Emp_ID);
                    cmd.Parameters.AddWithValue("@Can_ID", interv.Can_ID);
                    cmd.Parameters.AddWithValue("@Date", interv.Date);
                    cmd.Parameters.AddWithValue("@Time", interv.Time);
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
