import { obtenerUsuarios } from "@/lib/api/usuarios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoreHorizontal, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const dynamic = "force-dynamic";

export default async function UsuariosPage() {
  const usuarios = await obtenerUsuarios();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Gestión de Usuarios
          </h2>
          <p className="text-muted-foreground">
            Listado global de compradores y vendedores.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por email o ID..."
            className="pl-8 bg-card"
          />
        </div>
      </div>

      <div className="border rounded-md bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Registro</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="font-medium">{user.nombre}</div>
                  <div className="text-xs text-muted-foreground">
                    {user.email}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{user.rol}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(user.fechaRegistro).toLocaleDateString("es-AR")}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.estado === "Activo" ? "default" : "destructive"
                    }
                  >
                    {user.estado}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/usuarios/${user.id}`}>
                    <Button variant="ghost" size="sm">
                      Ver Detalle
                    </Button>
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
