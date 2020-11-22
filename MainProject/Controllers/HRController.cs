using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MainProject.Controllers
{
    public class HRController : Controller
    {
        // GET: HR
        public ActionResult HRHome()
        {
            ViewBag.HRData = TempData["HRData"];
            return View();
        }
    }
}