# Contratos de API - Control Plane

Este documento define los endpoints que el **Control Plane** necesita consumir de cada una de las aplicaciones individuales (Buyer, Seller, Shipping, Feedback) para funcionar correctamente.

---

## 1. Buyer App

### 1.1 Obtener metricas

**Método:** `GET`  
**Ruta:** `/api/admin/metricas`  
**Descripción:** Devuelve total de usuarios, ordenes de hoy y revenue

**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "usuariosTotales": 1254,
    "ordenesHoy": 42,
    "ingresosMes": 8500000
  }
]
```

### 1.2 Obtener estadísticas de un comprador

**Método:** `GET`  
**Ruta:** `/api/admin/usuarios/:id`  
**Descripción:** Detalle del comprador y su historial de ordenes
**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Escenario 1: El usuario es un vendedor (200 OK):**

```json
[
  {
    "comprasTotales": 15,
    "gastadoTotal": 150000,
    "direcciones": 3
  }
]
```

**Escenario 2: El usuario no es un comprador (404 Not Found)**

> [!NOTE]
> Si el ID de Clerk proporcionado no existe en su tabla de usuarios, deben retornar un status 404. El Control Plane entenderá automáticamente que es un comprador normal y ocultará el panel de vendedor.

### 1.3 Obtener informacion de todas las ordenes de la app

**Método:** `GET`  
**Ruta:** `/api/admin/ordenes`  
**Descripción:** Devuelve lista con informacion basica de una orden
**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "id": "ord_1001",
    "compradorId": "user_2X9aB1",
    "vendedorId": "user_3Y8cC2",
    "fecha": "2026-06-25T13:22:15.123Z",
    "total": 125000,
    "estadoPago": "Pagado",
    "estadoEnvio": "En Tránsito"
  }
]
```

**Escenario 2: El usuario no es un comprador (404 Not Found)**

> [!NOTE]
> Si el ID de Clerk proporcionado no existe en su tabla de usuarios, deben retornar un status 404. El Control Plane entenderá automáticamente que es un comprador normal y ocultará el panel de vendedor.

### 1.4 Obtener informacion detallada de una orden de la app

**Método:** `GET`  
**Ruta:** `/api/admin/ordenes/:id`  
**Descripción:** Devuelve informacion detallada de una orden
**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "id": "Ord_3AM3FA",
    "compradorId": "user_2X9aB1",
    "vendedorId": "user_3Y8cC2",
    "fecha": "2026-06-25T13:23:14.205Z",
    "total": 125000,
    "estadoPago": "Pagado",
    "estadoEnvio": "Entregado",
    "items": [
      {
        "productoId": "prod_1",
        "nombre": "Dior Sauvage 100ml",
        "cantidad": 1,
        "precio": 120000,
        "imagenUrl": "/images/dior-sauvage.jpg"
      },
      {
        "productoId": "prod_2",
        "nombre": "Paco Rabanne invictus 100ml",
        "cantidad": 1,
        "precio": 240000,
        "imagenUrl": "/images/paco-rabanne-invictus.jpg"
      }
    ],
    "envioInfo": {
      "trackingId": "TRK_3FAN2AF",
      "operador": "Andreani",
      "direccion": "Av. Alem 1253, Bahía Blanca",
      "demoraDias": 4
    }
  }
]
```

**Escenario 2: Si la orden no existe (404 Not Found)**

> [!NOTE]
> Si el la orden no se encuentra, deben retornar un status 404. El Control Plane entenderá automáticamente que el id no existe o esta incorrecto.

### 1.5 Cancelar una orden

**Método:** `POST`  
**Ruta:** `/api/admin/ordenes/:idOrden/cancelar`  
**Descripción:** Cambia el estado de una orden a "Cancelado" La Buyer App debe encargarse de actualizar su base de datos. Opcionalmente, debería notificar a la Shipping App para detener el envío, pero por ahora solo cambia el estado en la base de datos de Buyer.

**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "status": "success",
    "mensaje": "La orden ord_1002 ha sido cancelada exitosamente"
  }
]
```

