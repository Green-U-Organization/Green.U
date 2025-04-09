using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace GreenUApi.Controllers
{
    [Route("garden/parcel")]
    [ApiController]
    // [Authorize]
    public class ParcelController : ControllerBase
    {
        private readonly GreenUDB _context;

        public ParcelController(GreenUDB context)
        {
            _context = context;
        }

        /// <summary>
        /// Récupère la liste des parcelles associées à un jardin spécifique par son ID.
        /// </summary>
        /// <param name="id">L'ID du jardin pour lequel récupérer les parcelles.</param>
        /// <returns>Retourne une liste de parcelles associées au jardin ou HTTP 404 Not Found si aucune parcelle n'est trouvée.</returns>
        /// <remarks>
        /// Exemple de requête GET pour obtenir les parcelles d'un jardin :
        ///
        /// GET /parcel/{id}
        /// </remarks>
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Parcel>>> GetParcel(long id)
        {
            var parcel = await _context.Parcels.Where(g => g.GardenId == id)
                                        .ToListAsync();;

            if (parcel == null)
            {
                return NotFound();
            }

            return parcel;
        }

        /// <summary>
        /// Met à jour les informations d'une parcelle existante.
        /// </summary>
        /// <param name="id">L'ID de la parcelle à mettre à jour.</param>
        /// <param name="parcel">L'objet parcelle avec les nouvelles informations.</param>
        /// <returns>Retourne HTTP 204 No Content si la mise à jour est réussie, ou HTTP 404 Not Found si la parcelle n'existe pas.</returns>
        /// <remarks>
        /// Exemple de requête PATCH pour mettre à jour une parcelle :
        ///
        /// PATCH /parcel/{id}
        /// Body:
        /// {
        ///     "name": "Updated Parcel",
        ///     "size": "Updated Size",
        ///     "gardenId": 1
        /// }
        /// </remarks>
        [HttpPatch("{id}")]
        public async Task<IActionResult> PutParcel(long id, Parcel parcel)
        {
            if (id != parcel.Id)
            {
                return BadRequest();
            }

            _context.Entry(parcel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ParcelExists(id))
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
        /// Crée une nouvelle parcelle.
        /// </summary>
        /// <param name="parcel">L'objet parcelle à ajouter.</param>
        /// <returns>Retourne HTTP 201 Created avec l'objet parcelle créé et un lien vers la ressource créée.</returns>
        /// <remarks>
        /// Exemple de requête POST pour ajouter une parcelle :
        ///
        /// POST /parcel
        /// Body:
        /// {
        ///     "id": 0,
        ///     "gardenId": 0,
        ///     "length": 0,
        ///     "width": 0,
        ///     "nLine": 0,
        ///     "parcelAngle": 0,
        /// }
        /// </remarks>
        [HttpPost]
        public async Task<ActionResult<Parcel>> PostParcel(Parcel parcel)
        {
            parcel.Id = 0;
    
            _context.Parcels.Add(parcel);
            await _context.SaveChangesAsync();

            parcel.CreatedAt = DateTime.UtcNow;
            
            return CreatedAtAction("GetParcel", new { id = parcel.Id }, parcel);
        }

        /// <summary>
        /// Supprime une parcelle par son ID.
        /// </summary>
        /// <param name="id">L'ID de la parcelle à supprimer.</param>
        /// <returns>Retourne HTTP 204 No Content si la suppression est réussie, ou HTTP 404 Not Found si la parcelle n'existe pas.</returns>
        /// <remarks>
        /// Exemple de requête DELETE pour supprimer une parcelle :
        ///
        /// DELETE /parcel/{id}
        /// </remarks>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteParcel(long id)
        {
            var parcel = await _context.Parcels.FindAsync(id);
            if (parcel == null)
            {
                return NotFound();
            }

            _context.Parcels.Remove(parcel);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        /// <summary>
        /// Vérifie si une parcelle existe dans la base de données.
        /// </summary>
        /// <param name="id">L'ID de la parcelle à vérifier.</param>
        /// <returns>Retourne true si la parcelle existe, sinon false.</returns>
        /// <remarks>
        /// Cette méthode est utilisée pour vérifier la présence d'une parcelle avant de tenter une mise à jour ou une suppression.
        /// </remarks>
        private bool ParcelExists(long id)
        {
            return _context.Parcels.Any(e => e.Id == id);
        }
    }
}
