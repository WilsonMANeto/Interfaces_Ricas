import { Component } from '@angular/core';
import { Transacao } from '../../models/transacao.model';

// Imports dos Serviços do PrimeNG
import { ConfirmationService, MessageService } from 'primeng/api';

// Imports dos COMPONENTES FILHOS
import { TransactionFormComponent } from '../transaction-form/transaction-form';
import { TransactionListComponent } from '../transaction-list/transaction-list';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-transaction-crud',
  standalone: true,
  imports: [
    TransactionListComponent,
    TransactionFormComponent,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService], // Serviços ainda são providos aqui
  templateUrl: './transaction-crud.html',
  styleUrl: './transaction-crud.css'
})
export class TransactionCrudComponent {

  transacoes: Transacao[] = []; 
  transacaoSelecionada: Transacao | null = null;
  exibirModal: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    // Carregando os dados mocados (conforme solicitado)
    this.transacoes = [
      { id: 1, descricao: 'Salário', valor: 5000, ehReceita: true },
      { id: 2, descricao: 'Aluguel', valor: -1500, ehReceita: false },
      { id: 3, descricao: 'Supermercado', valor: -450.50, ehReceita: false }
    ];
  }


  // (Evento vindo do ListComponent)
  abrirModalNovo() {
    this.transacaoSelecionada = null; // Limpa para indicar "novo"
    this.exibirModal = true;
  }

  // (Evento vindo do ListComponent)
  abrirModalEditar(transacao: Transacao) {
    this.transacaoSelecionada = transacao; 
    this.exibirModal = true;
  }

  // (Evento vindo do ListComponent)
  confirmarExclusao(transacao: Transacao) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir "${transacao.descricao}"?`,
      accept: () => {
        this.transacoes = this.transacoes.filter(t => t.id !== transacao.id);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Transação excluída' });
      }
    });
  }

  // (Evento vindo do FormComponent)
  salvar(transacao: Transacao) {
    if (transacao.id) {
      // --- Lógica de ALTERAR ---
      const index = this.transacoes.findIndex(t => t.id === transacao.id);
      if (index !== -1) {
        this.transacoes[index] = transacao;
        this.messageService.add({ severity: 'info', summary: 'Sucesso', detail: 'Transação atualizada' });
      }
    } else {
      // --- Lógica de INCLUIR ---
      transacao.id = Date.now(); // Simula um ID
      this.transacoes = [...this.transacoes, transacao]; // Adiciona à lista (forma imutável)
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Transação criada' });
    }

    this.exibirModal = false; // Fecha o modal
  }
}