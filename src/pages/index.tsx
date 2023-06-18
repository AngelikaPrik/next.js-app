import Head from 'next/head'
import { ICustomer } from '@/models'
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
import { Modal } from '@/components/modal'
import StyledAccordions from '@/components/accordion'
import { observer } from 'mobx-react-lite'
import { modalStore, customersStore } from '@/store'
import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { isDataComplete } from '@/utils/isDataComplete'

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
  customers: ICustomer[]
}

const Home = observer(({ customers }: PropsType) => {
  const { filteredCustomers } = customersStore
  const [notifyMessage, setNotifyMessage] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const filteredClients = useMemo(() => {
    return customers
      .filter(({ name }) => name.toLowerCase().includes(filteredCustomers))
      .map(item => item)
  }, [customers, filteredCustomers])

  const refreshData = () => router.replace(router.asPath)

  const postCustomerData = async () => {
    if (true) {
      setIsLoading(true)
      try {
        const { status } = await postCustomer(
          customersStore.convertCustomerData
        )
        if (status === 201) {
          setIsLoading(false)
          refreshData()
          modalStore.closeModal()
          customersStore.setInitialData()
        }
      } catch (error) {
        console.error('An error occurred while posting customer data:', error)
      } finally {
        setIsLoading(false)
      }
    } else {
      setNotifyMessage(true)
    }
  }

  useEffect(() => {
    if (notifyMessage) {
      setTimeout(() => setNotifyMessage(false), 2000)
    }
  }, [notifyMessage])

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
          hideFooterPagination
          hideFooter
        />
        <Modal
          title='Создание клиента'
          textButton='Создать'
          onClick={postCustomerData}
          notify={notifyMessage}
          isLoading={isLoading}
        >
          <StyledAccordions />
        </Modal>
      </Layout>
    </>
  )
})

export async function getServerSideProps() {
  const response = await getAllCustomers()
  const customers = response.data

  return {
    props: {
      customers,
    },
  }
}

export default Home
