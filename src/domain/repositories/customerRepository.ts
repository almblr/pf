import type { Api } from "@/infrastructure/services/api"
import type { ApiSuccessResponse } from '@/types/ApiSuccessResponse'
import type { ApiErrorResponse } from '@/types/ApiErrorResponse'

const customerRepository = (api: Api) => {

  const sendEmail = async (name: string, email: string, message: string): Promise<ApiSuccessResponse | ApiErrorResponse> => {
    return await api.post('emai/send/', { name, email, message })
  }

  return {
    sendEmail
  }
}

export default customerRepository
