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
using Spire.Doc;

using GemBox.Document;
using Spire.Xls;
using Microsoft.Office.Interop.Word;
using WebApplication1.Models;
using System.Web.UI.WebControls;
using System.Threading.Tasks;
using System.Collections.Specialized;
using System.Web.Http.Results;
using Newtonsoft.Json;
using Spire.Pdf;
using System.Drawing;

namespace WebApplication1.Controllers
{

    public class ResourcesPathShow
    {
        public string TypeFile { get; set; }
        public string ContentBase64 { get; set; }
        public string TargetContent { get; set; }
        public ResourceDto resource { get; set; }

    }

    public class ResourcesController : ApiController
    {
        public const string filesDir = @"C:\Users\User\Documents\sourceFile\Files";

        private SourceDataEntities2 db = new SourceDataEntities2();

        [Route("api/getDataFile/{idResources}")]
        [HttpGet]
        public ResourcesPathShow GetDataFile(int idResources)
        {
            byte[] Bytes = new byte[10000000];
            ResourcesPathShow resourcesPathShow = new ResourcesPathShow();

            var resources = db.Resources.Find(idResources);
            string FileExtension = Path.GetExtension(resources.filePath);
            if (FileExtension == ".pdf" || FileExtension == ".jpg" || FileExtension == ".jpeg" || FileExtension == ".png" || FileExtension == ".txt")
            {
                Bytes = File.ReadAllBytes(resources.filePath);
            }
            if (FileExtension == ".doc" || FileExtension == ".docx")
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
                SautinSoft.ExcelToPdf x = new SautinSoft.ExcelToPdf();
                x.ConvertFile(resources.filePath, ChangeExtension);
                Bytes = File.ReadAllBytes(ChangeExtension);
                File.Delete(ChangeExtension);
                FileExtension = ".pdf";
            }
            resourcesPathShow.TypeFile = FileExtension;
            resourcesPathShow.ContentBase64 = Convert.ToBase64String(Bytes);
            Bytes = File.ReadAllBytes(resources.filePath);
            resourcesPathShow.TargetContent = Convert.ToBase64String(Bytes);

            resourcesPathShow.resource = ResourceDto.ConvertToDto(resources);
            return resourcesPathShow;
        }


        [HttpGet]
        [Route("api/openResource/{idResources}")]
        public bool OpenResource(int idResources)
        {
            var resources = db.Resources.Find(idResources);
            string FileExtension = Path.GetExtension(resources.filePath);
            System.Diagnostics.Process.Start(resources.filePath);
            return true;
        }

