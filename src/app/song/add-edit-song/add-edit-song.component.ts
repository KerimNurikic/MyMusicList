import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SongApiService } from 'src/app/song-api.service';

@Component({
  selector: 'app-add-edit-song',
  templateUrl: './add-edit-song.component.html',
  styleUrls: ['./add-edit-song.component.css'],
})
export class AddEditSongComponent implements OnInit {
  songList$!: Observable<any[]>;
  genresList$!: Observable<any[]>;

  constructor(private service: SongApiService) {}

  @Input() song: any;
  id: number = 0;
  title: string = '';
  artist: string = '';
  url: string = '';
  rating: string = '3';
  isFavorite: boolean = true;
  genreId!: number;
  dateAdded!: Date;

  ngOnInit(): void {
    this.id = this.song.id;
    this.title = this.song.title;
    this.artist = this.song.artist;
    this.url = this.song.url;
    this.rating = this.song.rating;
    if(this.song.isFavorite)
    {
      this.isFavorite = this.song.isFavorite;
    }
    else{
      this.isFavorite = false;
    }
    this.genreId = this.song.genreId;
    this.dateAdded = this.song.dateAdded;
    this.songList$ = this.service.getSongList();
    this.genresList$ = this.service.getGenresList();
    if(this.song.rating){
      document.getElementById('stars')!.innerHTML=this.song.rating;
    }
  }

  addSong(){
    var song = {
      title:this.title,
      artist:this.artist,
      url:this.url,
      rating:parseInt(this.rating),
      isFavorite:this.isFavorite,
      genreId:this.genreId,
      dateAdded: new Date(),
      dateEdited:null
    }
    this.service.addSong(song).subscribe(res =>{
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display="block";
      }
      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display="none";
        }
      },4000);
    });
  }

  updateSong(){
    var song = {
      id:this.id,
      title:this.title,
      artist:this.artist,
      url:this.url,
      rating:parseInt(this.rating),
      isFavorite:this.isFavorite,
      genreId:this.genreId,
      dateAdded: this.dateAdded,
      dateEdited: new Date()
    }
    var id:number=this.id;
    this.service.updateSong(id,song).subscribe(res =>{
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess){
        showUpdateSuccess.style.display="block";
      }
      setTimeout(function(){
        if(showUpdateSuccess){
          showUpdateSuccess.style.display="none";
        }
      },4000);
    });
  }
}
