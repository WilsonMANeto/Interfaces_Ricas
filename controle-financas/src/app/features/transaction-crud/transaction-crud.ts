import { Component, OnInit } from '@angular/core'; 
import { Transacao } from '../../models/transacao.model';

// Serviços
import { ConfirmationService, MessageService } from 'primeng/api';
import { TransactionService } from '../../services/transaction';

// Componentes Filhos e Módulos
import { TransactionListComponent } from '../transaction-list/transaction-list';
import { TransactionFormComponent } from '../transaction-form/transaction-form';
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
  providers: [ConfirmationService, MessageService],
  templateUrl: './transaction-crud.html',
  styleUrl: './transaction-crud.css'
})
export class TransactionCrudComponent implements OnInit {

  transacoes: Transacao[] = [];
  transacaoSelecionada: Transacao | null = null;
  exibirModal: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private transactionService: TransactionService 
  ) {}

  ngOnInit() {
    this.atualizarLista();
  }

  // Função auxiliar para buscar os dados atualizados do serviço
  private atualizarLista() {
    this.transacoes = this.transactionService.listar();
  }

  // --- LÓGICA DE INTERFACE ---

  abrirModalNovo() {
    this.transacaoSelecionada = null;
    this.exibirModal = true;
  }

  abrirModalEditar(transacao: Transacao) {
    this.transacaoSelecionada = transacao;
    this.exibirModal = true;
  }

  confirmarExclusao(transacao: Transacao) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir "${transacao.descricao}"?`,
      accept: () => {
        // CHAMA O SERVIÇO PARA REMOVER
        if (transacao.id) {
           this.transactionService.remover(transacao.id);
           this.atualizarLista(); // Atualiza a tela
           this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Transação excluída' });
        }
      }
    });
  }

  salvar(transacao: Transacao) {
    if (transacao.id) {
      // CHAMA O SERVIÇO PARA ATUALIZAR
      this.transactionService.atualizar(transacao);
      this.messageService.add({ severity: 'info', summary: 'Sucesso', detail: 'Transação atualizada' });
    } else {
      // CHAMA O SERVIÇO PARA ADICIONAR
      this.transactionService.adicionar(transacao);
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Transação criada' });
    }

    this.exibirModal = false;
    this.atualizarLista(); // Atualiza a tela com os novos dados
  }
}