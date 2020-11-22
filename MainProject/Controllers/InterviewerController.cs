using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MainProject.Controllers
{
    public class InterviewerController : Controller
    {
        // GET: Interviewer
        public ActionResult InterviewerHome()
        {
            ViewBag.InterviewerData = TempData["InterviewerData"];
            return View();
        }
    }
}