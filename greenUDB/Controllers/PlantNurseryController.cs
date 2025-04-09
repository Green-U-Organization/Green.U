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
    [Route("plantnursery")]
    [ApiController]
    // [Authorize]
    public class PlantNurseryController : ControllerBase
    {
        private readonly GreenUDB _context;

        public PlantNurseryController(GreenUDB context)
        {
            _context = context;
        }

        /// <summary>
        /// Récupère toutes les pépinières de plantes.
        /// </summary>
        /// <returns>Retourne une liste d'objets PlantNursery ou HTTP 404 Not Found si aucune pépinière n'est trouvée.</returns>
        /// <remarks>
        /// Exemple de requête GET pour récupérer toutes les pépinières de plantes :
        ///
        /// GET /plantnursery
        /// </remarks>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlantNursery>>> GetPlantNursery()
        {
            return await _context.PlantNursery.ToListAsync();
        }

        /// <summary>
        /// Récupère une pépinière de plantes par son ID.
        /// </summary>
        /// <param name="id">L'ID de la pépinière à récupérer.</param>
        /// <returns>Retourne une pépinière de plantes ou HTTP 404 Not Found si la pépinière n'existe pas.</returns>
        /// <remarks>
        /// Exemple de requête GET pour récupérer une pépinière spécifique par son ID :
        ///
        /// GET /plantnursery/{id}
        /// </remarks>
        [HttpGet("{id}", Name = "GetPlantNursery")]
        public async Task<ActionResult<PlantNursery>> GetPlantNursery(long? id)
        {
            var plantNursery = await _context.PlantNursery.FindAsync(id);

            if (plantNursery == null)
            {
                return NotFound();
            }

            return plantNursery;
        }

        /// <summary>
        /// Met à jour les informations d'une pépinière de plantes existante.
        /// </summary>
        /// <param name="id">L'ID de la pépinière à mettre à jour.</param>
        /// <param name="plantNursery">L'objet PlantNursery avec les nouvelles informations.</param>
        /// <returns>Retourne HTTP 204 No Content si la mise à jour est réussie, ou HTTP 404 Not Found si la pépinière n'existe pas.</returns>
        /// <remarks>
        /// Exemple de requête PATCH pour mettre à jour une pépinière de plantes :
        ///
        /// PATCH /api/plantnursery/{id}
        /// Body:
        /// {
        ///     "gardenId": 5,
        /// }
        /// </remarks>
        [HttpPatch("{id}")]
        public async Task<IActionResult> PutPlantNursery(long? id, PlantNursery plantNursery)
        {
            if (id != plantNursery.Id)
            {
                return BadRequest();
            }

            _context.Entry(plantNursery).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlantNurseryExists(id))
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
        /// Crée une nouvelle pépinière de plantes.
        /// </summary>
        /// <param name="plantNursery">L'objet PlantNursery à ajouter.</param>
        /// <returns>Retourne HTTP 201 Created avec l'objet PlantNursery créé et un lien vers la ressource créée.</returns>
        /// <remarks>
        /// Exemple de requête POST pour ajouter une pépinière de plantes :
        ///
        /// POST /plantnursery
        /// Body:
        /// {
        ///     "gardenId": 2,
        /// }
        /// </remarks>
        [HttpPost]
        public async Task<ActionResult<PlantNursery>> PostPlantNursery(PlantNursery plantNursery)
        {
            _context.PlantNursery.Add(plantNursery);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlantNursery", new { id = plantNursery.Id }, plantNursery);
        }

        /// <summary>
        /// Supprime une pépinière de plantes par son ID.
        /// </summary>
        /// <param name="id">L'ID de la pépinière à supprimer.</param>
        /// <returns>Retourne HTTP 204 No Content si la suppression est réussie, ou HTTP 404 Not Found si la pépinière n'existe pas.</returns>
        /// <remarks>
        /// Exemple de requête DELETE pour supprimer une pépinière de plantes :
        ///
        /// DELETE /plantnursery/{id}
        /// </remarks>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlantNursery(long? id)
        {
            var plantNursery = await _context.PlantNursery.FindAsync(id);
            if (plantNursery == null)
            {
                return NotFound();
            }

            _context.PlantNursery.Remove(plantNursery);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Vérifie si une pépinière de plantes existe dans la base de données.
        /// </summary>
        /// <param name="id">L'ID de la pépinière à vérifier.</param>
        /// <returns>Retourne true si la pépinière existe, sinon false.</returns>
        /// <remarks>
        /// /// Cette méthode est utilisée pour vérifier la présence d'une pépinière avant de tenter une mise à jour ou une suppression.
        /// </remarks>
        private bool PlantNurseryExists(long? id)
        {
            return _context.PlantNursery.Any(e => e.Id == id);
        }
    }
}
