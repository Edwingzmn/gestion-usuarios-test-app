import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Card } from "react-bootstrap";
import { userSchema } from "../utils/validationSchema";
import WebcamCapture from "./WebcamCapture";
import { useApi } from "../hooks/useApi";
import { User } from "../types/userTypes";
import { checkCameraPermissions } from "../utils/cameraPermissions";

interface UserFormProps {
  onUserCreated: () => void;
  showToast: (message: string, variant?: "success" | "danger") => void;
}

const UserForm: React.FC<UserFormProps> = ({ onUserCreated, showToast }) => {
  const { createUser } = useApi();
  const [showWebcam, setShowWebcam] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<User>({
    resolver: yupResolver(userSchema),
    defaultValues: {} as User,
  });

  const photoValue = watch("datos.imagen");

  const onSubmit = async (data: User) => {
    try {
      if (!data.datos?.imagen) {
        showToast("La foto es obligatoria.", "danger");
        return;
      }

      await createUser(data);
      showToast("Usuario creado exitosamente!", "success");
      reset();
      onUserCreated();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message || "Error al crear usuario."
          : "Error al crear usuario.";
      showToast(errorMessage, "danger");
    }
  };

  const handlePhotoCapture = (imageSrc: string) => {
    setValue("datos.imagen", imageSrc);
    setShowWebcam(false);
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setValue("datos.imagen", reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  useEffect(() => {
    async function checkPermissions() {
      const permissionGranted = await checkCameraPermissions();
      if (!permissionGranted) {
        showToast(
          "Permiso de cámara denegado. No podrás usar la cámara.",
          "danger"
        );
      }
      checkPermissions();
    }
  }, []);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Registrar Nuevo Usuario</Card.Title>

        <Form onSubmit={handleSubmit(onSubmit)}>
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
            <Form.Label>Correo Electrónico</Form.Label>
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

          <Card className="mb-3">
            <Card.Header>Información de Dirección</Card.Header>
            <Card.Body>
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
                <Form.Label>Alcaldía</Form.Label>
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
            </Card.Body>
          </Card>

           <Form.Group className="mb-3">
            <Form.Label>Foto</Form.Label>
            <div className="d-flex flex-column align-items-start">
              {photoValue && (
                <div className="mb-2">
                  <img 
                    src={photoValue.includes('data:image') ? photoValue : `data:image/png;base64,${photoValue}`} 
                    alt="Vista previa" 
                    style={{ 
                      width: '150px', 
                      height: '150px', 
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }} 
                  />
                </div>
              )}
              <Button 
                variant={photoValue ? 'outline-primary' : 'primary'} 
                onClick={() => setShowWebcam(true)}
                style={{ marginBottom: '0.5rem' }}
              >
                {photoValue ? 'Tomar otra foto' : 'Tomar foto'}
              </Button>
              {errors.datos?.imagen && (
                <div className="text-danger mt-1">{errors.datos.imagen.message}</div>
              )}
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Subir imagen</Form.Label>
            <div className="d-flex flex-column align-items-start">
              <Form.Control
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                isInvalid={!!errors.datos?.imagen}
                className="d-none"
              />
              <Button
                variant={photoValue ? "outline-primary" : "primary"}
                onClick={() => setShowWebcam(true)}
                style={{ marginBottom: "0.5rem" }}
              >
                Seleccionar archivo de imagen
              </Button>
              {errors.datos?.imagen && (
                <div className="text-danger mt-1">
                  {errors.datos.imagen.message}
                </div>
              )}
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Registrar Usuario
          </Button>
        </Form>
      </Card.Body>

      <WebcamCapture
        show={showWebcam}
        onHide={() => setShowWebcam(false)}
        onCapture={handlePhotoCapture}
      />
    </Card>
  );
};

export default UserForm;
