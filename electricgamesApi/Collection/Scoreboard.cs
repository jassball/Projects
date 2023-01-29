using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace electricgamesApi.Collection;

//Makes getters and setters for the scoreboard object
public class Scoreboard {

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)] 

    public string? Id {get; set;}

    public string? Name {get; set;}

    public string? Score {get; set;}
    
}
