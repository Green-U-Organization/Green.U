using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

using GreenUApi.controller;
using Token;

namespace GreenUApi.authentification
{
    public class Authentification
    {
        public static string[] hasher(string password, byte[] salty)
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

        // public static async Task<IResult> Login(string username, greenUDB db, string password)
        // {
        // //   var user = await UserController.GetUser(usdb);

        //     if (user == null)
        //         return TypedResults.NotFound();

        //     var hashedPassword = hasher(password, Convert.FromBase64String(user.salt))[0];

        //     if (user.password == hashedPassword)
        //     {
        //         // Générer un JWT avec les informations de l'utilisateur
        //         var token = Jwt.GenerateJwtToken(user);

        //         // Retourner le jeton JWT à l'utilisateur
        //         return TypedResults.Ok(new { message = "Mot de passe valide !", token });
        //     }
            
        //     return TypedResults.Unauthorized();
        // }

    }
}
