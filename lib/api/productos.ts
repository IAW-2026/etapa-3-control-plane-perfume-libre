import { revalidatePath } from "next/cache";

export interface ProductoResumen {
  id: string;
  titulo: string;
  precio: number;
  stock: number;
  estado: "activo" | "pausado" | "borrado";
  vendedorId: string;
  imagenUrl: string;
}

export async function obtenerProductos(): Promise<ProductoResumen[]> {
  const usarApiReal = process.env.USE_REAL_API === "true";

  if (usarApiReal) {
    try {
      // fetch(`${process.env.SELLER_API_URL}/admin/productos`)
      throw new Error("API Real no configurada");
    } catch (error) {
      console.warn("Fallo real, usando mocks de productos:", error);
      return obtenerProductosMock();
    }
  }
  return obtenerProductosMock();
}

async function obtenerProductosMock(): Promise<ProductoResumen[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return [
    {
      id: "1",
      titulo: "Dior Sauvage",
      precio: 210000,
      stock: 50,
      estado: "activo",
      vendedorId: "seller_1",
      imagenUrl: "https://example.com/dior-sauvage.jpg",
    },
    {
      id: "2",
      titulo: "Versace Eros",
      precio: 180000,
      stock: 0,
      estado: "pausado",
      vendedorId: "seller_2",
      imagenUrl: "https://example.com/versace-eros.jpg",
    },
    {
      id: "3",
      titulo: "Chanel No. 5",
      precio: 350000,
      stock: 12,
      estado: "activo",
      vendedorId: "seller_1",
      imagenUrl: "https://example.com/chanel-no5.jpg",
    },
  ];
}

export async function activarProducto(id: string) {
  const usarApiReal = process.env.USE_REAL_API === "true";

  if (usarApiReal) {
    try {
      // fetch(`${process.env.SELLER_API_URL}/admin/productos/${id}/activar`, { method: "POST", headers: { "x-api-key": process.env.SUPERADMIN_SECRET_KEY || "" } })
    } catch (error) {
      console.error("Error activando producto:", error);
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  revalidatePath("/productos");
}

export async function pausarProducto(id: string) {
  const usarApiReal = process.env.USE_REAL_API === "true";

  if (usarApiReal) {
    try {
      // fetch(`${process.env.SELLER_API_URL}/admin/productos/${id}/pausar`, { method: "POST", headers: { "x-api-key": process.env.SUPERADMIN_SECRET_KEY || "" } })
    } catch (error) {
      console.error("Error pausando producto:", error);
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  revalidatePath("/productos");
}

export async function borrarProducto(id: string) {
  const usarApiReal = process.env.USE_REAL_API === "true";

  if (usarApiReal) {
    try {
      // fetch(`${process.env.SELLER_API_URL}/admin/productos/${id}`, { method: "DELETE", headers: { "x-api-key": process.env.SUPERADMIN_SECRET_KEY || "" } })
    } catch (error) {
      console.error("Error borrando producto:", error);
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  revalidatePath("/productos");
}
