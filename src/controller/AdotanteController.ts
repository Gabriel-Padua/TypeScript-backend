import { Request, Response } from "express";
import AdotanteRepository from "../repositories/adotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";

export default class PetController {
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(req: Request, res: Response) {
    try {
      const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;

      const novoAdotante = new AdotanteEntity(
        nome,
        senha,
        celular,
        foto,
        endereco,
      );

      await this.repository.criaAdotante(novoAdotante);
      return res.status(201).json(novoAdotante);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao criar o adotante", message: error });
    }
  }

  async listaAdotantes(req: Request, res: Response) {
    const listaDeAdotantes = await this.repository.listaAdotantes();
    return res.json(listaDeAdotantes);
  }

  async atualizaAdotane(req: Request, res: Response) {
    const { id } = req.params;
    const { sucess, message } = await this.repository.atualizaAdotante(
      Number(id),
      req.body as AdotanteEntity,
    );

    if (!sucess) {
      return res.send(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async deletaAdotante(req: Request, res: Response) {
    const { id } = req.params;

    const { sucess, message } = await this.repository.deletaAdotante(
      Number(id),
    );

    if (!sucess) {
      return res.status(404).json({ message });
    }

    return res.sendStatus(204);
  }

  async atualizaEnderecoAdotante(req: Request, res: Response) {
    const { id } = req.params;

    const { sucess, message } = await this.repository.atualizaEnderecoAdotante(
      Number(id),
      req.body as EnderecoEntity,
    );

    if (!sucess) {
      return res.status(404).json({ message });
    }

    return res.sendStatus(204);
  }
}
