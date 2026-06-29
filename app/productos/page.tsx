// app/productos/page.tsx
import {
  activarProducto,
  borrarProducto,
  obtenerProductos,
  pausarProducto,
} from "@/lib/api/productos";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Play, Pause, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatearDinero } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProductosPage() {
  const productos = await obtenerProductos();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Catálogo de Productos
          </h2>
          <p className="text-muted-foreground">
            Gestión de inventario de todos los vendedores.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por título o ID..."
            className="pl-8 bg-card"
          />
        </div>
      </div>

      <div className="border rounded-md bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead>Vendedor ID</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((prod) => (
              <TableRow key={prod.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-muted">
                      <img
                        src={prod.imagenUrl || "/placeholder-perfume.jpg"}
                        alt={prod.titulo}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{prod.titulo}</span>
                  </div>
                </TableCell>

                <TableCell className="font-mono text-xs text-muted-foreground">
                  {prod.vendedorId}
                </TableCell>
                <TableCell>{formatearDinero(prod.precio)}</TableCell>
                <TableCell>{prod.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      prod.estado === "activo"
                        ? "default"
                        : prod.estado === "borrado"
                          ? "destructive"
                          : "secondary"
                    }
                    className="capitalize"
                  >
                    {prod.estado}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {prod.estado !== "activo" ? (
                      <form
                        action={async () => {
                          "use server";
                          await activarProducto(prod.id);
                        }}
                      >
                        <Button
                          type="submit"
                          variant="outline"
                          size="icon"
                          title="Activar"
                        >
                          <Play className="h-4 w-4 text-green-600" />
                        </Button>
                      </form>
                    ) : (
                      <form
                        action={async () => {
                          "use server";
                          await pausarProducto(prod.id);
                        }}
                      >
                        <Button
                          type="submit"
                          variant="outline"
                          size="icon"
                          title="Pausar"
                        >
                          <Pause className="h-4 w-4 text-yellow-600" />
                        </Button>
                      </form>
                    )}

                    <form
                      action={async () => {
                        "use server";
                        await borrarProducto(prod.id);
                      }}
                    >
                      <Button
                        type="submit"
                        variant="destructive"
                        size="icon"
                        title="Borrar"
                        disabled={prod.estado === "borrado"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
