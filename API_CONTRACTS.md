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
