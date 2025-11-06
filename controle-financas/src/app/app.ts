import { Component, signal } from '@angular/core';
import { TransactionCrudComponent } from './features/transaction-crud/transaction-crud';
import { HeaderComponent } from './layout/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    TransactionCrudComponent 
  ],
  templateUrl: './app.html', 
  styleUrl: './app.css'
})
export class App { 
  protected readonly title = signal('contole-financas');
}