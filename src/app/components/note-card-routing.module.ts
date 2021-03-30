import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormNoteCardComponent } from './form-note-card/form-note-card.component';
import { NoteCardComponent } from './note-card/note-card.component';

const routes: Routes = [
  {path: '', component: NoteCardComponent},
  {path:'cadastrar', component: FormNoteCardComponent},
  {path:'editar/:id', component: FormNoteCardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteCardRoutingModule { }
