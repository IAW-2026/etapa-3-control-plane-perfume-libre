import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { obtenerReportesPendientes } from "@/lib/api/moderacion";
import Link from "next/link";

export default async function ModeracionPage() {
  const reportes = await obtenerReportesPendientes();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Cola de Moderación</h2>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Comentario Reportado</TableHead>
              <TableHead>Motivo</TableHead>
              <TableHead className="text-right">Acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportes.map((r) => (
              <TableRow key={r.idReporte}>
                <TableCell>{r.fechaReporte}</TableCell>
                <TableCell className="max-w-xs truncate italic">
                  "{r.resenaComentario}"
                </TableCell>
                <TableCell>
                  <Badge variant="destructive">{r.motivo}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/moderacion/${r.idReporte}`}>
                    <Button size="sm">Gestionar</Button>
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
