import { ICustomerRequest } from '@/models'

export const isDataComplete = (data: ICustomerRequest): boolean => {
  const customer = Object.keys(data).map(k => {
    const value = data[k as keyof typeof data]
    if (value === '' || value === null) return false
    else return true
  })

  const org = Object.keys(data.organization).map(k => {
    const item = data.organization
    if (item[k as keyof typeof item] === '') return false
    else return true
  })

  const bank = data.organization.bank_accounts.map(item =>
    Object.keys(item).map(key => {
      if (item[key as keyof typeof item] === '') return false
      else return true
    })
  )

  const emails = data.invoice_emails.map(val => {
    if (val === '') return false
    else return true
  })

  const isReadyToPost = [...customer, ...org, ...bank.flat(), ...emails].every(
    item => item === true
  )

  return isReadyToPost
}
