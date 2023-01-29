using electricgamesApi.Models;
using electricgamesApi.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<ElectricGamesDBsettings>(
    builder.Configuration.GetSection("ElectricGamesDBsettings")
);
builder.Services.AddSingleton<GamesService>();
builder.Services.AddSingleton<GameCharactersService>();
builder.Services.AddSingleton<QuizService>();
builder.Services.AddSingleton<ScoreboardService>();

builder.Services.AddCors(options => {
        options.AddPolicy("AllowAnyOrigin",
            policies => policies
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
        );
    }
);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

DefaultFilesOptions options = new DefaultFilesOptions();
options.DefaultFileNames.Add("root.html");
app.UseDefaultFiles(options);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors("AllowAnyOrigin");

app.Run();


