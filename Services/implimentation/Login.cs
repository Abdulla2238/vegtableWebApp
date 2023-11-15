using ApiCreation.Models;
using ApiCreation.Services.contract;
using ApiCreation.utilities;
using Microsoft.Extensions.Configuration;
using System;
using BCrypt.Net;
using System.Net;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ApiCreation.Services.implimentation
{
    public class Login : iLogin
    {
        private readonly LoginAPIContext _companyContext;
        private readonly IConfiguration _configuration;

        public Login(LoginAPIContext companyContext, IConfiguration configuration)
        {
            _companyContext = companyContext;
            _configuration = configuration;
        }

        public LoginRequest AddData(LoginRequest adddata)
        {
            try
            {
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(adddata.Password);

                var newCustomer = new Registration
                {
                    Password = hashedPassword,
                    Email = adddata.Email,
                };

                _companyContext.Registrations.Add(newCustomer);
                _companyContext.SaveChanges();

                adddata.Password = hashedPassword;

                return adddata;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

      

        public string Verify(LoginRequest verifylogin)
        {

            var storedCustomer = _companyContext.Registrations.FirstOrDefault(c => c.Email == verifylogin.Email);

            if (storedCustomer == null)
            {
                return "wrong";
            }
            if (!BCrypt.Net.BCrypt.Verify(verifylogin.Password, storedCustomer.Password))
            {
                return "Wrong Password";
            }

            var token = CreateToken(verifylogin);
            return token;
        }
        public string CreateToken(LoginRequest JwtLogin)
        {
            List<Claim> claims = new List<Claim>
            {
                 new Claim(ClaimTypes.Name,JwtLogin.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
               _configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMonths(1),
                signingCredentials: cred);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;


        }
    }
}
