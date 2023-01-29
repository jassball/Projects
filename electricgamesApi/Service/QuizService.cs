using System.Threading.Tasks.Dataflow;
using Microsoft.Extensions.Options;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using electricgamesApi.Collection;
using electricgamesApi.Models;

namespace electricgamesApi.Service;

//functions to get and post values to the database
public class QuizService {
    private readonly IMongoCollection<Quiz> _QuizCollection;

    public QuizService(IOptions<ElectricGamesDBsettings> ElectricGamesDBsettings){
        
        var QuizClient = new MongoClient(ElectricGamesDBsettings.Value.ConnectionStr);
        var database = QuizClient.GetDatabase(ElectricGamesDBsettings.Value.DatabaseName);
        _QuizCollection = database.GetCollection<Quiz>(ElectricGamesDBsettings.Value.DataCollectionQuiz);
    }

    public Quiz? GetById(string id) {
        return _QuizCollection.Find(Quiz=>Quiz.Id==id).FirstOrDefault();
    }

    public void Create(Quiz newQuestion) {
        _QuizCollection.InsertOne(newQuestion);
    }

    public void Remove(string id) {
        _QuizCollection.DeleteOne(Quiz=>Quiz.Id==id);
    }
}