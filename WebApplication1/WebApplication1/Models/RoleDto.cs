using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class RoleDto
    {
        public int roleCode { get; set; }
        public string roleType { get; set; }

        public virtual ICollection<PermissionDto> Permissions { get; set; }

        public static RoleDto ConvertToDto(Role role)
        {
            List<PermissionDto> per =new List<PermissionDto>();
            foreach (var item in role.Permissions)
            {
                per.Add(PermissionDto.ConvertToDto(item));
            }
            return new RoleDto()
            {
                Permissions = per,
                roleCode = role.roleCode,
                roleType = role.roleType
            };
        }

        public static Role ConvertToDB1(RoleDto role)
        {
            List<Permission> per = new List<Permission>();
            foreach (var item in role.Permissions)
            {
                per.Add(PermissionDto.ConvertToDB(item));
            }
            return new Role()
            {
                Permissions = per,
                roleCode = role.roleCode,
                roleType = role.roleType
            };
        }
    }
}