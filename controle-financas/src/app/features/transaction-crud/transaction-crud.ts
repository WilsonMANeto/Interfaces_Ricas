import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transacao } from '../../models/transacao.model';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { TransactionListComponent } from '../transaction-list/transaction-list';

@Component({
  selector: 'app-transaction-crud',
  standalone: true,
  imports: [
    TransactionListComponent,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './transaction-crud.html',
  styleUrl: './transaction-crud.css'
})
export class TransactionCrudComponent {

  transacoes: Transacao[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.transacoes = [
      { id: 1, descricao: 'Salário', valor: 5000, ehReceita: true },
      { id: 2, descricao: 'Aluguel', valor: 1500, ehReceita: false },
      { id: 3, descricao: 'Supermercado', valor: 450.50, ehReceita: false }
    ];
  }

  // ===============================
  // EVENTOS VINDOS DO LIST COMPONENT
  // ===============================

  // ➕ Inclusão
  novaTransacao(): void {
    this.router.navigate(['/transactions/new']);
  }

  // ✏️ Edição
  editarTransacao(transacao: Transacao): void {
    if (!transacao?.id) return;
    this.router.navigate(['/transactions', transacao.id, 'edit']);
  }

  // 🗑️ Exclusão
  confirmarExclusao(transacao: Transacao): void {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir "${transacao.descricao}"?`,
      accept: () => {
        this.transacoes = this.transacoes.filter(t => t.id !== transacao.id);

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Transação excluída'
        });
      }
    });
  }
}
