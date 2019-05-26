using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class PermissionDto
    {
        public int permissionsCode { get; set; }
        public string permissionsType { get; set; }

        public static PermissionDto ConvertToDto(Permission permission)
        {
            return new PermissionDto()
            {
                permissionsCode=permission.permissionsCode,
                permissionsType=permission.permissionsType
            };
        }

        public static Permission ConvertToDB(PermissionDto permission)
        {
            return new Permission()
            {
                permissionsCode = permission.permissionsCode,
                permissionsType = permission.permissionsType
            };
        }
    }
}