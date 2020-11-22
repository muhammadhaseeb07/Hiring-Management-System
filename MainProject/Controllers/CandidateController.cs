using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MainProject.Models;
using System.Net.Http;
using System.Net.Http.Headers;
using MainProject.Helper;
using System.Text;
using Newtonsoft.Json.Linq;

namespace MainProject.Controllers
{
    public class CandidateController : Controller
    {
        // GET: Candidate
        [HttpGet]
        public ActionResult candidateHome()
        {
            ViewBag.CandidateData = TempData["CandidateData"];
            return View();
        }
        [HttpPost]
        public ActionResult candidateHome(Candidate Obj)
        {
            try
            {
                var BaseURL = "http://localhost:55138/";
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(BaseURL);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var PostData = JsonHelper.Serialize<Candidate>(Obj);
                var httpPostStatus = new StringContent(PostData, UnicodeEncoding.UTF8, "application/json");
                BaseURL = BaseURL + "api/updateCandidate";
                HttpResponseMessage PostResponse = client.PostAsync(BaseURL, httpPostStatus).Result;
                if (PostResponse.IsSuccessStatusCode)
                {
                    var ServicesData = PostResponse.Content.ReadAsStringAsync().Result;
                    dynamic Servicesparsed = JObject.Parse(ServicesData);
                    if (Servicesparsed.Status == true)
                    {
                        return Json(new { Status = true, Message = "Candidate Successfully Signup", Data = new { } });
                    }
                    else
                    {
                        return Json(new { Status = false, Message = "Something wents wrong", Data = new { } });
                    }
                }
                else
                {
                    return Json(new { Status = false, Message = "Something wents wrong", Data = new { } });
                }

            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = new { } });
            }
        }
    }
}