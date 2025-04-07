import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "../types/userTypes";
import WebcamCapture from "../components/WebcamCapture";
import { userSchema } from '../utils/validationSchema'

interface UserEditModalProps {
  show: boolean;
  onHide: () => void;
  user: User | null;
  onSave: (user: User) => Promise<void>;
  showToast: (message: string, variant?: 'success' | 'danger') => void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({
  show,
  onHide,
  user,
  onSave,
  showToast,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<User>({
    resolver: yupResolver(userSchema),
    defaultValues: {} as User,
  });

  const [showWebcam, setShowWebcam] = React.useState(false);
  const imagen = watch("datos.imagen");

  // Resetear el formulario cuando cambia el usuario o se muestra el modal
  React.useEffect(() => {
    if (user) {
      reset({
        ...user,
        datos: {
          ...user.datos,
          // Asegurar que no haya valores undefined
          calle: user.datos?.calle || "",
          numero: user.datos?.numero || "",
          colonia: user.datos?.colonia || "",
          delegacion: user.datos?.delegacion || "",
          estado: user.datos?.estado || "",
          cp: user.datos?.cp || "",
          imagen: user.datos?.imagen || "",
        },
      });
    }
  }, [user, reset, show]);

  const onSubmit = async (data: User) => {
    try {
      if (!data.datos?.imagen) {
        showToast('La foto es obligatoria', 'danger');
        return;
      }
      
      await onSave(data);
    } catch (error) {
      
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{user ? "Editar Usuario" : "Nuevo Usuario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Campos del formulario */}
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                {...register("nombre")}
                isInvalid={!!errors.nombre}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombre?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido Paterno</Form.Label>
              <Form.Control
                type="text"
                {...register("apellidoPaterno")}
                isInvalid={!!errors.apellidoPaterno}
              />
              <Form.Control.Feedback type="invalid">
                {errors.apellidoPaterno?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido Materno</Form.Label>
              <Form.Control
                type="text"
                {...register("apellidoMaterno")}
                isInvalid={!!errors.apellidoMaterno}
              />
              <Form.Control.Feedback type="invalid">
                {errors.apellidoMaterno?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email")}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento (AAAA-MM-DD)</Form.Label>
              <Form.Control
                type="date"
                {...register("fechaNac")}
                isInvalid={!!errors.fechaNac}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fechaNac?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                {...register("edad", { valueAsNumber: true })}
                isInvalid={!!errors.edad}
              />
              <Form.Control.Feedback type="invalid">
                {errors.edad?.message}
              </Form.Control.Feedback>
            </Form.Group> */}

            {/* Campos de dirección */}
            <h5 className="mt-4">Datos de Dirección</h5>

            <Form.Group className="mb-3">
              <Form.Label>Calle</Form.Label>
              <Form.Control
                type="text"
                {...register("datos.calle")}
                isInvalid={!!errors.datos?.calle}
              />
              <Form.Control.Feedback type="invalid">
                {errors.datos?.calle?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Número</Form.Label>
              <Form.Control
                type="text"
                {...register("datos.numero")}
                isInvalid={!!errors.datos?.numero}
              />
              <Form.Control.Feedback type="invalid">
                {errors.datos?.numero?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Colonia</Form.Label>
              <Form.Control
                type="text"
                {...register("datos.colonia")}
                isInvalid={!!errors.datos?.colonia}
              />
              <Form.Control.Feedback type="invalid">
                {errors.datos?.colonia?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Delegación/Alcaldía</Form.Label>
              <Form.Control
                type="text"
                {...register("datos.delegacion")}
                isInvalid={!!errors.datos?.delegacion}
              />
              <Form.Control.Feedback type="invalid">
                {errors.datos?.delegacion?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="text"
                {...register("datos.estado")}
                isInvalid={!!errors.datos?.estado}
              />
              <Form.Control.Feedback type="invalid">
                {errors.datos?.estado?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                type="text"
                {...register("datos.cp")}
                isInvalid={!!errors.datos?.cp}
              />
              <Form.Control.Feedback type="invalid">
                {errors.datos?.cp?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Foto</Form.Label>
              <div className="d-flex flex-column align-items-start">
                {imagen && (
                  <div className="mb-2">
                    <img
                      src={imagen}
                      alt="Preview"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                <Button
                  variant={imagen ? "outline-primary" : "primary"}
                  onClick={() => setShowWebcam(true)}
                >
                  {imagen ? "Tomar otra foto" : "Tomar foto"}
                </Button>
                {errors.datos?.imagen && (
                  <div className="text-danger mt-1">
                    {errors.datos.imagen.message}
                  </div>
                )}
              </div>
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="secondary" onClick={onHide} className="me-2">
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <WebcamCapture
        show={showWebcam}
        onHide={() => setShowWebcam(false)}
        onCapture={(image) => {
          setValue("datos.imagen", image);
          setShowWebcam(false);
        }}
      />
    </>
  );
};

export default UserEditModal;
