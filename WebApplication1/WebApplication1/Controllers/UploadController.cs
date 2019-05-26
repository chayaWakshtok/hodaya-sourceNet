using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class UploadController : ApiController
    {
        private SourceDataEntities2 db = new SourceDataEntities2();

        [HttpPost]
        [Route("api/postRecord")]
        public IHttpActionResult PostResource([FromBody]Resource resource)
        {
          
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var numPer = resource.Permissions.ToList().Select(p => p.permissionsCode).ToList();
            resource.Permissions = new List<Permission>();
            foreach (var item in numPer)
            {
                resource.Permissions.Add(db.Permissions.Find(item));
            }
            var numCat = resource.Categories.ToList().Select(p => p.CategoryId);
            resource.Categories = new List<Models.Category>();
            foreach (var item in numCat)
            {
                resource.Categories.Add(db.Categories.Find(item));
            }
            db.Resources.Add(resource);
            db.SaveChanges();

            return Ok();
        }

    }
}
