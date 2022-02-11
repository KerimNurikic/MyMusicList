import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SongApiService } from 'src/app/song-api.service';

@Component({
  selector: 'app-show-song',
  templateUrl: './show-song.component.html',
  styleUrls: ['./show-song.component.css'],
})
export class ShowSongComponent implements OnInit {
  songList$!: Observable<any[]>;
  genresList$!: Observable<any[]>;
  genresList: any = [];

  genresMap: Map<number, string> = new Map();

  constructor(private service: SongApiService) {}

  ngOnInit(): void {
    this.songList$ = this.service.getSongList();
    this.refreshGenresMap();
  }

  searchFilter:string='';
  searchActive:boolean = false;

  searchSongs() {
    this.searchActive = true;
    this.songList$ = this.service.getSongsByTitle(this.searchFilter);
  }

  cancelSearch(){
    this.searchActive = false;
    this.searchFilter="";
    this.songList$ = this.service.getSongList();
  }

  //Variables
  modalTitle: string = '';
  activateAddEditSongComponent: boolean = false;
  song: any;

  modalAdd() {
    this.song = {
      id: 0,
      title: null,
      artist: null,
      url: null,
      rating: 3,
      isFavorite: null,
      dateAdded: null,
      dateEdited: null,
      genreId: null,
    };
    this.modalTitle = 'Add Song';
    this.activateAddEditSongComponent = true;
  }

  modalEdit(item:any){
    this.song=item;
    this.modalTitle = 'Edit Song';
    this.activateAddEditSongComponent = true;
  }

  delete(item:any){
    if(confirm(`Are you sure you want to delete "${item.title}" by ${item.artist}?`)){
      this.service.deleteSong(item.id).subscribe(res=>{
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess){
        showDeleteSuccess.style.display="block";
      }
      setTimeout(function(){
        if(showDeleteSuccess){
          showDeleteSuccess.style.display="none";
        }
      },4000);
      this.songList$=this.service.getSongList();
      })
    }
  }

  modalClose() {
    this.activateAddEditSongComponent = false;
    if(!this.searchActive){
      this.songList$ = this.service.getSongList();
    } 
    else {
      this.songList$ = this.service.getSongsByTitle(this.searchFilter);
    }
  }

  refreshGenresMap() {
    this.service.getGenresList().subscribe((data) => {
      this.genresList = data;

      for (let i = 0; i < data.length; i++) {
        this.genresMap.set(this.genresList[i].id, this.genresList[i].name);
      }
    });
  }
}
