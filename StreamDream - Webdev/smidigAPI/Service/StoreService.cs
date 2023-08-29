using MongoDB.Driver;
using Microsoft.Extensions.Options;
using smidigAPI.Collection;
using smidigAPI.Models;

namespace smidigAPI.Service;

public class StoreService {
    private readonly IMongoCollection<StoreItem> _StoreItemCollection;

    public StoreService(IOptions<smidigDBsettings> smidigDBsettings) {
        var client = new MongoClient(smidigDBsettings.Value.ConnectionStr);
        var database = client.GetDatabase(smidigDBsettings.Value.DatabaseName);
        _StoreItemCollection = database.GetCollection<StoreItem>(smidigDBsettings.Value.DataCollectionStore);
    }

    public List<StoreItem> Get() {
        return _StoreItemCollection.Find(_=>true).ToList();
    }

    public StoreItem? GetById(string id) {
        return _StoreItemCollection.Find(storeItem=>storeItem.id==id).FirstOrDefault();
    }

    public void Create(StoreItem newStoreItem) {
        _StoreItemCollection.InsertOne(newStoreItem);
    }

    public void Update(string id, StoreItem updatedStoreItem) {
        _StoreItemCollection.ReplaceOne(StoreItem=>StoreItem.id==id, updatedStoreItem);
    }

    public void Remove(string id) {
        _StoreItemCollection.DeleteOne(StoreItem=>StoreItem.id==id);
    }
}