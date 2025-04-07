export interface User {
  id?: number; // Opcional porque es readonly en la API
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  edad?: number;  // Opcional porque se calcula a partir de fechaNac
  email: string;
  fechaNac: string; 
  datos: { 
    calle: string; 
    numero: string;
    colonia: string; 
    delegacion: string; 
    estado: string; 
    cp: string;
    codigoPostal?: number; 
    imagen?: string;
  };
}