import Head from 'next/head'
import { Customer } from '@/models'

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
import { getAllCustomers } from '@/service/customer-service'
import Modal from '@/components/modal'

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Имя', width: 200 },
  {
    field: 'id',
    headerName: 'ID',
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
          rows={customers}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          hideFooterPagination
          hideFooter
        />
        <Modal />
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
