import React from 'react'
import { Link, Route, useNavigate } from 'react-router-dom'
import validate from './LoginUtils'
import { useState, useHis } from 'react'
import { login } from 'src/cruds/auth'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useFormik } from 'formik'
import ErrorMessage from 'src/views/components/login/ErrorMessage'
import Swal from 'sweetalert2'

function Login() {
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      setValidated(true)
      login(values)
        .then((res) => {
          localStorage.setItem('access_token', res.data.access_token)
          navigate('/dashboard')
        })
        .catch((error) => {
          if (error.response.data.statusCode == 400) {
            setError('Formato do email ou senha inválido.')
          }

          if (error.response.data.statusCode == 401) {
            setError('Credenciais inválidas.')
          }

          return
        })
    },
  })
  
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    onSubmit={formik.handleSubmit}
                    className={'needs-validation'}
                    noValidate
                    validated={validated}
                  >
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    {error && <ErrorMessage error={error}></ErrorMessage>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        required
                      />
                      {/* {formik.errors.email ? <div>{formik.errors.email}</div> : null} */}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required
                      />
                      {/* {formik.errors.password ? <div>{formik.errors.password}</div> : null} */}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
