import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { Transacao } from '../transacao.model';

@Component({
  selector: 'app-transacao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ToggleButtonModule,
    CardModule,
    TagModule,
    CurrencyPipe
  ],
  templateUrl: './transacao.html',
  styleUrl: './transacao.css'
})
export class TransacaoComponent implements OnInit {
  transacoes: Transacao[] = [];
  transacaoSelecionada: Transacao = { id: 0, descricao: '', valor: 0, concluida: false };
  displayDialog: boolean = false;
  
  ngOnInit(): void {
    this.transacoes = [
      { id: 1, descricao: 'Salário', valor: 3000, concluida: true },
      { id: 2, descricao: 'Aluguel', valor: -1200, concluida: false },
      { id: 3, descricao: 'Supermercado', valor: -350.50, concluida: true }
    ];
  }

  showNewTransactionDialog(): void {
    this.transacaoSelecionada = { id: 0, descricao: '', valor: 0, concluida: false };
    this.displayDialog = true;
  }

  editTransaction(transacao: Transacao): void {
    this.transacaoSelecionada = { ...transacao };
    this.displayDialog = true;
  }

  saveTransaction(): void {
    if (this.transacaoSelecionada.id === 0) {
      this.transacaoSelecionada.id = this.transacoes.length > 0 ? Math.max(...this.transacoes.map(t => t.id)) + 1 : 1;
      this.transacoes.push(this.transacaoSelecionada);
    } else {
      const index = this.transacoes.findIndex(t => t.id === this.transacaoSelecionada.id);
      if (index > -1) {
        this.transacoes[index] = this.transacaoSelecionada;
      }
    }
    this.displayDialog = false;
  }

  deleteTransaction(id: number): void {
    this.transacoes = this.transacoes.filter(t => t.id !== id);
  }
}
