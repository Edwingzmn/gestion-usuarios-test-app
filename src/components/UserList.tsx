import React, { useEffect, useState } from "react";
import { Table, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useApi } from "../hooks/useApi";
import { User } from "../types/userTypes";
import UserEditModal from "./UserEditModal";

const limit = 20;

interface UserListProps {
  refresh: boolean;
  showToast: (message: string, variant?: "success" | "danger") => void;
}

const UserList: React.FC<UserListProps> = ({ refresh, showToast }) => {
  const { getUsers, updateUser } = useApi();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Debounce para el término de búsqueda
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Obtener datos de usuarios cuando cambia la página, el término de búsqueda o refresh
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getUsers(page, limit, debouncedSearchTerm); // Pasar debouncedSearchTerm
        setUsers(data);
        setHasMore(data.length === limit);
        setError("");
      } catch (err) {
        setError("Error al obtener usuarios");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, debouncedSearchTerm, refresh]);

  // Resetear a la primera página cuando se cambia el término de búsqueda
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleSave = async (updatedUser: User) => {
    if (selectedUser?.id) {
      try {
        await updateUser(selectedUser.id, updatedUser);
        setUsers((prev) =>
          prev.map((u) =>
            u.id === selectedUser.id ? { ...updatedUser, id: u.id } : u
          )
        );
        setShowEditModal(false);
        showToast("Usuario actualizado correctamente", "success");
      } catch (err) {
        console.error("Error al actualizar usuario:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Error al actualizar usuario";
        showToast(errorMessage, "danger");
      }
    }
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Filtro por Apellido Paterno</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa el apellido paterno"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : users.length === 0 ? (
        <Alert variant="info">No se encontraron usuarios</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Correo Electrónico</th>
                <th>Fecha de Nacimiento</th>
                <th>Dirección</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>
                    {user.datos?.imagen && (
                      <img
                        src={user.datos.imagen}
                        alt="User"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </td>
                  <td>{user.nombre}</td>
                  <td>{user.apellidoPaterno}</td>
                  <td>{user.apellidoMaterno}</td>
                  <td>{user.email}</td>
                  <td>{user.fechaNac}</td>
                  <td>
                    {user.datos?.calle} {user.datos?.numero},{" "}
                    {user.datos?.colonia}, {user.datos?.delegacion},{" "}
                    {user.datos?.estado} {user.datos?.cp}
                  </td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleEdit(user)}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Controles de paginación */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Button
              variant="secondary"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Anterior
            </Button>
            <span>Página {page}</span>
            <Button
              variant="secondary"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!hasMore}
            >
              Siguiente
            </Button>
          </div>
        </>
      )}

      {selectedUser && (
        <UserEditModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          user={selectedUser}
          onSave={handleSave}
          showToast={showToast} // Pasamos la función al modal
        />
      )}
    </div>
  );
};

export default UserList;
