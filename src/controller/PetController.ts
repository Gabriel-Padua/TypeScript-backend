import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";

let listaDePets:Array<TipoPet> = []


export default class PetController{
    
    criaPet(req: Request, res: Response){
        const { id, nome, adotado, especie,idade} = <TipoPet> req.body;
        const novoPet:TipoPet = { id, nome, adotado, especie,idade};
        listaDePets.push(novoPet)
        return res.status(201).json(novoPet)
    }
}