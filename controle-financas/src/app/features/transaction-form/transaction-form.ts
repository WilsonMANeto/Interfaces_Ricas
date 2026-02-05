import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transacao } from '../../models/transacao.model';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

      if (!id) {
        this.modo = 'novo';
        this.transacaoForm = this.criarTransacaoLimpa();
      } else {
        this.transacaoId = Number(id);

        if (this.router.url.endsWith('edit')) {
          this.modo = 'edicao';
        } else {
          this.modo = 'detalhe';
        }

        // Simulação de busca (dados em memória)
        this.carregarTransacao(this.transacaoId);
      }
    });
  }

  salvar() {
    console.log('Salvar transação:', this.transacaoForm);
    this.router.navigate(['/transactions']);
  }

  voltar() {
    this.router.navigate(['/transactions']);
  }

  private carregarTransacao(id: number) {
    this.transacaoForm = {
      descricao: 'Exemplo',
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
