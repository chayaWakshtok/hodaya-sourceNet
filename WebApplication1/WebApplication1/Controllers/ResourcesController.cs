using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class ResourcesController : ApiController
    {
        private SourceDataEntities db = new SourceDataEntities();

        [HttpPost]
        [Route("api/UploadJsonFile")]
        public HttpResponseMessage UploadJsonFile()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var filePath = HttpContext.Current.Server.MapPath("~/UploadFile/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                }
            }
            return response;
        }
        // GET: api/Resources
        public IQueryable<Resource> GetResources()
        {
            return db.Resources;
        }

        // GET: api/Resources/5
        [ResponseType(typeof(Resource))]
        public IHttpActionResult GetResource(int id)
        {
            Resource resource = db.Resources.Find(id);
            if (resource == null)
            {
                return NotFound();
            }

            return Ok(resource);
        }

        // PUT: api/Resources/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutResource(int id, Resource resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != resource.resourceCode)
            {
                return BadRequest();
            }

            db.Entry(resource).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResourceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Resources
        [ResponseType(typeof(Resource))]
        public IHttpActionResult PostResource(Resource resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
           var numPer= resource.Permissions.ToList().Select(p => p.permissionsCode);
            resource.Permissions = new List<Permission>();
            foreach (var item in numPer)
            {
                resource.Permissions.Add(db.Permissions.Find(item));
            }
           var numCat= resource.Categories.ToList().Select(p => p.CategoryId);
            resource.Categories = new List<Category>();
            foreach (var item in numCat)
            {
                resource.Categories.Add(db.Categories.Find(item));
            }
            db.Resources.Add(resource);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = resource.resourceCode }, resource);
        }

        // DELETE: api/Resources/5
        [ResponseType(typeof(Resource))]
        public IHttpActionResult DeleteResource(int id)
        {
            Resource resource = db.Resources.Find(id);
            if (resource == null)
            {
                return NotFound();
            }

            db.Resources.Remove(resource);
            db.SaveChanges();

            return Ok(resource);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ResourceExists(int id)
        {
            return db.Resources.Count(e => e.resourceCode == id) > 0;
        }
    }
}