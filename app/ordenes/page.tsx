// app/ordenes/page.tsx
import { obtenerOrdenes } from "@/lib/api/ordenes";
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
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";

export default async function OrdenesPage() {
  const ordenes = await obtenerOrdenes();

  const formatearDinero = (monto: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(monto);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Registro de Órdenes
          </h2>
          <p className="text-muted-foreground">
            Transacciones históricas y en curso de todo el sistema.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar ID de orden..."
            className="pl-8 bg-card"
          />
        </div>
      </div>

      <div className="border rounded-md bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Orden</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Pago</TableHead>
              <TableHead>Envío</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordenes.map((orden) => (
              <TableRow key={orden.id}>
                <TableCell className="font-mono text-xs font-medium">
                  {orden.id}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(orden.fecha).toLocaleDateString("es-AR")}
                </TableCell>
                <TableCell className="font-semibold">
                  {formatearDinero(orden.total)}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      orden.estadoPago === "Pagado" ? "default" : "secondary"
                    }
                  >
                    {orden.estadoPago}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      orden.estadoEnvio === "Entregado" ? "outline" : "default"
                    }
                    className={
                      orden.estadoEnvio === "En Tránsito"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : ""
                    }
                  >
                    {orden.estadoEnvio}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/ordenes/${orden.id}`}>
                    <Button variant="ghost" size="sm">
                      Ver Detalle
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
