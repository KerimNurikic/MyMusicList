using System.ComponentModel.DataAnnotations;

namespace MyMusic
{
    public class Song
    {
        public int Id { get; set; }
        
        [StringLength(50)]
        public string Title { get; set; } = string.Empty;

        [StringLength(50)]
        public string Artist { get; set; } = string.Empty;

        [StringLength(80)]
        public string URL { get; set; } = string.Empty;
        
        [Range(0,5,ErrorMessage = "Song must be rated from 1 to 5")]
        public int Rating { get; set; } = 0;

        public Boolean IsFavorite { get; set; }
        
        public DateTime DateAdded { get; set; }
        
        public DateTime? DateEdited { get; set; }
        public int GenreId { get; set; }

        public Genre? SongGenre { get; set; } 
    }
} 
