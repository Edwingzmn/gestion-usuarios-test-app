export async function checkCameraPermissions(): Promise<boolean> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach(track => track.stop()); // Detener el stream después de verificar
    return true;
    return status === "granted";
  } catch (error) {
    console.error("Error al acceder a la cámara:", error);
    return false;
  }
}
