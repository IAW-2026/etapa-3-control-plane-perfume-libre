export interface ProductoResumen {
  id: string;
  titulo: string;
  precio: number;
  stock: number;
  estado: "activo" | "pausado" | "borrado";
  vendedorId: string;
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
    },
    {
      id: "2",
      titulo: "Versace Eros",
      precio: 180000,
      stock: 0,
      estado: "pausado",
      vendedorId: "seller_2",
    },
    {
      id: "3",
      titulo: "Chanel No. 5",
      precio: 350000,
      stock: 12,
      estado: "activo",
      vendedorId: "seller_1",
    },
  ];
}

// TODO: Implementar acciones basicas.
