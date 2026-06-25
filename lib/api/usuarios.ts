"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { extraerRol } from "../utils";

export interface UsuarioResumen {
  id: string;
  nombre: string;
  email: string;
  rol: RolUsuario;
  estado: "Activo" | "Bloqueado";
  fechaRegistro: string;
}

export type RolUsuario = "Comprador" | "Vendedor" | "Admin" | "Soporte";

export interface UsuarioDetalle extends UsuarioResumen {
  buyerInfo: {
    comprasTotales: number;
    gastadoTotal: number;
    direcciones: number;
  };
  sellerInfo?: {
    productosActivos: number;
    ventasTotales: number;
    ingresos: number;
  };
  feedbackInfo: { calificacion: number; reportesRecibidos: number };
}

export async function obtenerUsuarios(): Promise<UsuarioResumen[]> {
  const usarApiReal = process.env.USE_REAL_API === "true";

  if (usarApiReal) {
    try {
      const client = await clerkClient();
      const response = await client.users.getUserList();

      const usuariosMapeados: UsuarioResumen[] = response.data.map((user) => {
        const emailPrincipal =
          user.emailAddresses[0]?.emailAddress || "Sin email";

        const nombreCompleto =
          `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
          "Usuario Sin Nombre";

        const estado = user.banned ? "Bloqueado" : "Activo";

        const rol = extraerRol(emailPrincipal);

        return {
          id: user.id,
          nombre: nombreCompleto,
          email: emailPrincipal,
          rol: rol,
          estado: estado,
          fechaRegistro: new Date(user.createdAt).toISOString(),
        };
      });

      return usuariosMapeados;
    } catch (error) {
      console.error("Fallo al traer usuarios de Clerk, usando mocks:", error);
      return obtenerUsuariosMock();
    }
  }

  return obtenerUsuariosMock();
}

export async function obtenerDetalleUsuario(
  id: string,
): Promise<UsuarioDetalle | null> {
  const usarApiReal = process.env.USE_REAL_API === "true";

  if (usarApiReal) {
    try {
      throw new Error("API Real no configurada");
    } catch (error) {
      console.warn("Fallo real, usando mock de detalle:", error);
      return obtenerDetalleUsuarioMock(id);
    }
  }
  return obtenerDetalleUsuarioMock(id);
}

async function obtenerUsuariosMock(): Promise<UsuarioResumen[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return [
    {
      id: "user_2X9aB1",
      nombre: "Nicolás Comprador",
      email: "nico@ejemplo.com",
      rol: "Comprador",
      estado: "Activo",
      fechaRegistro: "2026-01-15",
    },
    {
      id: "user_3Y8cC2",
      nombre: "Aromas VIP",
      email: "ventas@aromasvip.com",
      rol: "Vendedor",
      estado: "Activo",
      fechaRegistro: "2026-02-10",
    },
    {
      id: "user_4Z7dD3",
      nombre: "Usuario Bloqueado",
      email: "scammer@ejemplo.com",
      rol: "Vendedor",
      estado: "Bloqueado",
      fechaRegistro: "2026-03-01",
    },
    {
      id: "user_5W6eE4",
      nombre: "Martina Tester",
      email: "martina@ejemplo.com",
      rol: "Comprador",
      estado: "Activo",
      fechaRegistro: "2026-06-20",
    },
  ];
}

// TODO: Cambiar luego
async function obtenerDetalleUsuarioMock(id: string): Promise<UsuarioDetalle> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const esVendedor = id.endsWith("2");

  return {
    id,
    nombre: esVendedor ? "Aromas VIP" : "Usuario Estándar",
    email: esVendedor ? "ventas@aromasvip.com" : "usuario@ejemplo.com",
    rol: esVendedor ? "Vendedor" : "Comprador",
    estado: id.endsWith("3") ? "Bloqueado" : "Activo",
    fechaRegistro: "2026-01-15",
    buyerInfo: { comprasTotales: 14, gastadoTotal: 350000, direcciones: 2 },
    sellerInfo: esVendedor
      ? { productosActivos: 45, ventasTotales: 128, ingresos: 4500000 }
      : undefined,
    feedbackInfo: {
      calificacion: esVendedor ? 4.8 : 5.0,
      reportesRecibidos: id.endsWith("3") ? 12 : 0,
    },
  };
}

export async function banearUsuario(userId: string) {
  try {
    const client = await clerkClient();
    await client.users.banUser(userId);

    revalidatePath(`/usuarios/${userId}`);
    revalidatePath("/usuarios");
  } catch (error) {
    console.error("Error al banear usuario en Clerk:", error);
  }
}

export async function desbanearUsuario(userId: string) {
  try {
    const client = await clerkClient();
    await client.users.unbanUser(userId);

    revalidatePath(`/usuarios/${userId}`);
    revalidatePath("/usuarios");
  } catch (error) {
    console.error("Error al desbanear usuario en Clerk:", error);
  }
}
