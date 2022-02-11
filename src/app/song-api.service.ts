import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SongApiService {
  readonly songApiUrl = 'https://localhost:7268/api';

  constructor(private http: HttpClient) {}

  //Songs

  getSongList(): Observable<any[]> {
    return this.http.get<any>(this.songApiUrl + '/songs');
  }

  addSong(data: any) {
    return this.http.post(this.songApiUrl + '/songs', data);
  }

  updateSong(id: number, data: any) {
    return this.http.put(this.songApiUrl + `/songs/${id}`, data);
  }

  deleteSong(id: number) {
    return this.http.delete(this.songApiUrl + `/songs/${id}`);
  }

  getSongsByTitle(title:string){
    return this.http.get<any>(this.songApiUrl+`/songs/${title}/filter`);
  }

  //Genres

  getGenresList(): Observable<any[]> {
    return this.http.get<any>(this.songApiUrl + '/genres');
  }

  addGenre(data: any) {
    return this.http.post(this.songApiUrl + '/genres', data);
  }

  updateGenre(id: number, data: any) {
    return this.http.put(this.songApiUrl + `/genres/${id}`, data);
  }

  deleteGenre(id: number) {
    return this.http.delete(this.songApiUrl + `/genres/${id}`);
  }
}
