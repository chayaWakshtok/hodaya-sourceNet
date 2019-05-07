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
        private SourceDataEntities db = new SourceDataEntities();

        // GET: api/Permissions
        public IQueryable<Permission> GetPermissions()
        {
            return db.Permissions;
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