import Head from 'next/head'
import { Customer, CustomerRequest } from '@/models'

import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridRenderCellParams,
} from '@mui/x-data-grid'
import moment from 'moment'

import FileCopyIcon from '@mui/icons-material/FileCopy'
import { IconButton } from '@mui/material'
import Layout from '@/components/layout'
import { getAllCustomers, postCustomer } from '@/service/customer-service'
import Modal from '@/components/modal'

import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import StyledAccordions from '@/components/accordion'
import { setModal } from '@/store/slices/modalSlice'

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Имя', type: 'string', width: 220 },
  {
    field: 'id',
    headerName: 'ID',
    type: 'string',
    width: 250,
    renderCell: (params: GridRenderCellParams) => (
      <>
        <span>{params.row.id}</span>
        <IconButton
          size='small'
          sx={{ ml: '2rem' }}
          onClick={() => navigator.clipboard.writeText(params.row.id)}
        >
          <FileCopyIcon fontSize='small' />
        </IconButton>
      </>
    ),
  },
  { field: 'email', headerName: 'Email', width: 200 },
  {
    field: 'deferral_days',
    headerName: 'Отсрочка оплаты',
    type: 'string',
    width: 180,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.deferral_days} дней`,
  },
  {
    field: 'created_at',
    headerName: 'Создан',
    type: 'string',
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.row.created_at).format('DD.MM.YYYY')}`,
  },
  {
    field: 'updated_at',
    headerName: 'Изменен',
    type: 'string',
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params.row.updated_at).format('DD.MM.YYYY')}`,
  },
]

interface PropsType {
  customers: Customer[]
}

export default function Home({ customers }: PropsType) {
  const { filteredData, clientForm } = useAppSelector(
    state => state.customerSlice
  )
  const dispatch = useAppDispatch()

  const filteredClients = useMemo(() => {
    return customers
      .filter(({ name }) =>
        name.toLowerCase().includes(filteredData.toLowerCase())
      )
      .map(item => item)
  }, [customers, filteredData])

  const convertClientToRequest = (): CustomerRequest => {
    const {
      customer,
      organization,
      bank_accounts,
      metadata,
      invoice_emails,
      invoice_prefix,
    } = clientForm

    const customerRequest: CustomerRequest = {
      name: customer.name,
      email: customer.email,
      deferral_days: customer.deferral_days,
      credit_limit: customer.credit_limit,
      organization: {
        name: organization.name,
        inn: organization.inn,
        kpp: organization.kpp,
        ogrn: organization.ogrn,
        addr: organization.addr,
        bank_accounts: Object.keys(bank_accounts).map(key => {
          const account = bank_accounts[key]
          return {
            name: account.name,
            bik: account.bik,
            account_number: account.account_number,
            corr_account_number: account.corr_account_number,
            is_default: account.is_default,
          }
        }),
      },
      metadata,
      invoice_emails: Object.values(invoice_emails),
      invoice_prefix,
    }

    return customerRequest
  }

  const postCustomerData = () => {
    postCustomer(convertClientToRequest())
    dispatch(setModal(false))
  }

  return (
    <>
      <Head>
        <title>Test app clients</title>
        <meta name='description' content='Test app clients' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <DataGrid
          rows={filteredClients}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          hideFooterPagination
          hideFooter
        />
        <Modal
          title='Создание клиента'
          textButton='Создать'
          onClick={postCustomerData}
        >
          <StyledAccordions />
        </Modal>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  const response = await getAllCustomers()
  const customers = response.data

  return {
    props: {
      customers,
    },
  }
}
