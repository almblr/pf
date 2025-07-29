// TODO: make it a repository
import getEnvVariable from "@/utils/getEnvVariable"

const apiUrl = getEnvVariable('VITE_API_URL')

export interface Api {
  post: (url: string, body?: any) => Promise<any>
}


const api = {
  post: async (url: string, body: any) => {
    const response = await fetch(`${apiUrl}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    return await response.json()
  }
}

export default api
