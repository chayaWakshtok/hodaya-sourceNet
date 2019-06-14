using iTextSharp.text.pdf;
using iTextSharp.text.pdf.parser;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;
using WordToPDF;

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

        [HttpPost]
        [Route("api/search/{s}")]
        public IHttpActionResult SearchText(string s,List<ResourceDto> list)
        {
            List<ResourceDto> listSearch = new List<ResourceDto>();
            foreach (var item in list)
            {
                string FileExtension = System.IO.Path.GetExtension(item.filePath);
                if (FileExtension == ".pdf" )
                {
                    PdfReader reader = new PdfReader(item.filePath);
                    string text = string.Empty;
                    for (int page = 1; page <= reader.NumberOfPages; page++)
                    {
                        text += PdfTextExtractor.GetTextFromPage(reader, page);
                    }
                    reader.Close();
                    if (text.Contains(s))
                    {
                        listSearch.Add(item);
                    }
                }
                if (FileExtension == ".txt")
                {
                    StreamReader reader = new StreamReader(item.filePath);
                    string content = reader.ReadToEnd();
                    reader.Close();
                    if (content.Contains(s))
                    {
                        listSearch.Add(item);
                    }
                }
                if (FileExtension == ".xlsx" || FileExtension == ".csv")
                {
                    string ChangeExtension = item.filePath.Replace(FileExtension, ".pdf");
                    SautinSoft.ExcelToPdf x = new SautinSoft.ExcelToPdf();
                    x.ConvertFile(item.filePath, ChangeExtension);

                    PdfReader reader = new PdfReader(ChangeExtension);
                    string text = string.Empty;
                    for (int page = 1; page <= reader.NumberOfPages; page++)
                    {
                        text += PdfTextExtractor.GetTextFromPage(reader, page);
                    }
                    reader.Close();
                    if (text.Contains(s))
                    {
                        listSearch.Add(item);
                    }
                    File.Delete(ChangeExtension);
                }
                if (FileExtension == ".doc" || FileExtension == ".docx")
                {
                    Word2Pdf objWorPdf = new Word2Pdf();
                    string ChangeExtension = item.filePath.Replace(FileExtension, ".pdf");
                    objWorPdf.InputLocation = item.filePath;
                    objWorPdf.OutputLocation = ChangeExtension;
                    objWorPdf.Word2PdfCOnversion();
                    PdfReader reader = new PdfReader(ChangeExtension);
                    string text = string.Empty;
                    for (int page = 1; page <= reader.NumberOfPages; page++)
                    {
                        text += PdfTextExtractor.GetTextFromPage(reader, page);
                    }
                    reader.Close();
                    if (text.Contains(s))
                    {
                        listSearch.Add(item);
                    }

                    File.Delete(ChangeExtension);
                }

            }
            return Ok(listSearch);
          
        }

    }
}
