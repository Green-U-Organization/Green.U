using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

using GreenUApi.controller;
using Token;
using System.Text;
using GreenUApi.model;

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

        public static async Task<IResult> Login(string usernameInput, string password, greenUDB db)
        {
            var user = await UserController.GetUserForLogin(usernameInput, db);

            if (user.Data[0].Username == null)
                return TypedResults.NotFound();

            var hashedPassword = Hasher(password, Encoding.UTF8.GetBytes(user.Data[0].Salt))[0];

            if (user.Data[0].Password == hashedPassword)
            {
                // Generate a JWT with user data
                var token = Jwt.GenerateJwtToken(user.Data[0]);

                // Return the JWT
                return TypedResults.Ok(new { message = "Mot de passe valide !", token });
            }

            return TypedResults.Unauthorized();
        }

    }
}
