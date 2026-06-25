import { revalidatePath } from "next/cache";

export interface OrdenResumen {
  id: string;
  compradorId: string;
  vendedorId: string;
  fecha: string;
  total: number;
  estadoPago: string;
  estadoEnvio: string;
}

export interface OrdenDetalle extends OrdenResumen {
  items: {
    productoId: string;
    nombre: string;
    cantidad: number;
    precio: number;
    imagenUrl: string;
  }[];
  envioInfo?: {
    trackingId: string;
    operador: string;
    direccion: string;
    demoraDias: number;
  };
}

export async function obtenerOrdenes(): Promise<OrdenResumen[]> {
  const usarApiReal = process.env.USE_REAL_API === "true";

  if (usarApiReal) {
    try {
      // fetch(`${process.env.BUYER_API_URL}/admin/ordenes`)
      throw new Error("API Real no configurada");
    } catch (error) {
      console.warn("Fallo real, usando mocks de órdenes:", error);
      return obtenerOrdenesMock();
    }
  }
  return obtenerOrdenesMock();
}

export async function obtenerDetalleOrden(
  id: string,
): Promise<OrdenDetalle | null> {
  const usarApiReal = process.env.USE_REAL_API === "true";

  if (usarApiReal) {
    try {
      /*
      const [resBuyer, resShipping, resSeller] = await Promise.allSettled([
        fetch(`${process.env.BUYER_API_URL}/admin/ordenes/${id}`),
        fetch(`${process.env.SHIPPING_API_URL}/admin/envios/orden/${id}`),
        fetch(`${process.env.SELLER_API_URL}/admin/subordenes/orden/${id}`)
      ]);
      // ... lógica de unificación ...
      */
      throw new Error("API Real no configurada");
    } catch (error) {
      console.warn("Fallo real, usando mock de detalle de orden:", error);
      return obtenerDetalleOrdenMock(id);
    }
  }
  return obtenerDetalleOrdenMock(id);
}

async function obtenerOrdenesMock(): Promise<OrdenResumen[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return [
    {
      id: "ord_1001",
      compradorId: "user_2X9aB1",
      vendedorId: "user_3Y8cC2",
      fecha: new Date().toISOString(),
      total: 125000,
      estadoPago: "Pagado",
      estadoEnvio: "En Tránsito",
    },
    {
      id: "ord_1002",
      compradorId: "user_5W6eE4",
      vendedorId: "user_3Y8cC2",
      fecha: new Date(Date.now() - 86400000).toISOString(),
      total: 85000,
      estadoPago: "Pendiente",
      estadoEnvio: "Creado",
    },
    {
      id: "ord_1003",
      compradorId: "user_2X9aB1",
      vendedorId: "vendedor_99",
      fecha: new Date(Date.now() - 172800000).toISOString(),
      total: 450000,
      estadoPago: "Pagado",
      estadoEnvio: "Entregado",
    },
  ];
}

async function obtenerDetalleOrdenMock(id: string): Promise<OrdenDetalle> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id,
    compradorId: "user_2X9aB1",
    vendedorId: "user_3Y8cC2",
    fecha: new Date().toISOString(),
    total: 125000,
    estadoPago: id === "ord_1002" ? "Pendiente" : "Pagado",
    estadoEnvio: id === "ord_1003" ? "Entregado" : "En Tránsito",
    items: [
      {
        productoId: "prod_1",
        nombre: "Dior Sauvage 100ml",
        cantidad: 1,
        precio: 120000,
        imagenUrl: "/images/dior-sauvage.jpg",
      },
    ],
    envioInfo: {
      trackingId: `TRK-${id.replace("ord_", "")}`,
      operador: "Andreani",
      direccion: "Av. Alem 1253, Bahía Blanca",
      demoraDias: 4,
    },
  };
}

export async function cancelarOrden(id: string) {
  const usarApiReal = process.env.USE_REAL_API === "true";

  if (usarApiReal) {
    try {
      /*
      const res = await fetch(`${process.env.BUYER_API_URL}/admin/ordenes/${id}/cancelar`, {
        method: "POST",
        headers: { "x-api-key": process.env.SUPERADMIN_SECRET_KEY || "" }
      });
      if (!res.ok) throw new Error("Error al cancelar");
      */
    } catch (error) {
      console.error("Error cancelando la orden:", error);
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  revalidatePath(`/ordenes/${id}`);
  revalidatePath("/ordenes");
}

export async function activarOrden(id: string) {
  const usarApiReal = process.env.USE_REAL_API === "true";

  if (usarApiReal) {
    try {
      /*
      const res = await fetch(`${process.env.BUYER_API_URL}/admin/ordenes/${id}/activar`, {
        method: "POST",
        headers: { "x-api-key": process.env.SUPERADMIN_SECRET_KEY || "" }
      });
      if (!res.ok) throw new Error("Error al activar");
      */
    } catch (error) {
      console.error("Error activando la orden:", error);
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  revalidatePath(`/ordenes/${id}`);
  revalidatePath("/ordenes");
}
