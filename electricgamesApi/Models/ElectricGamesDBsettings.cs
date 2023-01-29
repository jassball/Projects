namespace electricgamesApi.Models;
public class ElectricGamesDBsettings {
    public string ConnectionStr { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string DataCollectionGames {get; set;} = null!;

    public string DataCollectionGameCharacters {get; set;} = null!;

    public string DataCollectionQuiz {get; set;} = null!;

    public string DataCollectionScoreboard {get; set;} = null!;
}