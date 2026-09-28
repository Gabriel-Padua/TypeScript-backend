enum EnumEspecie{
    CACHORRO="cachorro",
    GATO="gato",
}


export function parseEspecie(valor:String): EnumEspecie | undefined {
    const normalizado = valor.trim().toLowerCase();
    return Object.values(EnumEspecie).find((e) => e === normalizado)
}

export default EnumEspecie