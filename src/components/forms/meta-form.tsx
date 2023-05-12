import { ChangeEvent } from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
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
import { InputField } from '../input-field'
import { setClientForm } from '@/store/slices/customerSlice'

type FormsType = Record<string, Record<string, string>>

const StyledCell = styled(TableCell)({
  border: '1px solid #e0e0e0',
})

export const MetaForm = () => {
  const [forms, setForms] = useState<FormsType>({})
  const { clientForm } = useAppSelector(state => state.customerSlice)
  const dispatch = useAppDispatch()

  const addKeyValue = () => {
    const newForm = { title: '', name: 'meta', helper_text: '' }
    const key_id = `${uuidv4()}`

    setForms(prev => ({ ...prev, [key_id]: newForm }))

    dispatch(
      setClientForm({
        ...clientForm,
        metadata: { ...clientForm.metadata, [key_id]: { key: '', value: '' } },
      })
    )
  }

  const removeKeyValue = (key: string) => {
    setForms(prev => {
      const newForm = { ...prev }
      delete newForm[key]
      return newForm
    })
  }

  const onChangeClient = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const { name, value } = e.target

    dispatch(
      setClientForm({
        ...clientForm,
        metadata: {
          ...clientForm.metadata,
          [key]: { ...clientForm.metadata[key], [name]: value },
        },
      })
    )
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
                  <InputField
                    title=''
                    name='key'
                    helperText=''
                    value={clientForm.metadata[key_id].key}
                    onChange={e => onChangeClient(e, key_id)}
                  />
                </StyledCell>
                <StyledCell>
                  <InputField
                    title=''
                    name='value'
                    helperText=''
                    value={clientForm.metadata[key_id].value}
                    onChange={e => onChangeClient(e, key_id)}
                  />
                </StyledCell>
                <StyledCell
                  onClick={() => removeKeyValue(key_id)}
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
          onClick={addKeyValue}
          sx={{ cursor: 'pointer', '& *:hover': { opacity: 0.6 } }}
        >
          <Typography variant='body1' color='primary'>
            Добавить еще ключ - значение
          </Typography>
        </Box>
      </Box>
    </>
  )
}

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
