using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MainProject.Controllers
{
    public class TeamLeadController : Controller
    {
        // GET: TeamLead
        public ActionResult TeamLeadHome()
        {
            ViewBag.TeamLeadData = TempData["TeamLeadData"];
            return View();
        }
    }
}