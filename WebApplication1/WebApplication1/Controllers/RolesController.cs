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
    public class RolesController : ApiController
    {
        private SourceDataEntities2 db = new SourceDataEntities2();

        // GET: api/Roles
        public List<RoleDto> GetRoles()
        {
            List<RoleDto> roles = new List<RoleDto>();
            foreach (var item in db.Roles)
            {
                roles.Add(RoleDto.ConvertToDto(item));
            }
            return roles;
        }

        // GET: api/Roles/5
        [ResponseType(typeof(Role))]
        public IHttpActionResult GetRole(int id)
        {
            Role role = db.Roles.Find(id);
            if (role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }

        // PUT: api/Roles/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRole(int id, Role role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != role.roleCode)
            {
                return BadRequest();
            }
            Role rol = db.Roles.First(r => r.roleCode == role.roleCode);
            rol.roleType = role.roleType;

            List<Permission> per = new List<Permission>();
            role.Permissions = new List<Permission>();
            foreach (var item in role.Permissions)
            {
                rol.Permissions.Add(db.Permissions.First(i => i.permissionsCode == item.permissionsCode));
            }
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            List<RoleDto> list = new List<RoleDto>();
            foreach (var item in db.Roles)
            {
                list.Add(RoleDto.ConvertToDto(item));
            }
            return Ok(list);
        }

        // POST: api/Roles
        [ResponseType(typeof(Role))]
        public IHttpActionResult PostRole(RoleDto role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Role ro = RoleDto.ConvertToDB1(role);
            List<Permission> per = new List<Permission>();
            foreach (var item in ro.Permissions)
            {
                per.Add(db.Permissions.First(i => i.permissionsCode == item.permissionsCode));
            }
            ro.Permissions = per;
            db.Roles.Add(ro);
            db.SaveChanges();

            List<RoleDto> list = new List<RoleDto>();
            foreach (var item in db.Roles)
            {
                list.Add(RoleDto.ConvertToDto(item));
            }
            return Ok(list);

        }

        // DELETE: api/Roles/5
        [ResponseType(typeof(Role))]
        public IHttpActionResult DeleteRole(int id)
        {
            Role role = db.Roles.Find(id);
            if (role == null)
            {
                return NotFound();
            }

            db.Roles.Remove(role);
            db.SaveChanges();

            return Ok(role);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoleExists(int id)
        {
            return db.Roles.Count(e => e.roleCode == id) > 0;
        }
    }
}