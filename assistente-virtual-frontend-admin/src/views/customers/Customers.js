import { CFormInput, CSpinner } from '@coreui/react'
import { list, get } from '../../cruds/customer'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
import { Column } from 'primereact/column'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCustomers, setSelectedCustomers] = useState(null)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [customer, setCustomer] = useState(null)
  const dt = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    list()
      .catch((error) => {
        Swal.fire('Ops', 'Houve um erro ao carregar os clientes.', 'error')
        return
      })
      .then((response) => {
        console.log(response)
        setCustomers(response.data)
      })
      .finally(() => setLoading(false))
  }, [])

  const editCustomer = (rowData) => {
    navigate('/customers/' + rowData.id)
  }

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Gerenciar clientes</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <CFormInput
          type="text"
          id="globalFilter"
          onChange={(e) => {
            setGlobalFilter(e.target.value)
          }}
          label="Pesquisar"
          aria-describedby="exampleFormControlInputHelpInline"
        />
      </span>
      <span className="p-input-icon-right">
        <Button variant="success">Novo</Button>
      </span>
    </div>
  )

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="d-flex justify-content-between">
        <Button variant="primary" onClick={() => editCustomer(rowData)}>
          Editar
        </Button>
        <Button variant="danger" onClick={() => confirmDeleteCustomer(rowData)}>
          Excluir
        </Button>
      </div>
    )
  }

  return (
    <>
      {loading ? (
        <CSpinner></CSpinner>
      ) : (
        <DataTable
          ref={dt}
          value={customers}
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: '3rem' }}
            exportable={false}
          ></Column>
          <Column field="id" header="id" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="cus_name" header="Nome" sortable style={{ minWidth: '16rem' }}></Column>
          <Column field="cus_documento" header="Documento"></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: '8rem' }}
          ></Column>
        </DataTable>
      )}
    </>
  )
}

export default Customers
