import { CustomerRequest, ListCustomersResponse } from '@/models'
import { API_URL } from '.'
import axios from 'axios'

interface Response<T> {
  data: T
  status: number
  headers: any
}

export async function getAllCustomers<
  T extends ListCustomersResponse
>(): Promise<Response<T>> {
  return await axios.get<T>(`${API_URL}/customers`)
}

export async function postCustomer(newCustomer: CustomerRequest) {
  return await axios.post(`${API_URL}/customers`, newCustomer)
}
