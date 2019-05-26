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
    public class UsersController : ApiController
    {
        private SourceDataEntities2 db = new SourceDataEntities2();

        // GET: api/Users
        public List<UserDto> GetUsers()
        {
            List<UserDto> users = new List<UserDto>();
            foreach (var item in db.Users)
            {
                users.Add(UserDto.ConvertToDto(item));
            }
            return users;
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(UserDto.ConvertToDto(user));
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, UserDto user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.userCode)
            {
                return BadRequest();
            }

            var userEdit = db.Users.Find(user.userCode);
            userEdit.userName = user.userName;
            userEdit.password = user.password;
            userEdit.email = user.email;
            userEdit.Role = RoleDto.ConvertToDB1(user.Role);
            //   db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            user.Role = db.Roles.Find(user.roleCode);
            db.Users.Add(user);
            db.SaveChanges();

            List<UserDto> users = new List<UserDto>();
            foreach (var item in db.Users)
            {
                users.Add(UserDto.ConvertToDto(item));
            }
            

            return Ok(users);
        }

        [HttpGet]
        [Route("api/users/login/{username}/{password}")]
        public UserDto Login(string username, string password)
        {
            
            if (db.Users.FirstOrDefault(p => p.password == password && p.userName == username) != null)
            {
                
                var user = db.Users.First(p => p.password == password && p.userName == username);
                return UserDto.ConvertToDto(user);

            }

            else return null;
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.userCode == id) > 0;
        }
    }
}