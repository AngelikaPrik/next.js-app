import { ChangeEvent, useState } from 'react'
import StyledButton from '../styled-button'
import { Box, Switch, Typography } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { InputField } from '../input-field'
import { createForm } from './utils'
import { observer } from 'mobx-react-lite'
import { customersStore } from '@/store'

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

export const BankForm = observer(() => {
  const { bank_accounts } = customersStore.customerData
  const [forms, setForms] = useState<FormsType>(initialForms)

  const onChangeClient = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    const { name, value } = e.target
    customersStore.setBankAccountsKey(key, name, value)
  }

  const addBankAccount = () => {
    const key = `${uuidv4()}`
    const newForm = [...initialForms.main]

    setForms(prev => ({ ...prev, [key]: newForm }))
    customersStore.setBankAccountsKey(key, '', '')
  }

  const removeBankAccount = (key: string) => {
    setForms(prev => {
      const newForm = { ...prev }
      delete newForm[key]
      return newForm
    })
    customersStore.removeBankAccountKey(key)
  }

  const setDefaultAccount = (key: string) => {
    customersStore.setBankAccountsKey(key, 'is_default', '')
    customersStore.setDefaultAccountForAll(key)
  }
  console.log(bank_accounts)

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
                    value={bank_accounts[key][name]}
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
                checked={bank_accounts[key].is_default as boolean | undefined}
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
})
