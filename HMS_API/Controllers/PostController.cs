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
    public class PostController : ApiController
    {
        private string conn = ConfigurationManager.ConnectionStrings["HRMSystem"].ConnectionString;

        [HttpGet]
        [Route("api/Post")]
        public IHttpActionResult GetDetailList()
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from posts", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                            select new
                            {
                                Req_ID = item.Field<int>("Req_ID"),
                                Can_ID = item.Field<int>("Can_ID"),
                                Statuss = item.Field<string>("Statuss"),
                            }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Post = List } });
        }

        [HttpGet]
        [Route("api/Post")]
        public IHttpActionResult GetDetailByID(int reqID,int canID)
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from posts where Req_ID = '"+reqID+ "' and Can_ID = '" + canID+"' ", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                            select new
                            {
                                Req_ID = item.Field<int>("Req_ID"),
                                Can_ID = item.Field<int>("Can_ID"),
                                Statuss = item.Field<string>("Statuss"),
                            }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Post = List } });
        }

        [HttpPost]
        [Route("api/Post")]
        public IHttpActionResult deletePost(int reqID, int canID)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from posts where posts where Req_ID = '" + reqID + "' and Can_ID = '" + canID + "' ", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("postDelete", con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@reqID", reqID);
                        cmd.Parameters.AddWithValue("@canID", canID);
                        cmd.ExecuteNonQuery();
                        con.Close();
                    }
                    else
                    {
                        return Json(new { Status = false, Message = ("Post is not Exist") });
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
        [Route("api/Post")]
        public IHttpActionResult updatePost(int reqID, int canID,Post p)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from posts where posts where Req_ID = '" + reqID + "' and Can_ID = '" + canID + "' ", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("postUpdate", con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@reqID", p.Req_ID);
                        cmd.Parameters.AddWithValue("@canID", p.Can_ID);
                        cmd.Parameters.AddWithValue("@Statuss", p.Statuss);
                        cmd.ExecuteNonQuery();
                        con.Close();
                    }
                    else
                    {
                        return Json(new { Status = false, Message = ("Post is not Exist") });
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
        [Route("api/Post")]
        public IHttpActionResult insertPost(Post p)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("postInsert", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@reqID", p.Req_ID);
                    cmd.Parameters.AddWithValue("@canID", p.Can_ID);
                    cmd.Parameters.AddWithValue("@Statuss", p.Statuss);
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
