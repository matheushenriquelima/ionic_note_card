import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { NoteCard } from 'src/app/models/note-card';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  notecard = new NoteCard();
  notecardList: NoteCard[] = [];
  habilitaForm = false;
  modoDark = false;
  ehEdicao = false;

  constructor(public toastController: ToastController) {
    this.initCardDefault();
  }

  initCardDefault() {
    this.notecardList = [
      {
        id: 1,
        titulo: 'Note 1',
        descricao: 'Iniciando note card 1'
      },
      {
        id: 2,
        titulo: 'Note 2',
        descricao: 'Iniciando note card 2'
      }
    ]
  }

  habilitarForm(): void {
    this.habilitaForm = true;
  }

  salvarNovoNoteCard(): void {
    if (this.ehEdicao) {
      this.notecardList[this.notecard.id - 1] = this.notecard;
      this.ehEdicao = false;
    } else {
      this.notecard.id = this.notecardList.length + 1;
      this.notecardList.push(this.notecard);
    }
    this.habilitaForm = false;
    this.presentToast();
    this.notecard = new NoteCard();
  }

  cancelar(): void {
    this.habilitaForm = false;
    this.notecard = new NoteCard();
  }

  editarNoteCard(noteCard: NoteCard): void {
    this.habilitarForm();
    this.notecard = noteCard;
    this.ehEdicao = true;
  }

  removerNoteCard(noteCard: NoteCard): void {
    this.notecardList = this.notecardList.filter(noteCardTemp => noteCardTemp.titulo !== noteCard.titulo);
  }

  mudarModo(): void {
    this.modoDark = !this.modoDark;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'NoteCard salvo com sucesso.',
      duration: 1500
    });
    toast.present();
  }

}
