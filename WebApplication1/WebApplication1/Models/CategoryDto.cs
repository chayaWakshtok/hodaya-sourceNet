using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class CategoryDto
    {
        public int CategoryId { get; set; }
        public string categoryName { get; set; }

        public static CategoryDto ConvertToDto(Category category)
        {
            return new CategoryDto() {
                CategoryId=category.CategoryId,
                categoryName=category.categoryName
            };
        }

        public static Category ConvertToDB(CategoryDto category)
        {
            return new Category()
            {
                CategoryId = category.CategoryId,
                categoryName = category.categoryName
            };
        }
    }
}