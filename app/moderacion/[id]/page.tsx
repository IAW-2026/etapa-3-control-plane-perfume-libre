import {
  obtenerDetalleReporte,
  ejecutarModeracion,
} from "@/lib/api/moderacion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default async function DetalleModeracionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const reporte = await obtenerDetalleReporte(id);

  const accionModerar = ejecutarModeracion.bind(null, id);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Link href="/moderacion">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Volver a la cola
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <ShieldAlert className="h-5 w-5" /> Revisar Reporte {id}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-secondary/50 p-4 rounded-md">
            <p className="text-xs text-muted-foreground uppercase mb-1">
              Comentario bajo sospecha
            </p>
            <p className="italic text-lg">"{reporte.comentarioResena}"</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase">Motivo</p>
              <Badge variant="destructive">{reporte.motivo}</Badge>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase">
                Usuario implicado
              </p>
              <p className="font-mono">{reporte.usuarioReportado}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <form action={accionModerar.bind(null, "RECHAZAR")}>
              <Button variant="outline" type="submit">
                Rechazar Denuncia
              </Button>
            </form>

            <AlertDialog>
              <AlertDialogTrigger
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                Ocultar Reseña
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Ocultar reseña?</AlertDialogTitle>
                  <AlertDialogDescription>
                    La reseña dejará de ser visible para otros usuarios, pero
                    podrás restaurarla luego.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <form action={accionModerar.bind(null, "OCULTAR")}>
                    <AlertDialogAction
                      type="submit"
                      className={cn(buttonVariants({ variant: "default" }))}
                    >
                      Confirmar
                    </AlertDialogAction>
                  </form>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger
                className={cn(buttonVariants({ variant: "destructive" }))}
              >
                Eliminar Reseña
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-destructive">
                    ¿Eliminar permanentemente?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. La reseña se borrará de la
                    base de datos.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <form action={accionModerar.bind(null, "ELIMINAR")}>
                    <AlertDialogAction type="submit" className="bg-destructive">
                      Eliminar
                    </AlertDialogAction>
                  </form>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
