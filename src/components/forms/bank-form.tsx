import { ChangeEvent, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import {
  setClientForm,
  setDefaultAccountForAll,
} from '@/store/slices/customerSlice'
import StyledButton from '../styled-button'
import { Box, Switch, Typography } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { InputField } from '../input-field'
import { createForm } from './utils'

type FormsType = Record<string, Record<string, string>[]>

const initialForms: FormsType = {
  main: [
    createForm('Название счета', 'name', 'Введите название счета'),
    createForm('Номер счета', 'account_number', 'Введите номер счета'),
    createForm('БИК счета', 'bik', 'Введите БИК счета'),
    createForm(
      'Корр. номер счета',
      'corr_account_number',
      'Введите корр. номер счета'
    ),
  ],
}

export const BankForm = () => {
  const [forms, setForms] = useState<FormsType>(initialForms)
  const { clientForm } = useAppSelector(state => state.customerSlice)
  const dispatch = useAppDispatch()

  const onChangeClient = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const { name, value } = e.target

    dispatch(
      setClientForm({
        ...clientForm,
        bank_accounts: {
          ...clientForm.bank_accounts,
          [key]: { ...clientForm.bank_accounts[key], [name]: value },
        },
      })
    )
  }

  const addBankAccount = () => {
    const key = `${uuidv4()}`
    const newForm = [...initialForms.main]
    const valueForm = {
      name: '',
      bik: '',
      account_number: '',
      corr_account_number: '',
      is_default: false,
    }

    setForms(prev => ({ ...prev, [key]: newForm }))
    dispatch(
      setClientForm({
        ...clientForm,
        bank_accounts: {
          ...clientForm.bank_accounts,
          [key]: valueForm,
        },
      })
    )
  }

  const removeBankAccount = (key: string) => {
    setForms(prev => {
      const newForm = { ...prev }
      delete newForm[key]
      return newForm
    })
  }

  const setDefaultAccount = (key: string) => {
    dispatch(
      setClientForm({
        ...clientForm,
        bank_accounts: {
          ...clientForm.bank_accounts,
          [key]: {
            ...clientForm.bank_accounts[key],
            is_default: !clientForm.bank_accounts[key].is_default,
          },
        },
      })
    )
    dispatch(setDefaultAccountForAll(key))
  }

  return (
    <>
      {Object.keys(forms).map(key => {
        return (
          <Box key={key} sx={{ borderBottom: '1px solid #ccc' }}>
            <Box
              display='flex'
              alignItems='start'
              justifyContent='space-between'
            >
              <Box width='55%' mb={1}>
                {forms[key].map(({ title, name }, i) => (
                  <InputField
                    key={i}
                    title={title}
                    name={name}
                    value={clientForm.bank_accounts[key][name]}
                    onChange={e => onChangeClient(e, key)}
                  />
                ))}
              </Box>
              {key !== 'main' && (
                <Box mt='16px' width='40%'>
                  <StyledButton
                    onClick={() => removeBankAccount(key)}
                    opacityButton
                  >
                    <Typography
                      variant='body1'
                      color='error'
                      textTransform='initial'
                    >
                      - Удалить счет
                    </Typography>
                  </StyledButton>
                </Box>
              )}
            </Box>
            <Box>
              <Typography ml={1} variant='body1'>
                Дефолтный счет
              </Typography>
              <Switch
                checked={
                  clientForm.bank_accounts[key].is_default as
                    | boolean
                    | undefined
                }
                onClick={() => setDefaultAccount(key)}
              />
            </Box>
          </Box>
        )
      })}

      <StyledButton opacityButton onClick={addBankAccount}>
        + Добавить еще счет
      </StyledButton>
    </>
  )
}
