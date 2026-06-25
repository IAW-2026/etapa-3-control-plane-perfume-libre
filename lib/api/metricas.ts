export interface GlobalMetrics {
  buyer: BuyerMetrics;
  seller: SellerMetrics;
  shipping: ShippingMetrics;
  feedback: FeedbackMetrics;
}
export interface BuyerMetrics {
  usuariosTotales: number;
  ordenesHoy: number;
  ingresosMes: number;
}

export interface SellerMetrics {
  vendedoresTotales: number;
  productosActivos: number;
}

export interface ShippingMetrics {
  enviosActivos: number;
  entregadosHoy: number;
}

export interface FeedbackMetrics {
  calificacionGlobal: number;
  reportesPendientes: number;
}

export async function obtenerMetricasGlobales(): Promise<GlobalMetrics> {
  const usarApiReal = process.env.USE_REAL_API === "true";

  if (usarApiReal) {
    try {
      // TODO: CONECTAR APIS
      /*
      const [buyerRes, sellerRes, shippingRes, feedbackRes] = await Promise.all([
        fetch(`${process.env.BUYER_API_URL}/admin/metricas`, { cache: 'no-store' }),
        fetch(`${process.env.SELLER_API_URL}/admin/metricas`, { cache: 'no-store' }),
        fetch(`${process.env.SHIPPING_API_URL}/admin/metricas`, { cache: 'no-store' }),
        fetch(`${process.env.FEEDBACK_API_URL}/admin/metricas`, { cache: 'no-store' }),
      ]);
      return {
        buyer: await buyerRes.json(),
        seller: await sellerRes.json(),
        shipping: await shippingRes.json(),
        feedback: await feedbackRes.json(),
      };
      */
      throw new Error("APIs reales no configuradas aún");
    } catch (error) {
      console.warn("Fallo al obtener métricas reales, usando Mocks:", error);
      return obtenerMetricasMock();
    }
  }

  return obtenerMetricasMock();
}

async function obtenerMetricasMock(): Promise<GlobalMetrics> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    buyer: { usuariosTotales: 1254, ordenesHoy: 42, ingresosMes: 8500000 },
    seller: { vendedoresTotales: 15, productosActivos: 342 },
    shipping: { enviosActivos: 89, entregadosHoy: 14 },
    feedback: { calificacionGlobal: 4.6, reportesPendientes: 3 },
  };
}
