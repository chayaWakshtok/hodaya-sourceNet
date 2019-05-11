using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using WordToPDF;
using WebApplication1.Models;
using GemBox.Document;
using Spire.Xls;
using Microsoft.Office.Interop.Word;

namespace WebApplication1.Controllers
{
    public class ResourcesPathShow
    {
        public string TypeFile { get; set; }
        public string ContentBase64 { get; set; }

    }
    public class ResourcesController : ApiController
    {
        private SourceDataEntities db = new SourceDataEntities();

        [Route("api/getDataFile/{idResources}")]
        [HttpGet]
        public ResourcesPathShow GetDataFile(int idResources)
        {
            byte[] Bytes=new byte[10000000];
            ResourcesPathShow resourcesPathShow = new ResourcesPathShow();        
            var resources = db.Resources.Find(idResources);
            string FileExtension = Path.GetExtension(resources.filePath);
            if (FileExtension == ".pdf"|| FileExtension == ".jpg"|| FileExtension == ".jpeg"|| FileExtension == ".png"|| FileExtension == ".txt")
            {
                 Bytes = File.ReadAllBytes(resources.filePath);
            }
            if(FileExtension == ".doc" || FileExtension == ".docx")
            {
                Word2Pdf objWorPdf = new Word2Pdf();
                string ChangeExtension = resources.filePath.Replace(FileExtension, ".pdf");
                objWorPdf.InputLocation = resources.filePath;
                objWorPdf.OutputLocation = ChangeExtension;
                objWorPdf.Word2PdfCOnversion();
                Bytes = File.ReadAllBytes(ChangeExtension);
                File.Delete(ChangeExtension);
                FileExtension = ".pdf";

            }
            if (FileExtension == ".xlsx" || FileExtension == ".csv")
            {
               
                string ChangeExtension = resources.filePath.Replace(FileExtension, ".pdf");
                //Workbook workbook = new Workbook();
                //workbook.LoadFromFile(resources.filePath);

                //Save the document in PDF format

               // workbook.SaveToFile(ChangeExtension, Spire.Xls.FileFormat.PDF);

                SautinSoft.ExcelToPdf x = new SautinSoft.ExcelToPdf();
                x.ConvertFile(resources.filePath, ChangeExtension);
                Bytes = File.ReadAllBytes(ChangeExtension);
                File.Delete(ChangeExtension);
                FileExtension = ".pdf";
            }
            resourcesPathShow.TypeFile = FileExtension;
            resourcesPathShow.ContentBase64 = Convert.ToBase64String(Bytes);
            return resourcesPathShow;
        }

        [HttpGet]
        [Route("api/openResource/{idResources}")]
        public bool OpenResource(int idResources)
        {
            var resources = db.Resources.Find(idResources);
            string FileExtension = Path.GetExtension(resources.filePath);
            //if (FileExtension == ".doc" || FileExtension == ".docx")
            //{
            //    Application ap = new Application();
            //    Document document = ap.Documents.Open(@"C:\Test\NewDocument.docx");
            //}
            //if (FileExtension == ".xlsx" || FileExtension == ".csv")
            //{
            //    System.Diagnostics.Process.Start(resources.filePath);
            //}
            System.Diagnostics.Process.Start(resources.filePath);
            return true;
        }


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
            resource.Categories = new List<Models.Category>();
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