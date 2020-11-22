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
using Antlr.Runtime.Tree;

namespace HMS_API.Controllers
{
    public class RequestController : ApiController
    {
        private string conn = ConfigurationManager.ConnectionStrings["HRMSystem"].ConnectionString;

        [HttpGet]
        [Route("api/Request")]
        public IHttpActionResult GetDetailList()
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Requests", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                            select new
                            {
                                Req_ID = item.Field<int>("Req_ID"),
                                Dept_no = item.Field<int>("Dept_no"),
                                Domain = item.Field<string>("Domain"),
                                Sub__Domain = item.Field<string>("Sub__Domain"),
                                Experience = item.Field<string>("Experience"),
                                Vacancies = item.Field<int>("Vacancies"),
                                Job_Position = item.Field<string>("Job_Position"),
                                Expected_Joining_Date = item.Field<DateTime>("Expected_Joining_Date"),
                                Descriptionn = item.Field<string>("Descriptionn"),
                                StatusOfReq = item.Field<int>("StatusOfReq"),
                            }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Request = List } });
        }

        [HttpGet]
        [Route("api/Request")]
        public IHttpActionResult GetDetailByID(int id)
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Requests where Req_ID = '" + id+ "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                            select new
                            {
                                Req_ID = item.Field<int>("Req_ID"),
                                Dept_no = item.Field<int>("Dept_no"),
                                Domain = item.Field<string>("Domain"),
                                Sub__Domain = item.Field<string>("Sub__Domain"),
                                Experience = item.Field<string>("Experience"),
                                Vacancies = item.Field<int>("Vacancies"),
                                Job_Position = item.Field<string>("Job_Position"),
                                Expected_Joining_Date = item.Field<DateTime>("Expected_Joining_Date"),
                                Descriptionn = item.Field<string>("Descriptionn"),
                                StatusOfReq = item.Field<int>("StatusOfReq"),
                            }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Request = List } });
        }

        [HttpPost]
        [Route("api/Request")]
        public IHttpActionResult deleteRequest(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Requests where Req_ID ='" + id + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("reqDelete", con);
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
        [Route("api/Request")]
        public IHttpActionResult updateRequest(int id,Request req)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Requests where Req_ID ='" + id + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("reqUpdate", con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Req_ID", req.Req_ID);
                        cmd.Parameters.AddWithValue("@Dept_no", req.Dept_no);
                        cmd.Parameters.AddWithValue("@Domain", req.Domain);
                        cmd.Parameters.AddWithValue("@Sub__Domain", req.Sub__Domain);
                        cmd.Parameters.AddWithValue("@Experience", req.Experience);
                        cmd.Parameters.AddWithValue("@Vacancies", req.Vacancies);
                        cmd.Parameters.AddWithValue("@Job_Position", req.Job_Position);
                        cmd.Parameters.AddWithValue("@Expected_Joining_Date", req.Expected_Joining_Date);
                        cmd.Parameters.AddWithValue("@Descriptionn", req.Descriptionn);
                        cmd.Parameters.AddWithValue("@StatusOfReq", req.StatusOfReq);

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
        [Route("api/Request")]
        public IHttpActionResult insertRequest(Request req)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                   
                        con.Open();
                        SqlCommand cmd = new SqlCommand("reqInsert", con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Dept_no", req.Dept_no);
                        cmd.Parameters.AddWithValue("@Domain", req.Domain);
                        cmd.Parameters.AddWithValue("@Sub__Domain", req.Sub__Domain);
                        cmd.Parameters.AddWithValue("@Experience", req.Experience);
                        cmd.Parameters.AddWithValue("@Vacancies", req.Vacancies);
                        cmd.Parameters.AddWithValue("@Job_Position", req.Job_Position);
                        cmd.Parameters.AddWithValue("@Expected_Joining_Date", req.Expected_Joining_Date);
                        cmd.Parameters.AddWithValue("@Descriptionn", req.Descriptionn);
                        cmd.Parameters.AddWithValue("@StatusOfReq", req.StatusOfReq);

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
