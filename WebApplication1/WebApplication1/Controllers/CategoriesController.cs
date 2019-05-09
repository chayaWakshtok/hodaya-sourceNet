using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication1.Models;
using Microsoft.Office.Interop.Word;

namespace WebApplication1.Controllers
{
    public class CategoriesController : ApiController
    {
        private SourceDataEntities db = new SourceDataEntities();

      
        [Route("api/ggg")]
        [HttpGet]
        public string ggg()
        {
            var appWord = new Application();
            if (appWord.Documents != null)
            {
                //yourDoc is your word document
                var wordDocument = appWord.Documents.Open(@"C:\Users\User\Documents\sourceFile\Files\Boggle.docx");
                string pdfDocName = "pdfDocument44.pdf";
                if (wordDocument != null)
                {
                    wordDocument.ExportAsFixedFormat(pdfDocName,
                    WdExportFormat.wdExportFormatPDF);
                    wordDocument.Close();
                }
                appWord.Quit();
            }
            byte[] pdfBytes = File.ReadAllBytes(@"C:\Users\User\Documents\pdfDocument44.pdf");
            string pdfBase64 = Convert.ToBase64String(pdfBytes);

            return pdfBase64;
        }
    
        // GET: api/Categories
        public IQueryable<Models.Category> GetCategories()
        {
            return db.Categories;
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

            return Ok(category);
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
        public IHttpActionResult PostCategory(Models.Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Categories.Add(category);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = category.CategoryId }, category);
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