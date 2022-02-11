using Microsoft.EntityFrameworkCore;

namespace MyMusic.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Song> Songs { get; set; }

        public DbSet<Genre> Genres { get; set; }    
    }
}
