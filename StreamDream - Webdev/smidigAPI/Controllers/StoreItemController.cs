using smidigAPI.Collection;
using smidigAPI.Service;
using Microsoft.AspNetCore.Mvc;

namespace smidigAPI.Controllers;

[ApiController]
[Route("[Controller]")]

// StoreItemController lets us connect to the StoreService which in turn lets us connect to our database. 
public class StoreItemController : ControllerBase {
    private readonly ILogger<StoreItemController> _logger;
    private readonly StoreService _storeService;
    private readonly IWebHostEnvironment _hosting;

    public StoreItemController(ILogger<StoreItemController> logger, StoreService storeService, IWebHostEnvironment hosting) {
        _logger = logger;
        _storeService = storeService;
        _hosting = hosting;
    }

    [HttpGet]
    public ActionResult<List<StoreItem>> Get() {
        return _storeService.Get();
    }

    [HttpGet("{id:length(24)}")]
    public ActionResult<StoreItem> GetStoreItemById(string id) {
        var storeItem = _storeService.GetById(id);
        if (storeItem == null) {
            return NotFound();
        }
        return storeItem;
    }

    [HttpPost] 
    public IActionResult Post([FromBody] StoreItem newStoreItem) {
        _storeService.Create(newStoreItem);
        return CreatedAtAction(nameof(Post), new {id = newStoreItem.id}, newStoreItem);
    }

    [HttpPost("image")]
    public IActionResult SaveImage(IFormFile file) {
        string rootPath = _hosting.WebRootPath;
        string imagePath = Path.Combine($"{rootPath}/images/{file.FileName}");
        using(var fileStream = new FileStream(imagePath, FileMode.Create)) {
            file.CopyTo(fileStream); 
        }
        return Ok();
    }

    [HttpPut("{id}")]
    public IActionResult Update([FromRoute] string id, [FromBody] StoreItem updateStoreItem) {
        var storeItem = _storeService.GetById(id);
        if (storeItem == null) {
            return NotFound();
        }
        _storeService.Update(id, updateStoreItem);
        return CreatedAtAction(nameof(Update), new {id = updateStoreItem.id}, updateStoreItem);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteById(string id) {
        var storeItem = _storeService.GetById(id);
        if (storeItem == null) {
            return NotFound();
        }
        _storeService.Remove(id);
        return Ok();
    }
    
}