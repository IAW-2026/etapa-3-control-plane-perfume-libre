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
    "mensaje": "La orden ord_1002 ha sido cancelada exitosamente
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
    "mensaje": "La orden ord_1002 ha sido reactivada
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
