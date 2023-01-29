using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace electricgamesApi.Collection;

//Makes getters and setters for the game object
public class Games {

    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id {get; set;} 

    public string? Title {get; set;}

    public string? Platform {get; set;}

    public string? ReleaseYear {get; set;}

    public string? Image {get; set;}
}