using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GreenUApi.Models;
using YamlDotNet.Core.Tokens;

namespace GreenUApi.Controllers
{
    public class CropDto{
        public long? LineId { get; set; }

        public long? PlantNurseryId { get; set; }

        public string Vegetable { get; set; } = "no Vege";

        public string? Variety { get; set; }

        public long? Icon { get; set; }

        public DateOnly? Sowing { get; set; }

        public DateOnly? Planting { get; set; }

        public DateOnly? Harvesting { get; set; }
    }

    [Route("crops")]
    // [ApiController]
    public class CropController : ControllerBase
    {
        private readonly GreenUDB _context;

        public CropController(GreenUDB context)
        {
            _context = context;
        }

        /// <summary>
        /// Route : GET: /Crop
        /// <return> 
        /// Liste des cultures avec les détails comme l'ID, LineId, PlantNurseryId, etc.
        /// Le format de la réponse sera le suivant:
        /// <code>
        /// [
        ///   {
        ///     "id": 0,
        ///     "lineId": 0,
        ///     "plantNurseryId": 0,
        ///     "vegetable": "string",
        ///     "variety": "string",
        ///     "icon": 0,
        ///     "sowing": "2025-04-06",
        ///     "planting": "2025-04-06",
        ///     "harvesting": "2025-04-06",
        ///     "createdAt": "2025-04-06T07:29:58.548Z",
        ///     "line": "string",
        ///     "logs": [
        ///       {
        ///         "id": 1,
        ///         "description": "Log entry example",
        ///         "timestamp": "2025-04-06T07:29:58.548Z"
        ///       }
        ///     ]
        ///   }
        /// ]
        /// </code>
        /// </return>
        /// </summary>

        [HttpGet("line/{lineId}")]
        public async Task<ActionResult<IEnumerable<Crop>>> GetCropsByline(long lineId){
            var crops = await _context.Crops.Where(c => c.LineId == lineId).ToListAsync();
            if(!crops.Any()){
                return BadRequest(new { isEmpty = true, message = "No crop here..." });
            }

            return Ok(new { isEmpty = false, message = "All crops with line id", content = crops});
        }

        [HttpGet("plantNursery/{plantNursery}")]
        public async Task<ActionResult<IEnumerable<Crop>>> GetCropsByPlantNursery(long line){
            var crops = await _context.Crops.Where(c => c.PlantNurseryId == line).ToListAsync();
            if(!crops.Any()){
                return NotFound(new { isEmpty = true, message = "No crops..." });
            }

            return Ok(new { isEmpty = false, message = "All crops with plant nursery id", content = crops });
        }

        /// <summary>
        /// Met à jour les informations d'une culture existante.
        /// </summary>
        /// <param name="id">L'ID de la culture à mettre à jour.</param>
        /// <param name="crop">Les données de la culture à mettre à jour. Si l'ID de la culture dans l'URL ne correspond pas à celui de l'objet passé, une erreur est retournée.</param>
        /// <returns>
        /// - **204 No Content** si la culture a été mise à jour avec succès. 
        /// - **400 Bad Request** si l'ID de l'URL ne correspond pas à l'ID de l'objet culture passé.
        /// - **404 Not Found** si la culture à mettre à jour n'existe pas.
        /// </returns>
        /// <remarks>
        /// Exemple de requête PATCH pour la mise à jour d'une culture :
        ///
        /// PATCH /crops/{id}
        /// Content-Type: application/json
        /// Body:
        /// {
        ///     "id": 1,
        ///     "lineId": 2,
        ///     "plantNurseryId": 3,
        ///     "vegetable": "Tomato",
        ///     "variety": "Cherry",
        ///     "icon": 5,
        ///     "sowing": "2025-04-06T00:00:00Z",
        ///     "planting": "2025-05-01T00:00:00Z",
        ///     "harvesting": "2025-08-01T00:00:00Z"
        /// }
        /// </remarks>  
          
       [HttpPatch("{id}")]
        public async Task<IActionResult> PatchCrop(long id, [FromBody] CropDto crop)
        {
            var existingCrop = await _context.Crops.FindAsync(id);
            if (existingCrop == null) return NotFound();
            if (crop.Vegetable != null) existingCrop.Vegetable = crop.Vegetable;
            if (crop.Variety != null) existingCrop.Variety = crop.Variety;
            if (crop.LineId != 0) existingCrop.LineId = crop.LineId;
            if (crop.Icon != null) existingCrop.Icon = crop.Icon;
            if (crop.Sowing != null) existingCrop.Sowing = crop.Sowing;
            if (crop.Planting != null) existingCrop.Planting = crop.Planting;
            if (crop.Harvesting != null) existingCrop.Harvesting = crop.Harvesting;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(existingCrop);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.InnerException?.Message ?? ex.Message}");
            }
        }


        /// <summary>
        /// Crée une nouvelle culture dans la base de données.
        /// </summary>
        /// <param name="crop">L'objet culture à ajouter à la base de données.</param>
        /// <returns>Retourne une réponse HTTP 201 Created avec l'élément créé et un lien vers la ressource créée.</returns>
        /// <remarks>
        /// Exemple de requête POST pour ajouter une culture :
        ///
        /// POST /crops
        /// Content-Type: application/json
        /// Body:
        /// {
        ///     "lineId": 1,
        ///     "plantNurseryId": 2,
        ///     "vegetable": "Carrot",
        ///     "variety": "Baby",
        ///     "icon": 3
        /// }
        /// </remarks>
        
        [HttpPost]
        public async Task<ActionResult<Crop>> PostCrop([FromBody] Crop crop)
        {
            if (!crop.LineId.HasValue && !crop.PlantNurseryId.HasValue)
            {
                return BadRequest(new { message = "No id for line or plantNursery"});
            }

            if (crop.LineId.GetValueOrDefault(0) != 0)
            {
                var ExistingLine = await _context.Lines
                    .FindAsync(crop.LineId);

                if (ExistingLine == null) return BadRequest(new { message = "Line id is incorrect" });
            }

            if (crop.PlantNurseryId.GetValueOrDefault(0) != 0)
            {
                var ExistingPlantNursery = await _context.PlantNursery
                    .FindAsync(crop.PlantNurseryId);
                if (ExistingPlantNursery == null) return BadRequest(new { message = "PlantNursery id is bad" });
            }

            _context.Crops.Add(crop);
                await _context.SaveChangesAsync();

                return Ok(crop);

        }

        /// <summary>
        /// Supprime une culture par son ID.
        /// </summary>
        /// <param name="id">L'ID de la culture à supprimer.</param>
        /// <returns>
        /// Retourne une réponse HTTP 204 No Content si la suppression est réussie,
        /// ou HTTP 404 Not Found si la culture n'existe pas.
        /// </returns>
        /// <remarks>
        /// Exemple de requête DELETE pour supprimer une culture :
        ///
        /// DELETE /crops/{id}
        /// </remarks>
        [HttpDelete]
        public async Task<IActionResult> DeleteCrop(long id)
        {
            var crop = await _context.Crops.FindAsync(id);
            if (crop == null)
            {
                return NotFound();
            }

            _context.Crops.Remove(crop);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Vérifie si une culture existe dans la base de données.
        /// </summary>
        /// <param name="id">L'ID de la culture à vérifier.</param>
        /// <returns>Retourne true si la culture existe, sinon false.</returns>
        /// <remarks>
        /// Cette méthode est utilisée pour vérifier la présence d'une culture avant de tenter une mise à jour ou suppression.
        /// </remarks>
        private bool CropExists(long id)
        {
            return _context.Crops.Any(e => e.Id == id);
        }
    }
}
