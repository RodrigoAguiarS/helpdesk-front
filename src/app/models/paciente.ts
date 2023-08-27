import { Atendimento } from "./antendimento";
import { Endereco } from "./endereco";
import { Pessoa } from "./pessoa";


export class Paciente {
  id?: number;
  nomeMae: string;
  pessoa: Pessoa;
  endereco: Endereco;
  atendimentos: Atendimento[];
}
