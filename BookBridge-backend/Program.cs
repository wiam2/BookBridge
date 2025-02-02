using Microsoft.EntityFrameworkCore;
using System;

using BookBridge_backend.Models;
using BookBridge_backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<AccountService>();
builder.Services.AddScoped<LecteurService>();
builder.Services.AddScoped<BiblioService>();
builder.Services.AddScoped<LivreService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddIdentity<User, IdentityRole>()
    .AddEntityFrameworkStores<LibraryContext>()
    .AddDefaultTokenProviders();
builder.Services.AddDbContext<LibraryContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection") ??
        throw new InvalidOperationException("Connection string is not found"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(policy =>
    {
        policy.WithOrigins("http://localhost:5289", "https://localhost:44346", "http://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .WithHeaders(HeaderNames.ContentType);
    });
}


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
