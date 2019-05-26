using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class UserDto
    {
        public int userCode { get; set; }
        public string userName { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public Nullable<int> roleCode { get; set; }
        public Nullable<System.DateTime> year { get; set; }

        public  RoleDto Role { get; set; }

        public static UserDto ConvertToDto(User user)
        {
            return new UserDto()
            {
                email = user.email,
                password = user.password,
                roleCode = user.roleCode,
                userCode = user.userCode,
                userName = user.userName,
                year = user.year,
                Role= RoleDto.ConvertToDto(user.Role)
        };
        }
    }
}