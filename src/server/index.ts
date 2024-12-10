import type { FetchResponse } from '@/typings/server'

import request from './request'

export const get = (
  url: string,
  params?: ObjectType,
  axiosConfig?: FetchResponse.AxiosConfig,
) => {
  return request(
    {
      url,
      params,
      method: 'GET',
    },
    axiosConfig,
  )
}

export const post = (
  url: string,
  data?: ObjectType,
  axiosConfig?: FetchResponse.AxiosConfig,
) => {
  return request(
    {
      url,
      data,
      method: 'POST',
    },
    axiosConfig,
  )
}

export const upload = (
  url: string,
  data: ObjectType,
  axiosConfig?: FetchResponse.AxiosConfig,
) => {
  return request(
    {
      url,
      data,
      method: 'POST',
    },
    {
      ...axiosConfig,
      type: 'multipart/form-data',
    },
  )
}
