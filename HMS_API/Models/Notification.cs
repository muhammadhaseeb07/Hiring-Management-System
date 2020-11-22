using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace HMS_API.Models
{
    public class Notification
    {
        public int ID { get; set; }
        public int from_whom { get; set; }
        public int To_whom { get; set; }
        public string Detail { get; set; }
        public string Typee { get; set; }
    }
}