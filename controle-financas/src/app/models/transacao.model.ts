export interface Transacao {
  id?: number;
  descricao: string;
  valor: number;
  ehReceita: boolean;
}