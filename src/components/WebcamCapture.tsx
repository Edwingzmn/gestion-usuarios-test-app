import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { Button, Modal, Row, Col } from 'react-bootstrap'
import { Cropper, ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'

interface WebcamCaptureProps {
  onCapture: (imageSrc: string) => void
  show: boolean
  onHide: () => void
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, show, onHide }) => {
  const webcamRef = useRef<Webcam>(null)
  const cropperRef = useRef<ReactCropperElement>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [mode, setMode] = useState<'capture' | 'crop'>('capture')

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        setCapturedImage(imageSrc)
        setMode('crop')
      }
    }
  }, [webcamRef])

  const handleAutoCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper
      const canvas = cropper.getCroppedCanvas({
        width: 300,
        height: 300,
        minWidth: 300,
        minHeight: 300,
        maxWidth: 300,
        maxHeight: 300,
        fillColor: '#fff',
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
      })
      
      const croppedImage = canvas.toDataURL('image/png')
      onCapture(croppedImage)
      onHide()
    }
  }

  const handleManualCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper
      const canvas = cropper.getCroppedCanvas()
      
      // Convertir a 300x300 manteniendo relación de aspecto
      const resizedCanvas = document.createElement('canvas')
      resizedCanvas.width = 300
      resizedCanvas.height = 300
      const ctx = resizedCanvas.getContext('2d')
      
      if (ctx) {
        // Rellenar fondo blanco
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, 300, 300)
        
        // Dibujar imagen centrada
        const ratio = Math.min(300 / canvas.width, 300 / canvas.height)
        const newWidth = canvas.width * ratio
        const newHeight = canvas.height * ratio
        const x = (300 - newWidth) / 2
        const y = (300 - newHeight) / 2
        
        ctx.drawImage(canvas, x, y, newWidth, newHeight)
        const finalImage = resizedCanvas.toDataURL('image/png')
        onCapture(finalImage)
        onHide()
      }
    }
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'capture' ? 'Tomar una foto' : 'Recortar Foto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mode === 'capture' ? (
          <div className="text-center">
            <div className="webcam-container" style={{ position: 'relative' }}>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                videoConstraints={{ facingMode: 'user' }}
                style={{ width: '100%' }}
              />
              <div className="face-guide" />
            </div>
            <Button variant="primary" onClick={capture} className="mt-3">
              Capturar Foto
            </Button>
          </div>
        ) : (
          <div>
            <Row>
              <Col md={8}>
                {capturedImage && (
                  <Cropper
                    src={capturedImage}
                    style={{ height: 400, width: '100%' }}
                    initialAspectRatio={1}
                    guides={true}
                    ref={cropperRef}
                    viewMode={1}
                    minCropBoxWidth={100}
                    minCropBoxHeight={100}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                  />
                )}
              </Col>
              <Col md={4}>
                <div className="d-flex flex-column h-100 justify-content-center">
                    <h5>Opciones de Recorte</h5>
                  <Button 
                    variant="primary" 
                    onClick={handleAutoCrop}
                    className="mb-2"
                  >
                    Auto Recorte (300x300)
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={handleManualCrop}
                    className="mb-2"
                  >
                    Recorte Manual
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    onClick={() => setMode('capture')}
                  >
                    Volver a Capturar
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal.Body>
    </Modal>
  )
}

export default WebcamCapture