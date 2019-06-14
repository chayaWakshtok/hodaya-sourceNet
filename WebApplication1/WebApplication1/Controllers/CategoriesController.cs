using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.Office.Interop.Word;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class CategoriesController : ApiController
    {
        private SourceDataEntities2 db = new SourceDataEntities2();

        // GET: api/Categories
        public List<Models.CategoryDto> GetCategories()
        {
            List<CategoryDto> cat = new List<CategoryDto>();
            foreach (var item in db.Categories)
            {
                cat.Add(CategoryDto.ConvertToDto(item));
            }
            return cat;
        }

        // GET: api/Categories/5
        [ResponseType(typeof(Models.Category))]
        public IHttpActionResult GetCategory(int id)
        {
            Models.Category category = db.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(CategoryDto.ConvertToDto(category));
        }

        // PUT: api/Categories/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCategory(int id, Models.Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != category.CategoryId)
            {
                return BadRequest();
            }

            db.Entry(category).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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

        // POST: api/Categories
        [ResponseType(typeof(Models.Category))]
        public IHttpActionResult PostCategory(Models.CategoryDto category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(db.Categories.Any(p=>p.categoryName==category.categoryName))
            {
                return BadRequest("קטגוריה כבר קימת");
            }

            db.Categories.Add(CategoryDto.ConvertToDB(category));
            db.SaveChanges();
            return Ok();
        }

        // DELETE: api/Categories/5
        [ResponseType(typeof(Models.Category))]
        public IHttpActionResult DeleteCategory(int id)
        {
            Models.Category category = db.Categories.Find(id);
            if (category == null)
            {
                return NotFound();
            }

            db.Categories.Remove(category);
            db.SaveChanges();

            return Ok(category);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CategoryExists(int id)
        {
            return db.Categories.Count(e => e.CategoryId == id) > 0;
        }
    }
}