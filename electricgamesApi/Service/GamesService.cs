using System.Threading.Tasks.Dataflow;
using Microsoft.Extensions.Options;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using electricgamesApi.Collection;
using electricgamesApi.Models;

namespace electricgamesApi.Service;

//functions to get and post values to the database
public class GamesService {
    
    private readonly IMongoCollection<Games> _GamesCollection;

    public GamesService(IOptions<ElectricGamesDBsettings> ElectricGamesDBsettings){
        
        var GameClient = new MongoClient(ElectricGamesDBsettings.Value.ConnectionStr);
        var database = GameClient.GetDatabase(ElectricGamesDBsettings.Value.DatabaseName);
        _GamesCollection = database.GetCollection<Games>(ElectricGamesDBsettings.Value.DataCollectionGames);
    }

    public List<Games> Get() {
        return _GamesCollection.Find(_=>true).ToList();
    }
    public Games? GetById(string id) {
        return _GamesCollection.Find(Game=>Game.Id==id).FirstOrDefault();
    }
    public Games? GetByTitle(string title) {
        return _GamesCollection.Find(Game=>Game.Title==title).FirstOrDefault();
    }
    public void Create(Games newGame) {
        _GamesCollection.InsertOne(newGame);
    }

    public void Update(string id, Games updatedGames) {
        _GamesCollection.ReplaceOne(Game=>Game.Id==id, updatedGames);
    }

    public void Remove(string id) {
        _GamesCollection.DeleteOne(Game=>Game.Id==id);
    }
}
    