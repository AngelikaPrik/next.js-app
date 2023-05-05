import { Customer } from '@/models'
import { API_URL } from '.'
import axios from 'axios'

interface Response<T> {
  data: T
  status: number
  headers: any
}

export async function getAllCustomers<T extends Customer>(): Promise<
  Response<T[]>
> {
  return await axios.get<T[]>(`${API_URL}/customers`)
}

export async function postCustomer(newCustomer: Customer) {
  return await axios.post(`${API_URL}/customers`, newCustomer)
}
