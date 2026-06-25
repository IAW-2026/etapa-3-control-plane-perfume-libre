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
