import { Request, Response } from "express";
import AdotanteRepository from "../repositories/adotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";


export default class PetController{
    constructor(private repository: AdotanteRepository ){}

        async criaAdotante(req: Request, res: Response) {
          try {
            const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;
        
            const novoAdotante = new AdotanteEntity(
              nome,
              senha,
              celular,
              foto,
              endereco
            );
        
            await this.repository.criaAdotante(novoAdotante);
            return res.status(201).json(novoAdotante);
          } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar o adotante', message: error });
          }
        }



    }