import { Component } from '@angular/core';
import { Transacao } from '../../models/transacao.model'; // Nosso modelo

// Módulos do PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

// Módulos do Angular
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]
import { CommonModule } from '@angular/common'; // Para *ngIf e Pipes (como 'currency')

// Serviços do PrimeNG
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-transaction-crud',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    CardModule,
    ConfirmDialogModule,
    ToastModule
  ],
  // Precisamos "prover" os serviços que o PrimeNG usará
  providers: [ConfirmationService, MessageService],
  templateUrl: './transaction-crud.html',
  styleUrl: './transaction-crud.css'
})
export class TransactionCrudComponent {

  // --- Estados do Componente ---
  transacoes: Transacao[] = []; // Onde guardamos a lista
  transacaoSelecionada: Transacao = this.criarTransacaoLimpa(); // Objeto para o formulário
  exibirModal: boolean = false; // Controla o modal (dialog)

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    // Apenas para teste (vamos carregar dados mocados)
    this.transacoes = [
      { id: 1, descricao: 'Salário', valor: 5000, ehReceita: true },
      { id: 2, descricao: 'Aluguel', valor: -1500, ehReceita: false },
      { id: 3, descricao: 'Supermercado', valor: -450.50, ehReceita: false }
    ];
  }

  // --- Métodos de Ação ---

  // (Detalhar / Incluir)
  abrirModalNovo() {
    this.transacaoSelecionada = this.criarTransacaoLimpa();
    this.exibirModal = true;
  }

  // (Alterar)
  abrirModalEditar(transacao: Transacao) {
    // Usamos '...' (spread operator) para criar uma CÓPIA
    // Se não fizermos isso, a tabela é alterada enquanto digitamos no modal
    this.transacaoSelecionada = { ...transacao };
    this.exibirModal = true;
  }

  // (Remover)
  confirmarExclusao(transacao: Transacao) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir "${transacao.descricao}"?`,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        // Lógica de exclusão
        this.transacoes = this.transacoes.filter(t => t.id !== transacao.id);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Transação excluída' });
      }
    });
  }

  // (Salvar - Incluir ou Alterar)
  salvar() {
    if (this.transacaoSelecionada.id) {
      // --- Lógica de ALTERAR ---
      const index = this.transacoes.findIndex(t => t.id === this.transacaoSelecionada.id);
      if (index !== -1) {
        this.transacoes[index] = { ...this.transacaoSelecionada };
        this.messageService.add({ severity: 'info', summary: 'Sucesso', detail: 'Transação atualizada' });
      }
    } else {
      // --- Lógica de INCLUIR ---
      this.transacaoSelecionada.id = Date.now(); // Gambiarra para gerar um ID único
      this.transacoes.push({ ...this.transacaoSelecionada });
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Transação criada' });
    }

    this.exibirModal = false; // Fecha o modal
    this.transacaoSelecionada = this.criarTransacaoLimpa(); // Limpa o objeto do formulário
  }

  // --- Métodos Auxiliares ---
  private criarTransacaoLimpa(): Transacao {
    return {
      descricao: '',
      valor: 0,
      ehReceita: false // Padrão é ser uma despesa
    };
  }
}