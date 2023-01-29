using System.Threading.Tasks.Dataflow;
using Microsoft.Extensions.Options;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using electricgamesApi.Collection;
using electricgamesApi.Models;

namespace electricgamesApi.Service;

//functions to get and post values to the database
public class ScoreboardService {
    private readonly IMongoCollection<Scoreboard> _ScoreboardCollection;

    public ScoreboardService(IOptions<ElectricGamesDBsettings> ElectricGamesDBsettings){
        
        var ScoreClient = new MongoClient(ElectricGamesDBsettings.Value.ConnectionStr);
        var database = ScoreClient.GetDatabase(ElectricGamesDBsettings.Value.DatabaseName);
        _ScoreboardCollection = database.GetCollection<Scoreboard>(ElectricGamesDBsettings.Value.DataCollectionScoreboard);
    }

    public List<Scoreboard> Get() {
        return _ScoreboardCollection.Find(_=>true).ToList();
    }

    public Scoreboard? GetByName(string name) {
        return _ScoreboardCollection.Find(Score=>Score.Name==name).FirstOrDefault();
    }

    public void Create(Scoreboard newScore) {
        _ScoreboardCollection.InsertOne(newScore);
    }

    public void Remove(string name) {
        _ScoreboardCollection.DeleteOne(Score=>Score.Name==name);
    }
}