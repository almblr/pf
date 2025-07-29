import customerRepository from '@/domain/repositories/customerRepository'
import Api from '@/infrastructure/services/api'

export default function useContact() {
  const api = Api
  return customerRepository(api)
}