        // GET: api/Resources
        public List<ResourceDto> GetResources()
        {
            List<ResourceDto> list = new List<ResourceDto>();
            foreach (var item in db.Resources)
            {
                list.Add(ResourceDto.ConvertToDto(item));
            }
            return list;
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
        public IHttpActionResult PutResource(int id, ResourceDto resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != resource.resourceCode)
            {
                return BadRequest();
            }

            var resourceApp = db.Resources.Find(id);
            var per = new List<WebApplication1.Models.Permission>();
            foreach (var item in resource.Permissions)
            {
                per.Add(db.Permissions.First(p => p.permissionsCode == item.permissionsCode));
            }

            var cat = new List<Models.Category>();
            foreach (var item in resource.Categories)
            {
                cat.Add(db.Categories.First(p => p.CategoryId == item.CategoryId));
            }
            resourceApp.Permissions = per;
            resourceApp.Categories = cat;
            resourceApp.authorName = resource.authorName;


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

        // DELETE: api/Resources/5
        [ResponseType(typeof(Resource))]
        public IHttpActionResult DeleteResource(int id)
        {
            Resource resource = db.Resources.Find(id);
            if (resource == null)
            {
                return NotFound();
            }
            if (System.IO.File.Exists(filesDir + @"\" + resource.resourceName)) ;
            {
                try
                {
                    System.IO.File.Delete(filesDir + @"\" + resource.resourceName);
                    resource.Permissions = null;
                    resource.Categories = null;
                    db.SaveChanges();

                    db.Resources.Remove(resource);
                    db.SaveChanges();
                }
                catch (System.IO.IOException e)
                {
                    Console.WriteLine(e.Message);
                    return BadRequest();
                }
            }
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

        [Route("api/deleteFileFromFolder/{name}")]
        public bool DeleteFileFromFolder(string name)
        {
            if (System.IO.File.Exists(filesDir + @"\" + name)) ;
            {
                try
                {
                    System.IO.File.Delete(filesDir + @"\" + name);
                    return true;
                }
                catch (System.IO.IOException e)
                {
                    return false;
                }
            }
        }

        [HttpPost]
        [Route("api/AcceptSameFile")]
        public async Task<IHttpActionResult> AcceptSameFile()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/App_Data");
            var provider = new MultipartFormDataStreamProvider(root);
            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);

                NameValueCollection formdata = provider.FormData;
                Resource resource = JsonConvert.DeserializeObject<Resource>(formdata["res"].ToString());

                foreach (MultipartFileData file in provider.FileData)
                {
                    var fileName = "(1)" + file.Headers.ContentDisposition.FileName.Replace("\"", string.Empty);
                    byte[] documentData = File.ReadAllBytes(file.LocalFileName);
                    if (Directory.GetFiles(filesDir, fileName).Length == 0)
                    {
                        string destFile = System.IO.Path.Combine(filesDir, fileName);
                        File.Copy(file.LocalFileName, destFile);
                        resource.filePath = destFile;
                        db.Resources.Add(resource);
                        db.SaveChanges();
                        return Ok();
                    }
                    else
                    {
                        return await UploadAsync();
                    }

                }
                return Ok();
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Route("api/ReplaceFile")]
        public async Task<IHttpActionResult> ReplaceFile()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/App_Data");
            var provider = new MultipartFormDataStreamProvider(root);
            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);

                NameValueCollection formdata = provider.FormData;
                Resource resource = JsonConvert.DeserializeObject<Resource>(formdata["res"].ToString());

                foreach (MultipartFileData file in provider.FileData)
                {
                    var fileName = file.Headers.ContentDisposition.FileName.Replace("\"", string.Empty);
                    byte[] documentData = File.ReadAllBytes(file.LocalFileName);
                    if (Directory.GetFiles(filesDir, fileName).Length > 0)
                    {
                        string destFile = System.IO.Path.Combine(filesDir, fileName);
                        System.IO.File.Delete(filesDir + @"\" + fileName);
                        var r = db.Resources.First(p => p.resourceName == fileName);
                        db.Resources.Remove(r);
                        db.SaveChanges();
                        var per = new List<WebApplication1.Models.Permission>();
                        foreach (var item in resource.Permissions)
                        {
                            per.Add(db.Permissions.First(p => p.permissionsCode == item.permissionsCode));
                        }

                        var cat = new List<Models.Category>();
                        foreach (var item in resource.Categories)
                        {
                            cat.Add(db.Categories.First(p => p.CategoryId == item.CategoryId));
                        }
                        resource.Permissions = per;
                        resource.Categories = cat;
                        resource.filePath = destFile;
                        db.Resources.Add(resource);
                        db.SaveChanges();
                        File.Copy(file.LocalFileName, destFile);
                        return Ok();
                    }
                    else
                    {
                        return await UploadAsync();
                    }

                }
                return Ok();
            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Route("api/UploadFile")]
        public async Task<IHttpActionResult> UploadAsync()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/App_Data");
            var provider = new MultipartFormDataStreamProvider(root);
            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);

                NameValueCollection formdata = provider.FormData;
                Resource resource = JsonConvert.DeserializeObject<Resource>(formdata["res"].ToString());

                foreach (MultipartFileData file in provider.FileData)
                {
                    var fileName = file.Headers.ContentDisposition.FileName.Replace("\"", string.Empty);
                    byte[] documentData = File.ReadAllBytes(file.LocalFileName);
                    if (Directory.GetFiles(filesDir, fileName).Length == 0)
                    {
                        string destFile = System.IO.Path.Combine(filesDir, fileName);
                        resource.filePath = destFile;
                        var per = new List<WebApplication1.Models.Permission>();
                        foreach (var item in resource.Permissions)
                        {
                            per.Add(db.Permissions.First(p => p.permissionsCode == item.permissionsCode));
                        }

                        var cat = new List<Models.Category>();
                        foreach (var item in resource.Categories)
                        {
                            cat.Add(db.Categories.First(p => p.CategoryId == item.CategoryId));
                        }
                        resource.Permissions = per;
                        resource.Categories = cat;
                        db.Resources.Add(resource);
                        db.SaveChanges();
                        File.Copy(file.LocalFileName, destFile);

                        return Ok();
                    }
                    else
                    {
                        var res = db.Resources.First(p => p.resourceName == fileName);
                        return BadRequest(ResourceDto.ConvertToDto(res).ToString());
                    }

                }
                return Ok();
            }
            catch (System.Exception e)
            {

                return BadRequest(e.Message);
            }
        }
    }

}