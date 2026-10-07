// InterfaceAdotanteRepository.ts
import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

export default interface InterfaceAdotanteRepository {
  criaAdotante(adotante: AdotanteEntity): void | Promise<void>;
  listaAdotantes(): AdotanteEntity[] | Promise<AdotanteEntity[]>;

  atualizaAdotante(
    id: number,
    adotante: AdotanteEntity,
  ): Promise<{ sucess: boolean; message?: string }> | void;

  deletaAdotante(
    id: number,
  ): Promise<{ sucess: boolean; message?: string }> | void;

  atualizaEnderecoAdotante(
    idAdotante: number,
    endereco: EnderecoEntity,
  ): Promise<{ sucess: boolean; message?: string }> | void;
}
