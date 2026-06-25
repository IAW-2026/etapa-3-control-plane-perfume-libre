import {
  banearUsuario,
  desbanearUsuario,
  obtenerDetalleUsuario,
} from "@/lib/api/usuarios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Ban,
  CheckCircle,
  ShieldAlert,
  ShoppingBag,
  Store,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatearDinero } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DetalleUsuarioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const usuario = await obtenerDetalleUsuario(id);

  if (!usuario) notFound();

  async function handleBan() {
    "use server";
    await banearUsuario(id);
  }

  async function handleUnban() {
    "use server";
    await desbanearUsuario(id);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/usuarios">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {usuario.nombre}
            </h2>
            <p className="text-sm text-muted-foreground font-mono">
              {usuario.id}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {usuario.estado === "Activo" ? (
            <form action={handleBan}>
              <Button type="submit" variant="destructive">
                <Ban className="mr-2 h-4 w-4" /> Suspender Cuenta
              </Button>
            </form>
          ) : (
            <form action={handleUnban}>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="mr-2 h-4 w-4" /> Reactivar
              </Button>
            </form>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Info General y Moderación (Feedback App) */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Datos de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase">Email</p>
                <p className="font-medium">{usuario.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">
                  Rol Asignado
                </p>
                <Badge variant="secondary" className="mt-1">
                  {usuario.rol}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">
                  Miembro desde
                </p>
                <p className="font-medium">
                  {new Date(usuario.fechaRegistro).toLocaleDateString("es-AR")}
                </p>
              </div>
            </CardContent>
          </Card>

          {usuario.feedbackInfo ? (
            <Card
              className={
                usuario.feedbackInfo.reportesRecibidos > 0
                  ? "border-destructive/50"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <ShieldAlert className="h-4 w-4" /> Salud de la Cuenta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Calificación Promedio
                  </p>
                  <p className="text-2xl font-bold">
                    {usuario.feedbackInfo.calificacion}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      / 5.0
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Reportes Recibidos
                  </p>
                  <p
                    className={`font-medium ${usuario.feedbackInfo.reportesRecibidos > 0 ? "text-destructive" : ""}`}
                  >
                    {usuario.feedbackInfo.reportesRecibidos} reportes
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-sm text-muted-foreground text-center">
                Sin actividad de reseñas.
              </CardContent>
            </Card>
          )}
        </div>

        {/* Métricas de Buyer y Seller */}
        <div className="md:col-span-2 space-y-6">
          {/* Buyer */}
          {usuario.buyerInfo ? (
            <Card>
              <CardHeader className="bg-secondary/30 border-b border-border/40">
                <CardTitle className="text-base flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" /> Actividad como Comprador
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Compras Realizadas
                  </p>
                  <p className="text-2xl font-bold">
                    {usuario.buyerInfo.comprasTotales}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Total Gastado
                  </p>
                  <p className="text-2xl font-bold">
                    {formatearDinero(usuario.buyerInfo.gastadoTotal)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Direcciones
                  </p>
                  <p className="text-2xl font-bold">
                    {usuario.buyerInfo.direcciones}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-sm text-muted-foreground text-center">
                No ha realizado compras aún.
              </CardContent>
            </Card>
          )}

          {/* Seller */}
          {usuario.sellerInfo && (
            <Card>
              <CardHeader className="bg-primary/5 border-b border-border/40">
                <CardTitle className="text-base flex items-center gap-2 text-primary">
                  <Store className="h-4 w-4" /> Actividad como Vendedor
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Perfumes Activos
                  </p>
                  <p className="text-2xl font-bold">
                    {usuario.sellerInfo.productosActivos}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Ventas Concretadas
                  </p>
                  <p className="text-2xl font-bold">
                    {usuario.sellerInfo.ventasTotales}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase">
                    Ingresos Generados
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {formatearDinero(usuario.sellerInfo.ingresos)}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
