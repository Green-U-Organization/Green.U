using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;

namespace GreenUApi.authentification
{

    public class UserDTO
    {
        public bool? Error {  get; set; }
        public string? Message { get; set; }
        public long? Id { get; set; }
        public string? Username { get; set; }
    }

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

        public static async Task<UserDTO> VerifyCredentials(string Email, string password, GreenUDB db)
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

            if (User == null) return new UserDTO { Error = true, Message = "Email is wrong"};


            string hashedPassword = "";
            if (User.Salt != null)
                hashedPassword = Hasher(password, Convert.FromBase64String(User.Salt))[0];

            if (User.Password == hashedPassword)
            {
                return new UserDTO { Id = User.Id, Username = User.Username };
            }

            return new UserDTO { Error = true, Message = "Pass is wrong" };
        }

    }
}