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
  "use server";
  // fetch(`${process.env.FEEDBACK_API_URL}/admin/reportes/${idReporte}/moderar`, { method: 'POST', body: JSON.stringify({ decision }) })
}
