import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionCrudComponent } from './features/transaction-crud/transaction-crud';
import { HeaderComponent } from './layout/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    TransactionCrudComponent 
  ],
  templateUrl: './app.html', 
  styleUrl: './app.css'
})
export class App { 
  protected readonly title = signal('contole-financas');
}