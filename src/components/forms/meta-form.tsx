import { ChangeEvent } from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  Typography,
  Box,
  Stack,
} from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { InputForm } from '../input-form'
import { observer } from 'mobx-react-lite'
import { customersStore } from '@/store'

type FormsType = Record<string, Record<string, string>>

const StyledCell = styled(TableCell)({
  border: '1px solid #e0e0e0',
})

export const MetaForm = observer(() => {
  const [forms, setForms] = useState<FormsType>({})
  const { metadata } = customersStore.customerData

  const addMeta = () => {
    const newForm = { title: '', name: 'meta', helper_text: '' }
    const key = `${uuidv4()}`

    setForms(prev => ({ ...prev, [key]: newForm }))
    customersStore.setMetaKey(key, '', '')
  }

  const removeMeta = (key: string) => {
    setForms(prev => {
      const newForm = { ...prev }
      delete newForm[key]
      return newForm
    })

    customersStore.removeMetaKey(key)
  }

  const onChangeClient = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const { name, value } = e.target
    customersStore.setMetaKey(key, name, value)
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 300 }} aria-label='simple table'>
          <TableHead sx={{ bgcolor: '#fafafa', border: '1px solid #e0e0e0' }}>
            <TableRow>
              <StyledCell>Ключ</StyledCell>
              <StyledCell>Значение</StyledCell>
              <StyledCell></StyledCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(forms).map(key_id => (
              <TableRow key={key_id}>
                <StyledCell>
                  <InputForm
                    title=''
                    name='key'
                    helperText=''
                    value={metadata[key_id].key}
                    onChange={e => onChangeClient(e, key_id)}
                  />
                </StyledCell>
                <StyledCell>
                  <InputForm
                    title=''
                    name='value'
                    helperText=''
                    value={metadata[key_id].value}
                    onChange={e => onChangeClient(e, key_id)}
                  />
                </StyledCell>
                <StyledCell
                  onClick={() => removeMeta(key_id)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#d32f2f29' },
                  }}
                >
                  <CloseIcon color='error' />
                </StyledCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!Object.keys(forms).length && <EmptyInfo />}
      </TableContainer>
      <Box display='flex' justifyContent='end' pt={1}>
        <Box
          onClick={addMeta}
          sx={{ cursor: 'pointer', '& *:hover': { opacity: 0.6 } }}
        >
          <Typography variant='body1' color='primary'>
            Добавить еще ключ - значение
          </Typography>
        </Box>
      </Box>
    </>
  )
})

const EmptyInfo = () => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      border='1px solid #e0e0e0'
      p={3}
    >
      <Stack alignItems='center'>
        <InboxIcon />
        <Typography variant='body1' color='initial'>
          No data
        </Typography>
      </Stack>
    </Box>
  )
}
