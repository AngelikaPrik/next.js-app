import { ChangeEvent, useState } from 'react'
import StyledButton from '../styled-button'
import { Box, Typography } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { InputForm } from '../input-form'
import { createForm } from './utils'
import { observer } from 'mobx-react-lite'
import { customersStore } from '@/store'

type FormsType = Record<string, Record<string, string>>

const initialForms: FormsType = {
  main: createForm('Email', 'invoice_emails', 'Введите email'),
}

export const EmailsForm = observer(() => {
  const { invoice_emails } = customersStore.customerData
  const [forms, setForms] = useState<FormsType>(initialForms)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const onChangeClient = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const { value } = e.target
    customersStore.setEmailsKey(key, value)

    if (!value) {
      setErrors(prevErrors => ({ ...prevErrors, [key]: true }))
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [key]: false }))
    }
  }

  const addEmail = () => {
    const key = `${uuidv4()}`
    const newForm = { ...initialForms.main }
    setForms(prev => ({ ...prev, [key]: newForm }))
    customersStore.setEmailsKey(key, '')
  }

  const removeEmail = (key: string) => {
    setForms(prev => {
      const newForm = { ...prev }
      delete newForm[key]
      return newForm
    })
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[key]
      return newErrors
    })
    customersStore.removeEmailKey(key)
  }
  return (
    <>
      {Object.keys(forms).map(key => {
        const { title, name, helper_text } = forms[key]
        return (
          <Box
            key={key}
            display='flex'
            alignItems='start'
            justifyContent='space-between'
            sx={{ borderBottom: '1px solid #ccc' }}
          >
            <Box width='55%' mb={1}>
              <InputForm
                title={title}
                name={name}
                value={invoice_emails[key]}
                onChange={e => onChangeClient(e, key)}
                helperText={errors[key] ? helper_text : ''}
                error={errors[key]}
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
})
