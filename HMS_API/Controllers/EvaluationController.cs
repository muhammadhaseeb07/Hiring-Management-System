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
    public class EvaluationController : ApiController
    {
        private string conn = ConfigurationManager.ConnectionStrings["HRMSystem"].ConnectionString;

        [HttpGet]
        [Route("api/Evaluation")]
        public IHttpActionResult GetDetailList()
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from eval", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                                select new
                                {
                                    Eval_ID = item.Field<int>("Eval_ID"),
                                    Past_work_experience = item.Field<string>("Past_work_experience"),
                                    int_ID = item.Field<int>("int_ID"),
                                    technical_qualification = item.Field<string>("technical_qualification"),
                                    Leadership_ability = item.Field<string>("Leadership_ability"),
                                    customer_service_skills = item.Field<string>("customer_service_skills"),
                                    communication_skills = item.Field<string>("communication_skills"),
                                    overall_impression = item.Field<string>("overall_impression"),
                                    comments = item.Field<string>("comments"),
                                    candidate_enthusiasm = item.Field<string>("candidate_enthusiasm"),
                                    administrative_skills = item.Field<string>("administrative_skills"),
                                    educational_background = item.Field<string>("educational_background"),
                                }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Evaluation = List } });
        }


        [HttpGet]
        [Route("api/Evaluation")]
        public IHttpActionResult GetDetailByID(int id)
        {
            object List = null;
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from eval where Eval_ID ='"+id+"'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        List = (from item in dt.AsEnumerable()
                                select new
                                {
                                    Eval_ID = item.Field<int>("Eval_ID"),
                                    Past_work_experience = item.Field<string>("Past_work_experience"),
                                    int_ID = item.Field<int>("int_ID"),
                                    technical_qualification = item.Field<string>("technical_qualification"),
                                    Leadership_ability = item.Field<string>("Leadership_ability"),
                                    customer_service_skills = item.Field<string>("customer_service_skills"),
                                    communication_skills = item.Field<string>("communication_skills"),
                                    overall_impression = item.Field<string>("overall_impression"),
                                    comments = item.Field<string>("comments"),
                                    candidate_enthusiasm = item.Field<string>("candidate_enthusiasm"),
                                    administrative_skills = item.Field<string>("administrative_skills"),
                                    educational_background = item.Field<string>("educational_background"),
                                }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = "" });
            }

            return Json(new { Status = true, Message = "Hi", Data = new { Evaluation = List } });
        }


        [HttpPost]
        [Route("api/Evaluation")]
        public IHttpActionResult deleteEvaluation(int id)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from eval where Eval_ID ='" + id + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("evaluationDelete", con);
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
        [Route("api/Evaluation")]
        public IHttpActionResult updateEvaluation(int id,Evaluation eval)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    SqlDataAdapter da = new SqlDataAdapter("SELECT * from eval where Eval_ID ='" + id + "'", con);
                    DataTable dt = new DataTable();
                    da.Fill(dt);
                    if (dt != null)
                    {
                        con.Open();
                        SqlCommand cmd = new SqlCommand("evaluationUpdate", con);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Eval_ID", eval.Eval_ID );
                        cmd.Parameters.AddWithValue("@Past_work_experience", eval.Past_work_experience);
                        cmd.Parameters.AddWithValue("@int_ID", eval.int_ID);
                        cmd.Parameters.AddWithValue("@technical_qualification", eval.technical_qualification);
                        cmd.Parameters.AddWithValue("@Leadership_ability", eval.Leadership_ability);
                        cmd.Parameters.AddWithValue("@customer_service_skills", eval.customer_service_skills);
                        cmd.Parameters.AddWithValue("@communication_skills", eval.communication_skills);
                        cmd.Parameters.AddWithValue("@overall_impression", eval.overall_impression);
                        cmd.Parameters.AddWithValue("@comments", eval.comments);
                        cmd.Parameters.AddWithValue("@candidate_enthusiasm", eval.candidate_enthusiasm);
                        cmd.Parameters.AddWithValue("@administrative_skills", eval.administrative_skills);
                        cmd.Parameters.AddWithValue("@educational_background", eval.educational_background);
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
        [Route("api/Evaluation")]
        public IHttpActionResult insertEvaluation(Evaluation eval)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(conn))
                {
                    con.Open();
                    SqlCommand cmd = new SqlCommand("evaluationInsert", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Past_work_experience", eval.Past_work_experience);
                    cmd.Parameters.AddWithValue("@int_ID", eval.int_ID);
                    cmd.Parameters.AddWithValue("@technical_qualification", eval.technical_qualification);
                    cmd.Parameters.AddWithValue("@Leadership_ability", eval.Leadership_ability);
                    cmd.Parameters.AddWithValue("@customer_service_skills", eval.customer_service_skills);
                    cmd.Parameters.AddWithValue("@communication_skills", eval.communication_skills);
                    cmd.Parameters.AddWithValue("@overall_impression", eval.overall_impression);
                    cmd.Parameters.AddWithValue("@comments", eval.comments);
                    cmd.Parameters.AddWithValue("@candidate_enthusiasm", eval.candidate_enthusiasm);
                    cmd.Parameters.AddWithValue("@administrative_skills", eval.administrative_skills);
                    cmd.Parameters.AddWithValue("@educational_background", eval.educational_background);
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
