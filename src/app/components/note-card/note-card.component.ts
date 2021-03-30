import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NoteCard } from 'src/app/models/note-card';
import { NoteCardService } from 'src/app/services/note-card.service';
import { MensagensUtil } from 'src/app/util/mensagens.util';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {

  notecardList: NoteCard[] = [];
  notecard = new NoteCard();

  constructor(
    private router: Router,
    private noteCardService: NoteCardService,
    private toastController: ToastController,
    private alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.carregarAplicacao();
  }

  async carregarAplicacao() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde...',
      duration: 1500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.listarNoteCards();
  }

  listarNoteCards() {
    this.noteCardService.listar().subscribe(res => {
      this.notecardList = res;
    })
  }

  novoNoteCard() {
    this.router.navigate([`/cadastrar`]);
  }

  ativarRotaEditarNoteCard(id: string) {
    this.router.navigate([`/editar/`, id]);
  }

  async confirmarRemocao(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirme!',
      message: 'Realmente deseja deletar este NoteCard?',
      buttons: [
        {
          text: 'Não',
          cssClass: 'secondary',
          handler: (blah) => {
            this.listarNoteCards();
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.removerNoteCard(id);
          }
        }
      ]
    });

    await alert.present();
  }

  removerNoteCard(id: string) {
    this.noteCardService.remover(id).subscribe(() => {
      this.carregarAplicacao();
      this.apresentarMensagemAlerta(MensagensUtil.NOTECARD_DELETADO);
    },
      error => {
        this.apresentarMensagemAlerta(MensagensUtil.NOTECARD_DELETADO_ERRO);
      });
  }

  async apresentarMensagemAlerta(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500
    });
    toast.present();
  }

}
