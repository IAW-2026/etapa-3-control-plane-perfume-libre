import { obtenerProductos } from "@/lib/api/productos";
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
import { Search, MoreVertical } from "lucide-react";
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
                <TableCell className="font-medium">{prod.titulo}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {prod.vendedorId}
                </TableCell>
                <TableCell>{formatearDinero(prod.precio)}</TableCell>
                <TableCell>{prod.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant={prod.estado === "activo" ? "default" : "secondary"}
                    className="capitalize"
                  >
                    {prod.estado}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
