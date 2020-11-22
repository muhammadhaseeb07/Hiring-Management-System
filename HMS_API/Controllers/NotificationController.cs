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
    public class NotificationController : ApiController
    {
        private string conn = ConfigurationManager.ConnectionStrings["HRMSystem"].ConnectionString;

        [HttpGet]
        [Route("api/Notification")]
        public IHttpActionResult GetDetailList()
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from notifications", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                            select new
                            {
                                ID = item.Field<int>("ID"),
                                from_whom = item.Field<int>("from_whom"),
                                To_whom = item.Field<int>("To_whom"),
                                Detail = item.Field<string>("Detail"),
                                Typee = item.Field<string>("Typee"),
                            }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Notification = List } });
        }

        [HttpGet]
        [Route("api/Notification")]
        public IHttpActionResult GetDetailByID(int id)
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from notifications where ID='"+id+"'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                            select new
                            {
                                ID = item.Field<int>("ID"),
                                from_whom = item.Field<int>("from_whom"),
                                To_whom = item.Field<int>("To_whom"),
                                Detail = item.Field<string>("Detail"),
                                Typee = item.Field<string>("Typee"),
                            }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Notification = List } });
        }

        [HttpPost]
        [Route("api/Notification")]
        public IHttpActionResult insertNotification(Notification notif)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("notInsert", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@from_whom", notif.from_whom);
                    cmd.Parameters.AddWithValue("@To_whom", notif.To_whom);
                    cmd.Parameters.AddWithValue("@Detail", notif.Detail);
                    cmd.Parameters.AddWithValue("@@Typee", notif.Typee);
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

        [HttpPost]
        [Route("api/Notification")]
        public IHttpActionResult updateNotification(int id, Notification notif)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from notifications where ID='" + id + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("notUpdate", con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ID", notif.ID);
                        cmd.Parameters.AddWithValue("@from_whom", notif.from_whom);
                        cmd.Parameters.AddWithValue("@To_whom", notif.To_whom);
                        cmd.Parameters.AddWithValue("@Detail", notif.Detail);
                        cmd.Parameters.AddWithValue("@@Typee", notif.Typee);
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
        [Route("api/Notification")]
        public IHttpActionResult deleteNotification(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from notifications where ID='" + id + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("notDelete", con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ID",id);
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
    }
}

