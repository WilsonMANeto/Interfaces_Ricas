import { Routes } from '@angular/router';
import { TransactionListComponent } from './features/transaction-list/transaction-list';
import { TransactionFormComponent } from './features/transaction-form/transaction-form';

export const routes: Routes = [
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },

  // LISTAGEM
  { path: 'transactions', component: TransactionListComponent },

  // INCLUSÃO
  { path: 'transactions/new', component: TransactionFormComponent },

  // DETALHE
  { path: 'transactions/:id', component: TransactionFormComponent },

  // ATUALIZAÇÃO
  { path: 'transactions/:id/edit', component: TransactionFormComponent },
];
