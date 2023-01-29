using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using electricgamesApi.Service;
using electricgamesApi.Collection;

namespace electricgamesApi.Controllers;

[ApiController]
[Route("quiz/[controller]")]

//Makes the quiz controller and the constructor
public class QuizController : ControllerBase {

    private readonly ILogger<QuizController> _logger;

    private readonly QuizService _quizService;

    private readonly IWebHostEnvironment _hosting;

    public QuizController(ILogger<QuizController> logger, QuizService quizService, IWebHostEnvironment hosting) {
        _logger = logger;
        _quizService = quizService;
        _hosting = hosting;
    }

    //Gets quiz question by id
    [HttpGet("{Id:length(24)}")]

    public ActionResult<Quiz> GetQuizById(string Id) {
        var quiz = _quizService.GetById(Id);
        if(quiz == null) {
            return NotFound();
        }
        return quiz;
    }

    //Posts a new question
    [HttpPost] 

    public IActionResult Post([FromBody] Quiz newQuestion) {
        
        _quizService.Create(newQuestion);
        return CreatedAtAction(nameof(Post), new {id = newQuestion.Id}, newQuestion);
    } 
    
    //Deletes question by id
    [HttpDelete("{Id}")]

    public IActionResult DeleteById(string Id) {
        var quiz = _quizService.GetById(Id);
        if(quiz == null) {
            return NotFound();
        }
        _quizService.Remove(Id);
        return Ok();
    }
}