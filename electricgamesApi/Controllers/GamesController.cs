using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using electricgamesApi.Service;
using electricgamesApi.Collection;

namespace electricgamesApi.Controllers;

[ApiController]
[Route("games/[controller]")]

//Makes the game controller and the constructor
public class GamesController : ControllerBase {

    private readonly ILogger<GamesController> _logger;

    private readonly GamesService _gamesService;

    private readonly IWebHostEnvironment _hosting;

    public GamesController(ILogger<GamesController> logger, GamesService gamesService, IWebHostEnvironment hosting) {
        _logger = logger;
        _gamesService = gamesService;
        _hosting = hosting;
    }

    //Gets all games
    [HttpGet]

    public ActionResult<List<Games>> Get() {
        return _gamesService.Get();
    }

    //Gets game by id
    [HttpGet("{Id:length(24)}")]

    public ActionResult<Games> GetGamesById(string Id) {
        var games = _gamesService.GetById(Id);
        if(games == null) {
            return NotFound();
        }
        return games;
    }

    //Gets game by title
    [HttpGet("title/{title}")]

    public ActionResult<Games> GetGamesByTitle(string Title) {
        var games = _gamesService.GetByTitle(Title);
        if(games == null) {
            return NotFound();
        }
        return games;
    }

    //Posts new game
    [HttpPost] 

    public IActionResult Post([FromBody] Games newGame) {
        
        _gamesService.Create(newGame);
        return CreatedAtAction(nameof(Post), new {id = newGame.Id}, newGame);
    } 

    //Posts the image
    [HttpPost("image")]
    
    public IActionResult SaveImage(IFormFile file){
        string rootPath = _hosting.WebRootPath;
        string imagePath = Path.Combine($"{rootPath}/images/{file.FileName}");
        using(var fileStream = new FileStream(imagePath, FileMode.Create))
        {
            file.CopyTo(fileStream);
        }
        return Ok();
    }

    //Updates the game by id
    [HttpPut("{Id}")]

    public IActionResult Update([FromRoute] string Id, [FromBody] Games updateGame) {
        var game = _gamesService.GetById(Id);
        if(game == null) {
            return NotFound();
        } 
        _gamesService.Update(Id, updateGame);
        return CreatedAtAction(nameof(Update), new {id = updateGame.Id}, updateGame);
    }

    //Deletes the game by id
    [HttpDelete("{Id}")]

    public IActionResult DeleteById(string Id) {
        var game = _gamesService.GetById(Id);
        if(game == null) {
            return NotFound();
        }
        _gamesService.Remove(Id);
        return Ok();
    }
}