import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transacao } from '../../models/transacao.model';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common'; // Para pipes e ngClass

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css'
})
export class TransactionListComponent {
  @Input() transacoes: Transacao[] = [];

  @Output() onNew = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<Transacao>();
  @Output() onDelete = new EventEmitter<Transacao>();

  novaTransacao() {
    this.onNew.emit();
  }

  editarTransacao(transacao: Transacao) {
    this.onEdit.emit(transacao);
  }

  excluirTransacao(transacao: Transacao) {
    this.onDelete.emit(transacao);
  }
}