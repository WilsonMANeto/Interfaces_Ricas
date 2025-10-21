export interface Transacao {
  id?: string; // O ID pode ser opcional ao criar
  descricao: string;  // Atributo String
  valor: number;      // Atributo Número
  ehReceita: boolean; // Atributo Booleano (true = Receita, false = Despesa)
}