import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RolUsuario } from "./api/usuarios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatearDinero(monto: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(monto);
}

export function extraerRol(email: string): RolUsuario {
  const match = email.match(/^([^+\s@]+)/);
  if (!match) return "Comprador";

  const textoExtraido = match[0].toLowerCase();

  const mapaSinonimos: Record<string, RolUsuario> = {
    buyer: "Comprador",
    user: "Comprador",
    usuario: "Comprador",
    comprador: "Comprador",
    seller: "Vendedor",
    vendedor: "Vendedor",
    admin: "Admin",
    moderador: "Admin",
    moderator: "Admin",
    soporte: "Soporte",
    support: "Soporte",
    ship: "Soporte",
  };

  return mapaSinonimos[textoExtraido] || "Comprador";
}
