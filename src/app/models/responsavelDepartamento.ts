import { Departamento } from "./departamento";
import { Funcionario } from "./funcionario";

export class ResponsavelDepartamento {
    id?:         any;
    funcionario: Funcionario;
    departamento: Departamento;
    dataInicioResponsabilidade: Date;
    dataFimResponsabilidade: Date;
  }