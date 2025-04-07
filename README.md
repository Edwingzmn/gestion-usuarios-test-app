# Prueba Técnica Web

Esta aplicación web fue desarrollada como parte de una prueba técnica. Tiene como objetivo permitir el **registro de usuarios con fotografía** y la **visualización de dichos registros** mediante una interfaz construida con ReactJS y Bootstrap, y consumiendo una API externa con Axios.

## Tecnologías utilizadas

- ReactJS (con Hooks)
- Bootstrap
- Axios
- JavaScript
- HTML5 & CSS3

---

## Características de la aplicación

### 1. Alta de usuario con fotografía

- Formulario con validaciones:
  - **Nombre, Apellido Paterno, Apellido Materno**: Solo letras, no vacíos.
  - **Correo electrónico**: Formato válido.
  - **Fecha de nacimiento**: Formato `AAAA-MM-DD`.
  - **Dirección**: Campos obligatorios y con tipos validados.
- Captura de fotografía desde la cámara:
  - Guía centrada para selfie.
  - Imagen recortada (300x300 px) desde el centro.
  - Convertida a PNG en base64 para el envío.
- Envío de datos a API:
  - Endpoint: `https://api.devdicio.net:8444/v1/sec_dev_interview`
  - Headers:
    ```json
    {
      "Content-Type": "application/json",
      "Host": "api.devdicio.net",
      "xc-token": "J38b4XQNLErVatKIh4oP1jw9e_wYWkS86Y04TMNP"
    }
    ```

### 2. Visualización de datos

- Tabla con los usuarios registrados.
- Información completa incluyendo la fotografía.
- Filtro de búsqueda por apellido paterno.

### 3. (Opcional) Edición de usuarios

- Permite modificar la información de usuarios registrados desde la interfaz.

---

## Diseño y estilo

- Diseño responsive adaptado a dispositivos móviles.
- Paleta de colores utilizada:
  - **Color de acento (botones):** `rgba(74,144,226,1)`
  - **Color de texto:** `rgba(74,74,74,1)`

---

## Requisitos técnicos cumplidos

- [x] React JS con Hooks (Usé Vite y TS)
- [x] Bootstrap integrado
- [x] Axios para consumo de Web Services
- [x] Subido a repositorio en GitHub
- [x] README con especificaciones del proyecto
- [x] Validaciones completas en formulario
- [x] Captura y recorte de fotografía
- [x] Visualización y filtrado de usuarios

---

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio

2. Instala las dependencias del proyecto:
   ```bash
   npm install

3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
