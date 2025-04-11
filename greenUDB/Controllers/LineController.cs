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

    public class LineDto
    {
        public long? Id { get; set; }
        public long? ParcelId { get; set; }
        public long? PlantNurseryId { get; set; }
        public double? Length { get; set; }
        public DateTime? CreatedAt { get; set; }
    }

    [Route("/garden/parcel/line")]
    [ApiController]
    // [Authorize]
    public class LineController : ControllerBase
    {
        private readonly GreenUDB _context;

        public LineController(GreenUDB context)
        {
            _context = context;
        }

        /// <summary>
        /// Récupère les informations d'une ligne par son ID.
        /// </summary>
        /// <param name="id">L'ID de la ligne à récupérer.</param>
        /// <returns>Retourne la ligne correspondante à l'ID spécifié, ou HTTP 404 Not Found si la ligne n'existe pas.</returns>
        /// <remarks>
        /// Exemple de requête GET pour obtenir une ligne :
        /// GET /line/{id}
        /// </remarks>
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<LineDto>>> GetLine(long id)
        {
            var lines = await _context.Lines
                .Where(l => l.ParcelId == id)
                .Select(l => new LineDto
                {
                    Id = l.Id,
                    ParcelId = l.ParcelId,
                    PlantNurseryId = l.PLantNurseryId,
                    Length = l.Length,
                    CreatedAt = l.CreatedAt
                })
                .ToListAsync();

            if (lines == null || !lines.Any())
            {
                return NotFound();
            }

            return lines;
        }

        /// <summary>
        /// Met à jour les informations d'une ligne existante.
        /// </summary>
        /// <param name="id">L'ID de la ligne à mettre à jour.</param>
        /// <param name="line">L'objet ligne avec les nouvelles informations.</param>
        /// <returns>Retourne HTTP 204 No Content si la mise à jour est réussie, ou HTTP 404 Not Found si la ligne n'existe pas.</returns>
        /// <remarks>
        /// Exemple de requête PATCH pour mettre à jour une ligne :
        ///
        /// PATCH /api/line/{id}
        /// Body:
        /// {
        ///     "name": "Updated Line",
        ///     "location": "Updated Location"
        /// }
        /// </remarks>
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchLine(long id, Line line)
        {
            if (id != line.Id)
            {
                return BadRequest();
            }

            _context.Entry(line).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LineExists(id))
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
        /// Crée une nouvelle ligne.
        /// </summary>
        /// <param name="line">L'objet ligne à ajouter.</param>
        /// <returns>Retourne HTTP 201 Created avec l'objet ligne créé et un lien vers la ressource créée.</returns>
        /// <remarks>
        /// Exemple de requête POST pour ajouter une ligne :
        ///
        /// POST /api/line
        /// Body:
        /// {
        ///     "parcelId": 0,
        ///     "Length": 57.4,
        /// }
        /// </remarks>
       [HttpPost]
        public async Task<ActionResult<Line>> PostLine(LineDto line)
        {
            var newLine = new Line{
                Id = line.Id,
                ParcelId = line.ParcelId,
                PLantNurseryId = line.PlantNurseryId,
                Length = line.Length,
                CreatedAt = DateTime.UtcNow
            };
            

            _context.Lines.Add(newLine);
            await _context.SaveChangesAsync();

            // Retourner la réponse avec l'URL de la ressource créée
            return Ok(newLine);
        }

        /// <summary>
        /// Supprime une ligne par son ID.
        /// </summary>
        /// <param name="id">L'ID de la ligne à supprimer.</param>
        /// <returns>Retourne HTTP 204 No Content si la suppression est réussie, ou HTTP 404 Not Found si la ligne n'existe pas.</returns>
        /// <remarks>
        /// Exemple de requête DELETE pour supprimer une ligne :
        ///
        /// DELETE /line/{id}
        /// </remarks>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLine(long id)
        {
            var line = await _context.Lines.FindAsync(id);
            if (line == null)
            {
                return NotFound();
            }

            _context.Lines.Remove(line);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        /// <summary>
        /// Vérifie si une ligne existe dans la base de données.
        /// </summary>
        /// <param name="id">L'ID de la ligne à vérifier.</param>
        /// <returns>Retourne true si la ligne existe, sinon false.</returns>
        /// <remarks>
        /// Cette méthode est utilisée pour vérifier la présence d'une ligne avant de tenter une mise à jour ou une suppression.
        /// </remarks>
        private bool LineExists(long id)
        {
            return _context.Lines.Any(e => e.Id == id);
        }
    }
}
