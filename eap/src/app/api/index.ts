import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://eap-back.krtic.com.br/',
})