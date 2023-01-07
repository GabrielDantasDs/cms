const { CForm, CCol, CFormInput, CFormCheck, CButton, CFormSelect } = require('@coreui/react')
import { useFormik } from 'formik'
import { create } from 'src/cruds/customer'
import { useState } from 'react'
import { validate } from './utils/validation'
import { listUfs, formatInputCPFCNPJ, formatInputCEP, handlerCep } from 'src/utils'
import Swal from 'sweetalert2'
import { Navigate, useNavigate } from 'react-router-dom'

const NewCustomer = () => {
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      cus_name: '',
      cus_email: '',
      cus_documento: '',
      cus_address: '',
      cus_district: '',
      cus_number: '',
      cus_city: '',
      cus_phone: '',
      cus_zip_code: '',
    },
    validate: validate,
    onSubmit: (values) => {
      setValidated(true)
      create(values)
        .then((res) => {
          Swal.fire({
            title: 'Sucesso!',
            html: 'O usuário foi criado com sucesso.',
            icon: 'success',
            timer: 2000,
            didClose: () => {
              navigate('/dashboard')
            }
          })
          return
        })
        .catch((error) => {
          if (error.response.data.statusCode == 401) {
            setError('Credenciais inválidas.')
          }

          return
        })
    },
  })

  return (
    <>
    { success ??
      <Navigate to="/dashboard"/>
    }
      <CForm
        onSubmit={formik.handleSubmit}
        noValidate
        validated={validated}
        className="row g-3 needs-validation"
      >
        <CCol md={6}>
          <CFormInput
            name="cus_name"
            onChange={formik.handleChange}
            value={formik.values.cus_name}
            type="text"
            id="cus_name"
            label="Nome"
            required
            aria-describedby="cus_nameFeedback"
            feedbackInvalid="Por favor preencha um valor válido."
          />
        </CCol>

        <CCol md={6}>
          <CFormInput
            name="cus_email"
            onChange={formik.handleChange}
            value={formik.values.cus_email}
            type="email"
            id="cus_email"
            label="email"
            feedbackInvalid="Por favor preencha um valor válido."
            aria-describedby="cus_emailFeedback"
            required
          />
        </CCol>

        <CCol md={6}>
          <CFormInput
            name="cus_documento"
            onChange={(e) => formik.handleChange(formatInputCPFCNPJ(e))}
            value={formik.values.cus_documento}
            id="cus_documento"
            label="Documento (CPF/CNPJ)"
            feedbackInvalid="Por favor preencha um valor válido."
            aria-describedby="cus_documentoFeedback"
            required
          />
        </CCol>

        <CCol md={6}>
          <CFormInput
            name="cus_address"
            onChange={formik.handleChange}
            value={formik.values.cus_address}
            id="cus_address"
            label="Endereço"
            feedbackInvalid="Por favor preencha um valor válido."
            aria-describedby="cus_address Feedback"
            required
          />
        </CCol>

        <CCol md={2}>
          <CFormInput
            name="cus_zip_code"
            onChange={(e) => {
              handlerCep(
                e,
                'cus_city',
                'cus_district',
                'cus_address',
                'cus_state',
                formik.setFieldValue,
              )
              console.log(formik.values)
              formik.handleChange(formatInputCEP(e))
            }}
            value={formik.values.cus_zip_code}
            id="cus_zip_code"
            label="CEP"
            feedbackInvalid="Por favor preencha um valor válido."
            aria-describedby="cus_zip_codeFeedback"
            required
          />
        </CCol>

        <CCol md={6}>
          <CFormInput
            name="cus_district"
            onChange={formik.handleChange}
            value={formik.values.cus_district}
            id="cus_district"
            label="Bairro"
            feedbackInvalid="Por favor preencha um valor válido."
            aria-describedby="cus_districtFeedback"
            required
          />
        </CCol>

        <CCol md={4}>
          <CFormInput
            name="cus_number"
            onChange={formik.handleChange}
            value={formik.values.cus_number}
            id="cus_number"
            label="Número"
            feedbackInvalid="Por favor preencha um valor válido."
            aria-describedby="cus_numberFeedback"
            required
          />
        </CCol>

        <CCol md={6}>
          <CFormInput
            name="cus_city"
            onChange={formik.handleChange}
            value={formik.values.cus_city}
            id="cus_city"
            label="Cidade"
            feedbackInvalid="Por favor preencha um valor válido."
            aria-describedby="cus_cityFeedback"
            required
          />
        </CCol>

        <CCol md={6}>
          <CFormSelect
            name="cus_state"
            onChange={formik.handleChange}
            value={formik.values.cus_state}
            id="cus_state"
            label="UF"
            feedbackInvalid="Por favor preencha um valor válido."
            aria-describedby="cus_stateFeedback"
            required
          >
            {listUfs.map((uf, i) => {
              return <option value={uf.sigla}>{uf.nome}</option>
            })}
          </CFormSelect>
        </CCol>

        <CCol xs={12}>
          <CButton type="submit">Salvar</CButton>
        </CCol>
      </CForm>
    </>
  )
}

export default NewCustomer
