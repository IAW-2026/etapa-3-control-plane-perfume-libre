import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BuyerMetrics,
  FeedbackMetrics,
  GlobalMetrics,
  obtenerMetricasGlobales,
  SellerMetrics,
  ShippingMetrics,
} from "@/lib/api/metricas";
import { formatearDinero } from "@/lib/utils";
import {
  Activity,
  DollarSign,
  Package,
  ShieldAlert,
  Truck,
  Users,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const metricas = await obtenerMetricasGlobales();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard General</h2>
        <p className="text-muted-foreground">
          Visión consolidada del sistema Perfume Libre.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricasBuyer metricas={metricas.buyer} />

        <MetricasSeller metricas={metricas.seller} />

        <MetricasShipping metricas={metricas.shipping} />

        <MetricasFeedback metricas={metricas.feedback} />
      </div>
    </div>
  );
}
function MetricasShipping({ metricas }: { metricas: ShippingMetrics }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Logística (En tránsito)
        </CardTitle>
        <Truck className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metricas.enviosActivos}</div>
        <p className="text-xs text-muted-foreground border-t pt-2 mt-2">
          <span className="font-semibold text-green-600">
            {metricas.entregadosHoy}
          </span>{" "}
          paquetes entregados hoy
        </p>
      </CardContent>
    </Card>
  );
}

function MetricasBuyer({ metricas }: { metricas: BuyerMetrics }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Ingresos Totales (Mes)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {formatearDinero(metricas.ingresosMes)}
        </div>
        <p className="text-xs text-muted-foreground border-t pt-2 mt-2">
          <span className="font-semibold text-primary">
            {metricas.ordenesHoy}
          </span>{" "}
          órdenes generadas hoy
        </p>
      </CardContent>
    </Card>
  );
}

function MetricasSeller({ metricas }: { metricas: SellerMetrics }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Catálogo Activo</CardTitle>
        <Package className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metricas.productosActivos}</div>
        <p className="text-xs text-muted-foreground border-t pt-2 mt-2">
          Distribuidos entre{" "}
          <span className="font-semibold">{metricas.vendedoresTotales}</span>{" "}
          vendedores
        </p>
      </CardContent>
    </Card>
  );
}

function MetricasFeedback({ metricas }: { metricas: FeedbackMetrics }) {
  return (
    <Card
      className={metricas.reportesPendientes > 0 ? "border-destructive/50" : ""}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Salud y Moderación
        </CardTitle>
        {metricas.reportesPendientes > 0 ? (
          <ShieldAlert className="h-4 w-4 text-destructive" />
        ) : (
          <Activity className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {metricas.calificacionGlobal} / 5.0
        </div>
        <p className="text-xs text-muted-foreground border-t pt-2 mt-2 flex items-center gap-1">
          <span
            className={`font-semibold ${metricas.reportesPendientes > 0 ? "text-destructive" : ""}`}
          >
            {metricas.reportesPendientes}
          </span>{" "}
          reportes pendientes
        </p>
      </CardContent>
    </Card>
  );
}
