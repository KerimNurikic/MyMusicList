using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace MyMusic
{
    [Index(nameof(Genre.Name), IsUnique = true)]
    public class Genre
    {
        public int Id { get; set; }
        
        [StringLength(20)]
        
        public string Name { get; set; } = String.Empty;
    }
}
