import { Routes } from '@angular/router';
import { TransacaoCrudComponent } from './pages/transacao-crud/transacao-crud.component';

export const routes: Routes = [
  { path: '', component: TransacaoCrudComponent }, // Rota principal
  { path: '**', redirectTo: '' } // Redireciona qualquer outra coisa
];