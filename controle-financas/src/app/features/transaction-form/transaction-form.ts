import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';

import { Transacao } from '../../models/transacao.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule
  ],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css'
})
export class TransactionFormComponent {

  transacaoId?: number;
  modo: 'novo' | 'detalhe' | 'edicao' = 'novo';

  transacaoForm: Transacao = this.criarTransacaoLimpa();

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      // ======================
      // NOVA TRANSAÇÃO
      // ======================
      if (!id || id === 'new') {
        this.modo = 'novo';
        this.transacaoForm = this.criarTransacaoLimpa();
        return;
      }

      // ======================
      // DETALHE / EDIÇÃO
      // ======================
      this.transacaoId = Number(id);

      if (this.router.url.endsWith('edit')) {
        this.modo = 'edicao';
      } else {
        this.modo = 'detalhe';
      }

      // Simulação de busca (dados em memória)
      this.carregarTransacao(this.transacaoId);
    });
  }

  // ======================
  // AÇÕES
  // ======================

  salvar(): void {
    console.log('Salvar transação:', this.transacaoForm);

    // Aqui futuramente entra o service
    this.router.navigate(['/transactions']);
  }

  voltar(): void {
    this.router.navigate(['/transactions']);
  }

  // ======================
  // MÉTODOS AUXILIARES
  // ======================

  private carregarTransacao(id: number): void {
    // Simulação de dados vindos de serviço
    this.transacaoForm = {
      id,
      descricao: 'Exemplo carregado',
      valor: 100,
      ehReceita: true
    };
  }

  private criarTransacaoLimpa(): Transacao {
    return {
      descricao: '',
      valor: 0,
      ehReceita: false
    };
  }
}