**Escenario 2: Si la orden no existe (404 Not Found)**

> [!NOTE]
> Si el la orden no se encuentra, deben retornar un status 404. El Control Plane entenderá automáticamente que el id no existe o esta incorrecto.

### 1.6 Activar una orden

**Método:** `POST`  
**Ruta:** `/api/admin/ordenes/:idOrden/activar`  
**Descripción:** Cambia el estado de una orden a "Pagado" La Buyer App debe encargarse de actualizar su base de datos. Opcionalmente, debería notificar a la Shipping App para reactivar el envío, pero por ahora solo cambia el estado en la base de datos de Buyer.

**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "status": "success",
    "mensaje": "La orden ord_1002 ha sido reactivada"
  }
]
```

**Escenario 2: Si la orden no existe (404 Not Found)**

> [!NOTE]
> Si el la orden no se encuentra, deben retornar un status 404. El Control Plane entenderá automáticamente que el id no existe o esta incorrecto.

## 2. Seller App

### 2.1 Obtener metricas

**Método:** `GET`  
**Ruta:** `/api/admin/metricas`  
**Descripción:** Devuelve total de vendedores y productos activos

**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "vendedoresTotales": 15,
    "productosActivos": 342
  }
]
```

### 2.2 Obtener estadísticas de un Vendedor

**Método:** `GET`  
**Ruta:** `/api/admin/vendedores/:id`  
**Descripción:** Devuelve un resumen de la actividad de ventas de un usuario utilizando su `userId` de Clerk.
**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Escenario 1: El usuario es un vendedor (200 OK):**

```json
[
  {
    "productosActivos": 45,
    "ventasTotales": 128,
    "ingresos": 4500000
  }
]
```

**Escenario 2: El usuario no es un vendedor (404 Not Found)**

> [!NOTE]
> Si el ID de Clerk proporcionado no existe en su tabla de vendedores, deben retornar un status 404. El Control Plane entenderá automáticamente que es un comprador normal y ocultará el panel de vendedor.

### 2.3 Obtener productos

**Método:** `GET`  
**Ruta:** `/api/admin/productos`  
**Descripción:** Devuelve informacion detallada de todos los productos

**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
{
    "id": "1",
    "titulo": "Dior Sauvage",
    "precio": 210000,
    "stock": 50,
    "estado": "activo",
    "vendedorId": "seller_1",
    "imagenUrl": "https://example.com/dior-sauvage.jpg"
  },
  {
    "id": "2",
    "titulo": "Versace Eros",
    "precio": 180000,
    "stock": 0,
    "estado": "pausado",
    "vendedorId": "seller_2",
    "imagenUrl": "https://example.com/versace-eros.jpg"
  },
```

### 2.4 Activar un producto

**Método:** `POST`  
**Ruta:** `/api/admin/productos/:idProducto/activar`  
**Descripción:** Cambia el estado de un producto a "activo" para que vuelva a estar visible en el marketplace.

**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "status": "success",
    "mensaje": "prod_412 activado correctamente"
  }
]
```

**Escenario 2: Si el producto no existe (404 Not Found)**

> [!NOTE]
> Si el producto no se encuentra, deben retornar un status 404. El Control Plane entenderá automáticamente que el id no existe o esta incorrecto.

### 2.5 Pausar un producto

**Método:** `POST`  
**Ruta:** `/api/admin/productos/:idProducto/pausar`  
**Descripción:** Cambia el estado de un producto a "pausado". No elimina el producto, pero lo oculta de la tienda.

**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "status": "success",
    "mensaje": "prod_412 pausado"
  }
]
```

**Escenario 2: Si el producto no existe (404 Not Found)**

> [!NOTE]
> Si el producto no se encuentra, deben retornar un status 404. El Control Plane entenderá automáticamente que el id no existe o esta incorrecto.

### 2.6 Eliminar un producto

**Método:** `DELETE`  
**Ruta:** `/api/admin/productos/:idProducto`  
**Descripción:** Elimina (o hace borrado lógico / soft delete) un producto del catálogo de la Seller App.

**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "status": "success",
    "mensaje": "prod_412 borrado exitosamente"
  }
]
```

