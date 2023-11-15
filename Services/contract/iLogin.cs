using ApiCreation.Models;
using ApiCreation.utilities;
using System.Net;

namespace ApiCreation.Services.contract
{
    public interface iLogin
    {
        public LoginRequest AddData(LoginRequest adddata);
        public string Verify(LoginRequest verifylogin);
        public string CreateToken(LoginRequest JwtLogin);
    }
}
