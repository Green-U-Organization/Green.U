using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace GreenUApi.Controllers
{
    [Route("garden")]
    [ApiController]
    // [Authorize]
    public class GardenController : ControllerBase
    {
        private readonly GreenUDB _context;

        public GardenController(GreenUDB context)
        {
            _context = context;
        }

        /// <summary>
        /// Récupère les informations d'un jardin par son ID.
        /// </summary>
        /// <param name="id">L'ID du jardin à récupérer.</param>
        /// <returns>Retourne un jardin correspondant à l'ID spécifié, ou HTTP 404 Not Found si le jardin n'existe pas.</returns>
        /// <remarks>
        /// Exemple de requête GET pour obtenir un jardin :
        ///
        /// GET /garden/{id}
        /// </remarks>
        [HttpGet("{id}")]
        public async Task<ActionResult<Garden>> GetGarden(long id)
        {
            var garden = await _context.Gardens.FindAsync(id);

            if (garden == null)
            {
                return NotFound();
            }

            return garden;
        }

        /// <summary>
        /// Récupère tous les jardins associés à un utilisateur par son nom d'utilisateur.
        /// </summary>
        /// <param name="author">Le nom d'utilisateur de l'auteur des jardins.</param>
        /// <returns>Retourne une liste de jardins associés à l'utilisateur, ou HTTP 404 Not Found si l'utilisateur ou les jardins n'existent pas.</returns>
        /// <remarks>
        /// Exemple de requête GET pour obtenir les jardins d'un utilisateur :
        ///
        /// GET /garden/username/{author}
        /// </remarks>
        [HttpGet("username/{author}")]
        public async Task<ActionResult<IEnumerable<Garden>>> GetGardensByName(string author)
        {
            var user = await _context.Users.Where(u => u.Username == author).ToListAsync();

            if(user == null){
                return NotFound();
            }

            var gardens = await _context.Gardens
                                        .Where(g => g.AuthorId == user[0].Id)
                                        .ToListAsync();

            if (gardens == null)
            {
                return NotFound();
            }

            return gardens;
        }

        /// <summary>
        /// Récupère tous les jardins associés à un utilisateur par son nom d'utilisateur.
        /// </summary>
        /// <param name="userId">L'id de l'auteur des jardins.</param>
        /// <returns>Retourne une liste de jardins associés à l'utilisateur, ou HTTP 404 Not Found si l'utilisateur ou les jardins n'existent pas.</returns>
        /// <remarks>
        /// Exemple de requête GET pour obtenir les jardins d'un utilisateur :
        ///
        /// GET /garden/user/{authorId}
        /// </remarks>
        /// <returns></returns>
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Garden>>> GetGardensByUser(long userId)
        {
            var gardens = await _context.Gardens
                                        .Where(g => g.AuthorId == userId)
                                        .ToListAsync();

            if (gardens == null)
            {
                return NotFound();
            }

            return gardens;
        }

        /// <summary>
        /// Met à jour les informations d'un jardin existant.
        /// </summary>
        /// <param name="id">L'ID du jardin à mettre à jour.</param>
        /// <param name="garden">L'objet jardin avec les nouvelles informations.</param>
        /// <returns>Retourne HTTP 204 No Content si la mise à jour est réussie, ou HTTP 404 Not Found si le jardin n'existe pas.</returns>
        /// <remarks>
        /// Exemple de requête PATCH pour mettre à jour un jardin :
        ///
        /// PATCH /garden/{id}
        /// Body:
        /// {
        ///     "name": "New Garden Name",
        ///     "location": "New Location"
        /// }
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchGarden(long id, Garden garden)
        {
            garden.Id = id;
            _context.Entry(garden).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GardenExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        /// <summary>
        /// Crée un nouveau jardin.
        /// </summary>
        /// <param name="garden">L'objet jardin à ajouter.</param>
        /// <returns>Retourne HTTP 201 Created avec l'objet jardin créé et un lien vers la ressource créée.</returns>
        /// <remarks>
        /// Exemple de requête POST pour ajouter un jardin :
        ///
        /// POST /garden
        /// Body:
        /// {
        ///     "id": 0,
        ///     "authorId": 0,
        ///     "name": "string",
        ///     "description": "string",
        ///     "latitude": 0,
        ///     "longitude": 0,
        ///     "length": 0,
        ///     "width": 0
        /// }
        /// </remarks>
        [HttpPost]
        public async Task<ActionResult<Garden>> PostGarden([FromBody] Garden garden)
        {
            if (garden == null)
            {
                return BadRequest("Invalid garden data.");
            }

            var userExists = await _context.Users.AnyAsync(u => u.Id == garden.AuthorId);
            if (!userExists)
            {
                return BadRequest("The specified authorId does not exist.");
            }

            garden.CreatedAt = DateTime.UtcNow;

            _context.Gardens.Add(garden);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGarden), new { id = garden.Id }, garden);
        }


        /// <summary>
        /// Supprime un jardin par son ID.
        /// </summary>
        /// <param name="id">L'ID du jardin à supprimer.</param>
        /// <returns>Retourne HTTP 204 No Content si la suppression est réussie, ou HTTP 404 Not Found si le jardin n'existe pas.</returns>
        /// <remarks>
        /// Exemple de requête DELETE pour supprimer un jardin :
        ///
        /// DELETE /garden/{id}
        /// </remarks>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGarden(long id)
        {
            try
            {
                var garden = await _context.Gardens.FindAsync(id);
                if (garden == null)
                {
                    return NotFound();
                }

                var parcels = await _context.Parcels.Where(p => p.GardenId == id).ToListAsync();

                // Supprimer chaque parcel associé
                foreach (var parcel in parcels)
                {
                    _context.Parcels.Remove(parcel);
                }

                // Supprimer le jardin
                _context.Gardens.Remove(garden);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.InnerException?.Message ?? ex.Message}");
            }

            return NoContent();
        }


        /// <summary>
        /// Vérifie si un jardin existe dans la base de données.
        /// </summary>
        /// <param name="id">L'ID du jardin à vérifier.</param>
        /// <returns>Retourne true si le jardin existe, sinon false.</returns>
        /// <remarks>
        /// Cette méthode est utilisée pour vérifier la présence d'un jardin avant de tenter une mise à jour ou une suppression.
        /// </remarks>
        private bool GardenExists(long id)
        {
            return _context.Gardens.Any(e => e.Id == id);
        }
    }
}
