import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transacao } from '../../models/transacao.model';

import { DialogModule } from 'primeng/dialog';
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
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule
  ],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css'
})
export class TransactionFormComponent {
  // 1. DADOS QUE VÊM DO PAI:
  @Input() transacao: Transacao | null = null;
  @Input() visible: boolean = false;

  // 2. EVENTOS QUE VÃO PARA O PAI:
  @Output() onSave = new EventEmitter<Transacao>();
  @Output() visibleChange = new EventEmitter<boolean>(); // Para fechar o modal

  // 3. Estado interno para o formulário
  transacaoForm: Transacao = this.criarTransacaoLimpa();

  ngOnChanges() {
    if (this.transacao) {
      this.transacaoForm = { ...this.transacao }; // Copia os dados
    } else {
      this.transacaoForm = this.criarTransacaoLimpa(); // Limpa
    }
  }

  salvar() {
    this.onSave.emit(this.transacaoForm);
  }

  cancelar() {
    this.visibleChange.emit(false); // Emite evento para o pai fechar
  }

  private criarTransacaoLimpa(): Transacao {
    return {
      descricao: '',
      valor: 0,
      ehReceita: false
    };
  }
}