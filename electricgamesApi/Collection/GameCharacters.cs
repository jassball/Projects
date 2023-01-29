using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace electricgamesApi.Collection;

//Makes getters and setters for the gamecharacter object
public class GameCharacters {

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id {get; set;}

    public string? Name {get; set;} 

    public string? Game {get; set;}

    public string? Image {get; set;} 
}