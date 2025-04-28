using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using Token;
using GreenUApi.Models;

namespace GreenUApi.authentification
{
    public class Authentification
    {
        public static string[] Hasher(string password, byte[]? salty)
        {
            // Generate a 128-bit salt using a sequence of
            // cryptographically strong random bytes.
            byte[] salt;
            if(salty != null){
                salt = salty;
            }
            else{
                salt = RandomNumberGenerator.GetBytes(128 / 8); // divide by 8 to convert bits to bytes
            }

            // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password!,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));

            return [hashed, Convert.ToBase64String(salt)];

        }

        public static async Task<JwtResponse<UserDTO>> Login(string Email, string password, GreenUDB db)
        {
            var User = await db.Users
            .Where(u => u.Email == Email)
            .Select(u => new User
            {
                Id = u.Id,
                Username = u.Username,
                Password = u.Password,
                Salt = u.Salt
            })
            .FirstOrDefaultAsync();

            if (User == null) return new JwtResponse<UserDTO> { isEmpty = true, message = "The Email is bad..." };


            string hashedPassword = "";
            if (User.Salt != null)
                hashedPassword = Hasher(password, Convert.FromBase64String(User.Salt))[0];

            if (User.Password == hashedPassword)
            {
                var JwtRes = Jwt.GenerateJwtToken(new User { Id = User.Id, Username = User.Username });

                return JwtRes;
            }

            return new JwtResponse<UserDTO> { isEmpty = true, message = "The pass is wrong" };
        }

    }
}