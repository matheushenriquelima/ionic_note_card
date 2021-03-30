import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { NoteCard } from '../models/note-card';

@Injectable({
  providedIn: 'root'
})
export class NoteCardService {

  resourceUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  buscarPorId(id: string): Observable<NoteCard> {
    return this.httpClient.get<NoteCard>(this.resourceUrl + id);
  }

  listar(): Observable<NoteCard[]> {
    return this.httpClient.get<NoteCard[]>(this.resourceUrl)
  }

  salvar(noteCard: NoteCard): Observable<any> {
    return this.httpClient.post(this.resourceUrl, noteCard);
  }

  atualizar(noteCard: NoteCard): Observable<any> {
    return this.httpClient.put(this.resourceUrl + noteCard._id, noteCard);
  }

  remover(id: string): Observable<any> {
    return this.httpClient.delete(this.resourceUrl + id);
  }

}
