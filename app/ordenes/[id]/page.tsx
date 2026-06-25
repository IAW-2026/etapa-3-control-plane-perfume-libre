// app/ordenes/[id]/page.tsx
import {
  activarOrden,
  cancelarOrden,
  obtenerDetalleOrden,
} from "@/lib/api/ordenes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Ban,
  Box,
  CheckCircle,
  CreditCard,
  Package,
  Truck,
  User,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatearDinero } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DetalleOrdenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orden = await obtenerDetalleOrden(id);

  if (!orden) notFound();

  async function handleCancelar() {
    "use server";
    await cancelarOrden(id);
  }

  async function handleActivar() {
    "use server";
    await activarOrden(id);
  }

  const estaCancelada = orden.estadoPago === "Cancelado";

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/ordenes">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Orden <span className="font-mono text-primary">{orden.id}</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Creada el {new Date(orden.fecha).toLocaleString("es-AR")}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {estaCancelada ? (
            <form action={handleActivar}>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" /> Reactivar Orden
              </Button>
            </form>
          ) : (
            <form action={handleCancelar}>
              <Button
                type="submit"
                variant="destructive"
                disabled={orden.estadoEnvio === "Entregado"}
              >
                <Ban className="mr-2 h-4 w-4" /> Cancelar Orden
              </Button>
            </form>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Actores de la transacción */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" /> Actores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">
                  Comprador ID
                </p>
                <Link
                  href={`/usuarios/${orden.compradorId}`}
                  className="font-mono text-sm text-primary hover:underline"
                >
                  {orden.compradorId}
                </Link>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground uppercase">
                  Vendedor ID
                </p>
                <Link
                  href={`/usuarios/${orden.vendedorId}`}
                  className="font-mono text-sm text-primary hover:underline"
                >
                  {orden.vendedorId}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pagos, Items y Logística */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Estado Financiero */}
            <Card>
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <p className="font-medium">Estado Financiero</p>
                </div>
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl font-bold">
                    {formatearDinero(orden.total)}
                  </p>
                  <Badge
                    variant={
                      orden.estadoPago === "Pagado" ? "default" : "secondary"
                    }
                  >
                    {orden.estadoPago}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Estado Logístico */}
            <Card>
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <p className="font-medium">Estado Logístico</p>
                </div>
                <div className="flex items-baseline gap-3">
                  <p className="text-lg font-bold">
                    {orden.envioInfo?.operador || "Sin asignar"}
                  </p>
                  <Badge className="bg-blue-600">{orden.estadoEnvio}</Badge>
                </div>
                {orden.envioInfo && (
                  <p className="text-xs text-muted-foreground mt-2 font-mono">
                    Tracking: {orden.envioInfo.trackingId}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Items de la orden */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Package className="h-4 w-4" /> Productos de la Orden
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead className="text-center">Cant.</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orden.items.map((item, idx) => (
                      <TableRow key={idx}>
                        {/* ACÁ AGREGAMOS LA FOTO Y EL NOMBRE LADO A LADO */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {/* Usamos un tag <img> con object-cover para que las fotos se vean prolijas */}
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-muted">
                              <img
                                src={
                                  item.imagenUrl || "/placeholder-perfume.jpg"
                                }
                                alt={item.nombre}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{item.nombre}</div>
                              <div className="text-xs text-muted-foreground font-mono">
                                {item.productoId}
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="text-center">
                          {item.cantidad}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {formatearDinero(item.precio * item.cantidad)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
