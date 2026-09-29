import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie, { parseEspecie } from "../enum/EnumEspecie";

let listaDePets:Array<TipoPet> = []

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}



export default class PetController{
    
    criaPet(req: Request, res: Response){
        const {nome, adotado, especie, dataNascimento} = <TipoPet> req.body;
       

        const especieNormalizada = parseEspecie(especie)

        if(!especieNormalizada){
            return res.status(400).json({error: "Especie inválida"})
        }


        const jaExiste = listaDePets.find((pet) => pet.id === Number(id))   
        if(jaExiste){
            return res.status(409).json({mensagem: "Id já cadastrado!"})
        }

        const novoPet:TipoPet = { id:geraId(), nome, adotado, especie,dataNascimento};
        listaDePets.push(novoPet)
        return res.status(201).json(novoPet)
    }


    listaPets(req: Request, res: Response){
        return res.status(200).json(listaDePets)
    }


    atualizaPet(req: Request, res: Response){
        const { id } = req.params
        const { adotado, especie, dataNascimento, nome } = req.body as TipoPet;
        const pet = listaDePets.find((pet) => pet.id === Number(id))

        if(!pet) { 
            return res.status(404).json({erro: "Pet não encontrado "})
        }

        pet.nome = nome;
        pet.dataNascimento = dataNascimento;
        pet.especie = especie;
        pet.adotado= adotado;

        return res.status(200).json(pet)
    }

    deletaPet(req: Request, res: Response){
        const { id } = req.params;
        const pet = listaDePets.find((pet) => pet.id === Number(id));

        if(!pet) { 
            return res.status(404).json({erro: "Pet não encontrado "})
        }

        const index = listaDePets.indexOf(pet);

        listaDePets.splice(index, 1);


        return res.status(200).json({ mensagem: "Pet deletado com sucesso", pet});


    }

}