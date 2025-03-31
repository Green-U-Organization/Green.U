using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

using GreenUApi.controller;
using Token;
using System.Text;
using GreenUApi.model;
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

        public static Task<IResult> Login([FromBody] User user, string InputPassword)
        {

            var hashedPassword = Hasher(InputPassword, Encoding.UTF8.GetBytes(user.Salt))[0];

            if (user.Password == hashedPassword)
            {
                // Generate a JWT with user data
                var token = Jwt.GenerateJwtToken(user);

                // Return the JWT
                return TypedResults.Ok(token);
            }

            return TypedResults.Unauthorized();
        }

    }
}
