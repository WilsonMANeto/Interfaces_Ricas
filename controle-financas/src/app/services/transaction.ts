import { Injectable } from '@angular/core';
import { Transacao } from '../models/transacao.model'; 

@Injectable({
  providedIn: 'root' 
})
export class TransactionService {
  
  private readonly STORAGE_KEY = 'minhas-transacoes';
  
  // Nossos dados em memória
  private transacoes: Transacao[] = [];

  constructor() {
    // Ao iniciar o serviço, tentamos carregar do localStorage
    // Se não tiver nada, carregamos os dados mocados iniciais
    this.carregarDoStorage();
    
    if (this.transacoes.length === 0) {
      this.transacoes = [
        { id: 1, descricao: 'Salário', valor: 5000, ehReceita: true },
        { id: 2, descricao: 'Aluguel', valor: -1500, ehReceita: false },
        { id: 3, descricao: 'Supermercado', valor: -450.50, ehReceita: false }
      ];
    }
  }

  // --- CRUD (Create, Read, Update, Delete) ---

  // Listar
  listar(): Transacao[] {
    // Retornamos uma cópia do array para evitar mutação direta externa
    return [...this.transacoes];
  }

  // Inserir
  adicionar(transacao: Transacao): void {
    transacao.id = Date.now();
    this.transacoes.push(transacao);
    this.salvarNoStorage();
  }

  // Atualizar
  atualizar(transacao: Transacao): void {
    const index = this.transacoes.findIndex(t => t.id === transacao.id);
    if (index !== -1) {
      this.transacoes[index] = transacao;
      this.salvarNoStorage();
    }
  }

  // Remover
  remover(id: number): void {
    this.transacoes = this.transacoes.filter(t => t.id !== id);
    this.salvarNoStorage();
  }

  // --- Persistência (LocalStorage) ---
  
  private salvarNoStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.transacoes));
  }

  private carregarDoStorage(): void {
    const dadosString = localStorage.getItem(this.STORAGE_KEY);
    if (dadosString) {
      this.transacoes = JSON.parse(dadosString);
    }
  }
}