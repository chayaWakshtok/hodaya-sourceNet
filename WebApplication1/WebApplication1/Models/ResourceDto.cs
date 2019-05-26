using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class ResourceDto
    {
        public int resourceCode { get; set; }
        public string resourceName { get; set; }
        public string filePath { get; set; }
        public string version { get; set; }
        public string authorName { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public Nullable<decimal> sizeB { get; set; }
        public Nullable<decimal> numPage { get; set; }
        public string type { get; set; }
        public  ICollection<CategoryDto> Categories { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public  ICollection<PermissionDto> Permissions { get; set; }

        public static ResourceDto ConvertToDto(Resource resource)
        {
            var cat = resource.Categories;
            List<CategoryDto> list = new List<CategoryDto>();
            foreach (var item in cat)
            {
                list.Add(CategoryDto.ConvertToDto(item));
            }

            var per = resource.Permissions;
            List<PermissionDto> listPer = new List<PermissionDto>();
            foreach (var item in per)
            {
                listPer.Add(PermissionDto.ConvertToDto(item));
            }
            return new ResourceDto()
            {
                Categories = list,
                Permissions = listPer,
                authorName = resource.authorName,
                date = resource.date,
                filePath = resource.filePath,
                numPage = resource.numPage,
                resourceCode = resource.resourceCode,
                resourceName = resource.resourceName,
                sizeB = resource.sizeB,
                type = resource.type,
                version = resource.version
            };
        }
    }
}