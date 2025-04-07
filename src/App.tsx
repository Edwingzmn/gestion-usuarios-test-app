import { useState, useRef } from 'react'
import { Container, Nav, Navbar, Tab, Tabs, ToastContainer, Toast } from 'react-bootstrap'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [activeTab, setActiveTab] = useState('register')
  const [refreshList, setRefreshList] = useState(false)
  const [toast, setToast] = useState<{ show: boolean; message: string; variant: 'success' | 'danger' }>({
    show: false,
    message: '',
    variant: 'success',
  })

  const showToast = (message: string, variant: 'success' | 'danger' = 'success') => {
    setToast({ show: true, message, variant })
    setTimeout(() => setToast({ show: false, message: '', variant }), 5000) // Auto-close after 5s
  }

  const handleUserCreated = () => {
    setRefreshList(prev => !prev)
    setActiveTab('list')
    showToast('Usuario creado exitosamente!', 'success') // Mostrar toast al crear usuario
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Gestión de Usuarios</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link active={activeTab === 'register'} onClick={() => setActiveTab('register')}>
                Registrar Usuario
              </Nav.Link>
              <Nav.Link active={activeTab === 'list'} onClick={() => setActiveTab('list')}>
                Ver Usuarios
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || 'register')}
          className="mb-3"
        >
          <Tab eventKey="register" title="Registrar Usuario">
            <UserForm 
              onUserCreated={handleUserCreated} 
              showToast={showToast}
            />
          </Tab>
          <Tab eventKey="list" title="Ver Usuarios">
            <UserList 
            refresh={refreshList}
            showToast={showToast} />
          </Tab>
        </Tabs>
      </Container>

      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast 
          show={toast.show} 
          onClose={() => setToast({ ...toast, show: false })}
          bg={toast.variant}
          autohide
          delay={5000}
        >
          <Toast.Header closeButton>
            <strong className="me-auto">
              {toast.variant === 'success' ? 'Éxito' : 'Error'}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

export default App