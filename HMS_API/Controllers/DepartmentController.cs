using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HMS_API.Models;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace HMS_API.Controllers
{
    public class DepartmentController : ApiController
    {
        private string conn = ConfigurationManager.ConnectionStrings["HRMSystem"].ConnectionString;

        [HttpGet]
        [Route("api/Department")]
        public IHttpActionResult GetDetailList()
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Departments", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                                select new
                                {
                                    dep_ID = item.Field<int>("dept_ID"),
                                    Name = item.Field<string>("Name"),
                                }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Department = List } });
        }

        [HttpGet]
        [Route("api/Department")]
        public IHttpActionResult GetDetailByID(int id)
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Departments where dept_ID = '"+id+"'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                            select new
                            {
                                dep_ID = item.Field<int>("dept_ID"),
                                Name = item.Field<string>("Name"),
                            }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Department = List } });
        }


        [HttpPost]
        [Route("api/Department")]
        public IHttpActionResult updateDepartment(int id, Department dep)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Departments where dept_ID ='" + id + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("DepartmentdataUpdate", con);
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@id", dep.dept_ID);
                        cmd.Parameters.AddWithValue("@Name", dep.Name);
                        cmd.ExecuteNonQuery();
                        con.Close();
                    }
                    else
                    {
                        return Json(new { Status = false, Message = (dep.dept_ID.ToString() + " is not Exist") });
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
        [Route("api/Department")]
        public IHttpActionResult deleteDepartment(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from Departments where dept_ID ='" + id + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("DepartmentdataDelete", con);
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
        [Route("api/Department")]
        public IHttpActionResult insertDepartment(Department dep)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {    
                    con.Open();
                    SqlCommand cmd = new SqlCommand("DepartmentdataInsert", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Name", dep.Name);
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
