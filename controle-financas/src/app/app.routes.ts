import { Routes } from '@angular/router';
import { TransactionCrudComponent } from './features/transaction-crud/transaction-crud';
import { TransactionFormComponent } from './features/transaction-form/transaction-form';

export const routes: Routes = [
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },

  // LISTAGEM
  { path: 'transactions', component: TransactionCrudComponent },

  // INCLUSÃO 
  { path: 'transactions/new', component: TransactionFormComponent },

  // EDIÇÃO
  { path: 'transactions/:id/edit', component: TransactionFormComponent },

  // DETALHE 
  { path: 'transactions/:id', component: TransactionFormComponent },
];
