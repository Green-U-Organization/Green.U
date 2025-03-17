using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
    
namespace GreenUApi.authentification
{
    
    public class passwordHasher
    {
        public static string hasher(string password)
        {
        // Generate a 128-bit salt using a sequence of
        // cryptographically strong random bytes.
        byte[] salt = RandomNumberGenerator.GetBytes(128 / 8); // divide by 8 to convert bits to bytes
            Convert.ToBase64String(salt);

            Convert.FromBase64String("CGYzqeN4plZekNC88Umm1Q==");

            Console.WriteLine(salt);

        // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password!,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));

            return hashed;

        /*
         * SAMPLE OUTPUT
         *
         * Enter a password: Xtw9NMgx
         * Salt: CGYzqeN4plZekNC88Umm1Q==
         * Hashed: Gt9Yc4AiIvmsC1QQbe2RZsCIqvoYlst2xbz0Fs8aHnw=
         */

        }

    }
}