**Escenario 2: Si el producto no existe (404 Not Found)**

> [!NOTE]
> Si el producto no se encuentra, deben retornar un status 404. El Control Plane entenderá automáticamente que el id no existe o esta incorrecto.

## 3. Shipping App

### 3.1 Obtener metricas

**Método:** `GET`  
**Ruta:** `/api/admin/metricas`  
**Descripción:** Devuelve envios activos y entregados hoy

**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "enviosActivos": 89,
    "entregadosHoy": 14
  }
]
```

## 4. Feedback App

### 4.1 Obtener metricas

**Método:** `GET`  
**Ruta:** `/api/admin/metricas`  
**Descripción:** Devuelve promedio global y reportes pendientes (o cant total de reportes definir)

**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "calificacionGlobal": 4.6,
    "reportesPendientes": 3
  }
]
```

### 4.2 Obtener estadísticas de un comprador

**Método:** `GET`  
**Ruta:** `/api/admin/usuarios/:id/metricas`  
**Descripción:** Calificacion del vendedor y cant de reportes recibidos
**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Escenario 1: El usuario es un vendedor (200 OK):**

```json
[
  {
    "calificacion": 4.8,
    "reportesRecibidos": 5
  }
]
```

**Escenario 2: El usuario no es un comprador (404 Not Found)**

> [!NOTE]
> Si el ID de Clerk proporcionado no existe en su tabla de usuarios, deben retornar un status 404. El Control Plane entenderá automáticamente que es un comprador normal y ocultará el panel de vendedor.

### 4.3 Obtener Reportes Pendientes

**Método:** `GET`  
**Ruta:** `/api/admin/reportes/pendientes`  
**Descripción:** Devuelve una lista de los reportes que aún no han sido procesados

**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "idReporte": "rep_1",
    "idResena": "res_abc",
    "motivo": "INAPROPIADO",
    "resenaComentario": "Este perfume no es original...",
    "calificacion": 1,
    "fechaReporte": "2026-06-24T10:00:00Z"
  }
]
```

### 4.4 Obtener detalles de un reporte especifico

**Método:** `GET`  
**Ruta:** `/api/admin/reportes/:idReporte`  
**Descripción:** Obtiene la información ampliada de un reporte específico para la vista de moderación.
**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
_Ninguno._

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "idReporte": "rep_1",
    "idResena": "res_abc",
    "comentarioResena": "Este perfume no es original...",
    "motivo": "INAPROPIADO",
    "usuarioReportado": "user_789xyz",
    "fechaReporte": "2026-06-24T10:00:00Z"
  }
]
```

### 4.5 Ejecutar Decisión de Moderación

**Método:** `POST`  
**Ruta:** `/api/admin/reportes/:idReporte/moderar`  
**Descripción:** Aplica la decisión tomada por el administrador. La Feedback App debe encargarse de cambiar el EstadoResena o de crear el registro de ModeracionResena correspondiente.

**Headers Requeridos:**

- `api-key`: `[key]` (definir key)

**Body Requerido (Request):**
El cuerpo de la petición acepta un objeto con las siguientes opciones estrictas:

```typescript
type DecisionTipo = "RECHAZAR" | "OCULTAR" | "ELIMINAR";

interface RequestBody {
  decision: DecisionTipo;
}
```

_Ejemplo de JSON enviado (`application/json`):_

```json
{
  "decision": "OCULTAR"
}
```

**Ejemplo de respuesta Exitosa (200 OK):**

```json
[
  {
    "status": "success",
    "mensaje": "La orden ord_1002 ha sido cancelada exitosamente"
  }
]
```

**Escenario 2: Si el reporte no existe (404 Not Found)**

> [!NOTE]
> Si el reporte no se encuentra, deben retornar un status 404. El Control Plane entenderá automáticamente que el id no existe o esta incorrecto.
