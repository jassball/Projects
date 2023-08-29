using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace smidigAPI.Collection;

public class StoreItem {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? id {get; set;}
    public string? title {get; set;}
    public string? type {get; set;}
    public string? shortDesc {get; set;}
    public string? longDesc {get; set;}
    public double? price {get; set;}
    public string? rating {get; set;}
    public string? image {get; set;}
}