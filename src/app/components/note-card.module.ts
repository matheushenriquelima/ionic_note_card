import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteCardRoutingModule } from './note-card-routing.module';
import { NoteCardComponent } from './note-card/note-card.component';
import { NoteCardService } from 'src/app/services/note-card.service';
import { FormNoteCardComponent } from './form-note-card/form-note-card.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NoteCardComponent, FormNoteCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    NoteCardRoutingModule,
    IonicModule.forRoot(),
  ],
  exports: [NoteCardComponent, FormNoteCardComponent],
  providers: [NoteCardService]
})
export class NoteCardModule { }
