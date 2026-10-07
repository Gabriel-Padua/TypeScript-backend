import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entities/EnderecoEntity";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  constructor(private repository: Repository<AdotanteEntity>) {}
  async atualizaAdotante(
    id: number,
    newData: AdotanteEntity,
  ): Promise<{ sucess: boolean; message?: string }> {
    try {
      const adotanteToUpdate = await this.repository.findOne({ where: { id } });

      if (!adotanteToUpdate) {
        return { sucess: false, message: "Adotante Não encontrado" };
      }
      Object.assign(adotanteToUpdate, newData);

      await this.repository.save(adotanteToUpdate);

      return { sucess: true };
    } catch (error) {
      console.log(error);
      return {
        sucess: false,
        message: "Ocorreu um erro ao tentar atualizar o adotante",
      };
    }
  }

  async listaAdotantes(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }

  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    await this.repository.save(adotante);
  }

  async deletaAdotante(
    id: number,
  ): Promise<{ sucess: boolean; message?: string }> {
    try {
      const adotanteToRemove = await this.repository.findOne({ where: { id } });

      if (!adotanteToRemove) {
        return { sucess: false, message: "Adotante não encontrado" };
      }

      await this.repository.remove(adotanteToRemove);
      return { sucess: true };
    } catch (error) {
      return {
        sucess: false,
        message: "Ocorreu um erro ao tentar excluir o adotante.",
      };
    }
  }

  async atualizaEnderecoAdotante(
    idAdotante: number,
    endereco: EnderecoEntity,
  ): Promise<{ sucess: boolean; message?: string }> {
    try {
      const adotante = await this.repository.findOne({
        where: { id: idAdotante },
      });

      if (!adotante) {
        return {
          sucess: false,
          message: "adotante não encotrado",
        };
      }

      const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
      adotante.endereco = novoEndereco;

      await this.repository.save(adotante);
      return { sucess: true };
    } catch (error) {
      return {
        sucess: false,
        message: "Ocorreu um erro ao tentar excluir o adotante.",
      };
    }
  }
}
