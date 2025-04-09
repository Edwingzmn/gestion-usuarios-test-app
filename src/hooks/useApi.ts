import axios from "axios";
import { User } from "../types/userTypes";

const API_URL = "https://api.devdicio.net:8444/v1/sec_dev_interview";
const API_HEADERS = {
  "Content-Type": "application/json",
  "xc-token": "J38b4XQNLErVatKIh4oP1jw9e_wYWkS86Y04TMNP",
};

export const useApi = () => {
  const createUser = async (userData: User) => {
    console.log("Datos del formulario:", userData);
    try {
      // Validar que la imagen existe
      if (!userData.datos?.imagen) {
        throw new Error("La foto es requerida");
      }

      const edad = userData.fechaNac
        ? new Date().getFullYear() - new Date(userData.fechaNac).getFullYear()
        : undefined;

      // Preparar los datos para la API
      const dataParaApi = {
        nombre: userData.nombre,
        apellidoPaterno: userData.apellidoPaterno,
        apellidoMaterno: userData.apellidoMaterno,
        edad: edad,
        email: userData.email,
        fechaNac: userData.fechaNac,
        datos: JSON.stringify({
          calle: userData.datos.calle,
          numero: userData.datos.numero,
          colonia: userData.datos.colonia,
          delegacion: userData.datos.delegacion,
          estado: userData.datos.estado,
          imagen: userData.datos.imagen,
          cp: userData.datos.cp,
          codigoPostal: parseInt(userData.datos.cp),
        }),
      };

      const response = await axios.post(API_URL, dataParaApi, {
        headers: API_HEADERS,
      });
      return response.data;
    } catch (error) {
      console.log("Datos del formulario:", userData);
      console.error("Error al crear usuario:", error);
      throw error;
    }
  };

  const getUsers = async (
    page: number = 1,
    limit: number = 20,
    searchTerm: string = ""
) => {
    try {
        let whereClause = undefined;
        if (searchTerm) {
        // Código anterior
        //   whereClause = JSON.stringify({
        //     apellidoPaterno: {
        //         $iLike: `%${searchTerm}%`
        //     }
        // });
        // console.log("Cláusula Where:", whereClause);
        // Código nuevo corregido
          whereClause = `(apellidoPaterno,like,%${searchTerm}%)`;
          console.log("Cláusula Where:", whereClause);
        }

        const response = await axios.get(API_URL, {
            headers: API_HEADERS,
            params: {
                offset: (page - 1) * limit,
                limit,
                where: whereClause,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
};

  const updateUser = async (id: number, userData: User) => {
    try {
      const edad = userData.fechaNac
        ? new Date().getFullYear() - new Date(userData.fechaNac).getFullYear()
        : undefined;

      // Se prepara el objeto datos como objeto normal
      const datosObj = {
        calle: userData.datos.calle,
        numero: userData.datos.numero,
        colonia: userData.datos.colonia,
        delegacion: userData.datos.delegacion,
        estado: userData.datos.estado,
        imagen: userData.datos.imagen,
        cp: userData.datos.cp,
        codigoPostal: parseInt(userData.datos.cp),
      };

      // Crea el payload completo
      const dataUpdate = {
        nombre: userData.nombre,
        apellidoPaterno: userData.apellidoPaterno,
        apellidoMaterno: userData.apellidoMaterno,
        edad: edad,
        email: userData.email,
        fechaNac: userData.fechaNac,
        datos: datosObj, // Envía como objeto, no como string
      };

      const response = await axios.patch(`${API_URL}/${id}`, dataUpdate, {
        headers: API_HEADERS,
      });
      return response.data;
    } catch (error) {
      console.log("Datos del formulario (update):", userData);
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  };

  return { createUser, getUsers, updateUser };
};
