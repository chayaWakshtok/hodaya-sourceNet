using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class PermissionsController : ApiController
    {
        private SourceDataEntities2 db = new SourceDataEntities2();

        // GET: api/Permissions
        public IQueryable<Permission> GetPermissions()
        {
            db.Configuration.LazyLoadingEnabled = false;
            db.Configuration.ProxyCreationEnabled = false;
            return db.Permissions.AsNoTracking();
        }

        [HttpGet]
        [Route("api/permission/getPermissionResource")]
        public List<Permission> GetPermissionsFiles()
        {
            db.Configuration.LazyLoadingEnabled = false;
            db.Configuration.ProxyCreationEnabled = false;
            return db.Permissions.Where(p=>p.permissionsCode<=5).AsNoTracking().ToList();
        }

        [HttpGet]
        [Route("api/getPremmisionsRole")]
        public List<Permission> GetPermissionsRole()
        {
            db.Configuration.LazyLoadingEnabled = false;
            db.Configuration.ProxyCreationEnabled = false;
            return db.Permissions.Where(p => p.permissionsCode >=6).AsNoTracking().ToList();
        }

        // GET: api/Permissions/5
        [ResponseType(typeof(Permission))]
        public IHttpActionResult GetPermission(int id)
        {
            Permission permission = db.Permissions.Find(id);
            if (permission == null)
            {
                return NotFound();
            }

            return Ok(permission);
        }

        // PUT: api/Permissions/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPermission(int id, Permission permission)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != permission.permissionsCode)
            {
                return BadRequest();
            }

            db.Entry(permission).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PermissionExists(id))
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

        // POST: api/Permissions
        [ResponseType(typeof(Permission))]
        public IHttpActionResult PostPermission(Permission permission)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Permissions.Add(permission);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = permission.permissionsCode }, permission);
        }

        // DELETE: api/Permissions/5
        [ResponseType(typeof(Permission))]
        public IHttpActionResult DeletePermission(int id)
        {
            Permission permission = db.Permissions.Find(id);
            if (permission == null)
            {
                return NotFound();
            }

            db.Permissions.Remove(permission);
            db.SaveChanges();

            return Ok(permission);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PermissionExists(int id)
        {
            return db.Permissions.Count(e => e.permissionsCode == id) > 0;
        }
    }
}