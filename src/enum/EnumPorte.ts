enum EnumPorte {
  pequeno = "pequeno",
  medio = "medio",
  grande = "grande",
}

export function parsePorte(valor: String): EnumPorte | undefined {
  const normalizado = valor.trim().toLowerCase();
  return Object.values(EnumPorte).find((e) => e === normalizado);
}

export default EnumPorte;
