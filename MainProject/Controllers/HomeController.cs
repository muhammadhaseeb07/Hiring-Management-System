using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MainProject.Models;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Remoting.Messaging;
using System.Text;
using Newtonsoft.Json.Linq;
using MainProject.Helper;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MainProject.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpGet]
        public ActionResult Signup()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Signup(Candidate Obj)
        {
            try
            {
                var BaseURL = "http://localhost:55138/";
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(BaseURL);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var PostData = JsonHelper.Serialize<Candidate>(Obj);
                var httpPostStatus = new StringContent(PostData, UnicodeEncoding.UTF8, "application/json");
                BaseURL = BaseURL + "api/Candidate";
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

        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Login(Login Obj)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    string apiUrl = "http://localhost:55138/";
                    List<Candidate> list = null;
                    client.BaseAddress = new Uri(apiUrl);
                    client.DefaultRequestHeaders.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage ServicesResponse = await client.GetAsync("api/Login?username=" + Obj.username + "&password=" + Obj.password + "");
                    if (ServicesResponse.IsSuccessStatusCode)
                    {
                        var ServicesData = ServicesResponse.Content.ReadAsStringAsync().Result;
                        dynamic Servicesparsed = JObject.Parse(ServicesData);
                        dynamic ServicesList = JObject.Parse(Servicesparsed.Data.ToString());
                        list = JsonConvert.DeserializeObject<List<Candidate>>(ServicesList.Candidate.ToString());
                        TempData["CandidateData"] = list ;
                    }
                    return Json(list, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = new { } });
            }
        }

        [HttpGet]
        public ActionResult EmployeeLogin()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> EmployeeLogin(EmpType Obj)
        {
            try
            {
                using (HttpClient client = new HttpClient())
                {
                    string apiUrl = "http://localhost:55138/";
                    List<Employee> list = null;
                    client.BaseAddress = new Uri(apiUrl);
                    client.DefaultRequestHeaders.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage ServicesResponse = await client.GetAsync("api/EmployeeLogin?username=" + Obj.username + "&password=" + Obj.password + "");
                    if (ServicesResponse.IsSuccessStatusCode)
                    {
                        var ServicesData = ServicesResponse.Content.ReadAsStringAsync().Result;
                        dynamic Servicesparsed = JObject.Parse(ServicesData);
                        dynamic ServicesList = JObject.Parse(Servicesparsed.Data.ToString());
                        list = JsonConvert.DeserializeObject<List<Employee>>(ServicesList.Employee.ToString());
                        if (list[0].Employee_type== "manager" && Obj.emptype == 0)
                            TempData["ManagementData"] = list;
                        else if(list[0].Employee_type == "teamlead" && Obj.emptype==3)
                            TempData["TeamLeadData"] = list;
                        else if (list[0].Employee_type == "HR" && Obj.emptype == 1)
                            TempData["HRData"] = list;
                        else if (list[0].Employee_type == "interviewer" && Obj.emptype == 2)
                            TempData["InterviewerData"] = list;
                        else
                            list = null;
                    }
                    return Json(list, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { Status = false, Message = ex.Message, Data = new { } });
            }
        }
    }
}