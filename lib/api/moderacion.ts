import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface ReportePendiente {
  idReporte: string;
  idResena: string;
  motivo: string;
  resenaComentario: string;
  calificacion: number;
  fechaReporte: string;
}

export interface ReporteDetalle {
  idReporte: string;
  idResena: string;
  comentarioResena: string;
  motivo: string;
  usuarioReportado: string;
  fechaReporte: string;
}

export async function obtenerReportesPendientes(): Promise<ReportePendiente[]> {
  // fetch(`${process.env.FEEDBACK_API_URL}/admin/reportes/pendientes`)
  return [
    {
      idReporte: "rep_1",
      idResena: "res_abc",
      motivo: "INAPROPIADO",
      resenaComentario: "Este perfume no es original...",
      calificacion: 1,
      fechaReporte: "2026-06-24",
    },
    {
      idReporte: "rep_2",
      idResena: "res_xyz",
      motivo: "FALSO_NO_APLICA",
      resenaComentario: "El vendedor nunca envió el paquete",
      calificacion: 1,
      fechaReporte: "2026-06-23",
    },
  ];
}

export async function obtenerDetalleReporte(
  id: string,
): Promise<ReporteDetalle> {
  // fetch(`${process.env.FEEDBACK_API_URL}/admin/reportes/${id}`)
  return {
    idReporte: id,
    idResena: "res_abc",
    comentarioResena: "Este perfume es una estafa total, no dura ni 5 minutos.",
    motivo: "FALSO_NO_APLICA",
    usuarioReportado: "user_789xyz",
    fechaReporte: "2026-06-24",
  };
}

export async function ejecutarModeracion(
  idReporte: string,
  decision: "RECHAZAR" | "OCULTAR" | "ELIMINAR",
) {
  const usarApiReal = process.env.USE_REAL_API === "true";

  if (usarApiReal) {
    try {
      /*
      const res = await fetch(`${process.env.FEEDBACK_API_URL}/admin/reportes/${idReporte}/moderar`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.SUPERADMIN_SECRET_KEY || ""
        },
        body: JSON.stringify({ decision })
      });
      if (!res.ok) throw new Error("Error en moderación");
      */
    } catch (error) {
      console.error(
        `Error ejecutando moderación ${decision} para el reporte ${idReporte}:`,
        error,
      );
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  revalidatePath("/moderacion");
  redirect("/moderacion");
}
