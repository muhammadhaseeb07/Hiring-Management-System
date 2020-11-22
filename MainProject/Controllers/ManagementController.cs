using MainProject.Helper;
using MainProject.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace MainProject.Controllers
{
    public class ManagementController : Controller
    {
        // GET: Management
        public ActionResult ManagementHome()
        {
            ViewBag.ManagementData = TempData["ManagementData"];       
            return View();
        }
        [HttpGet]
        public ActionResult RequestJob()
        {
            return View(); 
        }

        [HttpPost]
        public ActionResult RequestJob(Request Obj)
        {
            try
            {
                var BaseURL = "http://localhost:55138/";
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(BaseURL);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var PostData = JsonHelper.Serialize<Request>(Obj);
                var httpPostStatus = new StringContent(PostData, UnicodeEncoding.UTF8, "application/json");
                BaseURL = BaseURL + "api/Request";
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