import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { NoteCard } from 'src/app/models/note-card';
import { NoteCardService } from 'src/app/services/note-card.service';
import { MensagensUtil } from 'src/app/util/mensagens.util';

@Component({
  selector: 'app-form-note-card',
  templateUrl: './form-note-card.component.html',
  styleUrls: ['./form-note-card.component.scss'],
})
export class FormNoteCardComponent implements OnInit {

  notecard = new NoteCard();

  constructor(
    private toastController: ToastController,
    private noteCardService: NoteCardService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.verificarNoteCardRota();
  }

  private verificarNoteCardRota(): void {
    this.activateRoute.params.subscribe((params: Params) => {
      const id = params.id;
      if (id) {
        this.noteCardService.buscarPorId(id).subscribe(res => {
          this.notecard = res;
        })
      }
    })
  }

  private ativarRotaListarNoteCard(): any {
    return this.router.navigate(['']);
  }

  cancelar() {
    this.ativarRotaListarNoteCard();
  }

  salvarNovoNoteCard() {
    if (this.notecard.titulo && this.notecard.descricao) {
      return this.obterRequisicao().subscribe(() => {
        this.apresentarMensagemAlerta(MensagensUtil.NOTECARD_SALVO);
        this.ativarRotaListarNoteCard();
      })
    }
    return this.apresentarMensagemAlerta(MensagensUtil.NOTECARD_SALVO_ERRO);


  }

  private obterRequisicao() {
    if (this.notecard._id) {
      this.noteCardService.atualizar(this.notecard);
    }
    return this.noteCardService.salvar(this.notecard);
  }

  async apresentarMensagemAlerta(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500
    });
    toast.present();
  }
}
