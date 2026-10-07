import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie, { parseEspecie } from "../enum/EnumEspecie";
import PetRepositoy from "../repositories/petRepository";
import PetEntity from "../entities/PetEntity";

let listaDePets:Array<TipoPet> = []

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}



export default class PetController{
    constructor(private repository: PetRepositoy){
     
    }
    
    async criaPet(req: Request, res: Response){
        const {nome, adotado, especie, dataNascimento} = <PetEntity> req.body;
       

        const especieNormalizada = parseEspecie(especie)

        if(!especieNormalizada){
            return res.status(400).json({error: "Especie inválida"})
        }


        const jaExiste = listaDePets.find((pet) => pet.id === Number(id))   
        if(jaExiste){
            return res.status(409).json({mensagem: "Id já cadastrado!"})
        }

        const novoPet = new PetEntity(nome,especie,dataNascimento,adotado);

        await this.repository.criaPet(novoPet)
        return res.status(201).json(novoPet)
    }


        async listaPets(req: Request, res: Response){
        const listaDePets = await this.repository.listaPet()
        return res.status(200).json(listaDePets)
    }


    async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
        Number(id),
        req.body as PetEntity
    );

    if (!success) {
        return res.status(404).json({ message });
    }
    return res.sendStatus(204);
    }

    async deletaPet(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
        return res.status(404).json({ message });
    }
    return res.sendStatus(204);
    }

}