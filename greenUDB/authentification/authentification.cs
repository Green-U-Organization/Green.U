using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Controllers;
using Token;
using System.Text;
using GreenUApi.Models;
using Microsoft.AspNetCore.Mvc;

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

            return new string[] { hashed, Convert.ToBase64String(salt) };

        }

    public static async Task<IResult> Login(string username, string password, greenUDB db)
        {
            var User = await db.Users
            .Where(u => u.Username == username)
            .Select(u => new User
            {
                Id = u.Id,
                Username = u.Username,
                Password = u.Password,
                Salt = u.Salt
            })
            .FirstOrDefaultAsync();

            if (User == null)
            {
                return TypedResults.Unauthorized();
            }


            String hashedPassword = "";
            if(User.Salt != null)
                hashedPassword = Hasher(password, Convert.FromBase64String(User.Salt))[0];

            if (User.Password == hashedPassword)
            {
                var token = Jwt.GenerateJwtToken(User);

                return TypedResults.Ok(new { message = "Mot de passe valide !", token });
            }

            return TypedResults.Unauthorized();
        }

    }
}
