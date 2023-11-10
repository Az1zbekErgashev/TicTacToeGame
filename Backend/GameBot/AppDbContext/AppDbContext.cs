using GameBot.Enitiy;
using Microsoft.EntityFrameworkCore;

namespace GameBot.AppDbContext
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<GameBoard> Games { get; set; }

    }
}
