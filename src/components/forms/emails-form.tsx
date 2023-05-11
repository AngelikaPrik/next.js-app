import { ChangeEvent, useState } from 'react'

import { formContent } from '@/constants'
import { InputField } from '../accordion'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setClientForm } from '@/store/slices/customerSlice'
import StyledButton from '../styled-button'
import { Box, Typography } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

const initialState = { ...formContent.emails.forms }

export default function EmailsForm() {
  const [forms, setForms] = useState(initialState)
  const { clientForm } = useAppSelector(state => state.customerSlice)
  const dispatch = useAppDispatch()

  const onChangeClient = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const { name, value } = e.target

    dispatch(
      setClientForm({
        ...clientForm,
        invoice_emails: { ...clientForm.invoice_emails, [key]: value },
      })
    )
  }

  const addEmail = () => {
    const key = `${uuidv4()}`
    const newForm = { ...formContent.emails.forms.main }
    setForms(prev => ({ ...prev, [key]: newForm }))
    dispatch(
      setClientForm({
        ...clientForm,
        invoice_emails: { ...clientForm.invoice_emails, [key]: '' },
      })
    )
  }

  const removeEmail = (key: string) => {
    setForms(prev => {
      const newForm = { ...prev }
      delete newForm[key]
      return newForm
    })
  }
  return (
    <>
      {Object.keys(forms).map(key => {
        const { title, name } = forms[key]
        return (
          <Box
            key={key}
            display='flex'
            alignItems='start'
            justifyContent='space-between'
            sx={{ borderBottom: '1px solid #ccc' }}
          >
            <Box width='55%' mb={1}>
              <InputField
                title={title}
                name={name}
                value={clientForm.invoice_emails[key]}
                onChange={e => onChangeClient(e, key)}
              />
            </Box>
            {key !== 'main' && (
              <Box mt='16px' width='40%'>
                <StyledButton onClick={() => removeEmail(key)} opacityButton>
                  <Typography textTransform='initial' color='error'>
                    - Удалить email
                  </Typography>
                </StyledButton>
              </Box>
            )}
          </Box>
        )
      })}
      <StyledButton opacityButton onClick={addEmail}>
        + Добавить еще email
      </StyledButton>
    </>
  )
}
