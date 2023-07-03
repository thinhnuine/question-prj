import axios, {AxiosInstance, AxiosRequestConfig} from "axios"
import Router from "next/router"

// NOTE : swagger gen and axios always on top, do not circle includes

const basePath = ""

const defaultConfig = {
  timeout: 10000,
  // withCredentials: true,
}

const hiddenMsgUrl = ["/email/check"].map((e: string) => `${basePath}${e}`)

const getErrorCode = (error: any) => error?.response?.data?.errors?.[0]?.code || error?.response?.status || ""

const getErrorMsg = (error: any) =>
  error?.response?.data?.errors?.[0]?.detail || error?.response?.statusText || error?.response?.status

// const addRequestInterceptors = (instance: AxiosInstance) => {
//   instance.interceptors.request.use(
//     async (config: AxiosRequestConfig<any>) => {
//       const accessToken = await (await Auth.currentSession()).getIdToken().getJwtToken()
//       config.headers['Authorization'] = `Bearer ${accessToken}`
//       return config
//     },
//     /* istanbul ignore next */
//     //TODO: cannot mock request error
//     (error: any) => {
//       console.error(getErrorMsg(error))
//       return Promise.reject(error)
//     }
//   )
// }

// let deletePromise = null
// const getDeletePromise = (instance: AxiosInstance) => {
//   if (!deletePromise) {
//     deletePromise = instance.delete(process.env.PATH_AUTH)
//     setTimeout(() => {
//       deletePromise = null
//     }, 500)
//   }
//   return deletePromise
// }
// const onDeleteToken = async (instance: AxiosInstance) => {
//   try {
//     await getDeletePromise(instance) // delete token
//   } catch (e2) {
//     console.error('Error on logout', e2)
//   } finally {
//     clearSessionCookie()
//     Router.reload()
//   }
// }

// let refreshPromise: Promise<{ data: Types.AuthType }> = null
// const getRefreshPromise = (instance: AxiosInstance) => {
//   if (!refreshPromise) {
//     const refreshToken = localStorage.getItem('refresh_token')
//     const instanceHeaders = instance.defaults.headers
//     const clientId = instanceHeaders.common['client_id']
//     const clientSecret = instanceHeaders.common['client_secret']
//     refreshPromise = instance.post(
//       process.env.PATH_AUTH,
//       clientId && clientSecret
//         ? {
//             grant_type: 'refresh_token',
//             refresh_token: refreshToken,
//             client_id: clientId,
//             client_secret: clientSecret,
//           }
//         : {
//             grant_type: 'refresh_token',
//             refresh_token: refreshToken,
//           }
//     )
//     setTimeout(() => {
//       refreshPromise = null
//     }, 500)
//   }
//   return refreshPromise.then((result) => {
//     setSessionCookie(result?.data)
//     return result
//   })
// }

// const addResponseInterceptors = (instance: AxiosInstance) => {
//   const interceptorId = instance.interceptors.response.use(
//     (response: any) => response,
//     async (error) => {
//       if (!isPath(error.config.url).startsWith(...hiddenMsgUrl)) {
//         // message.error(getErrorMsg(error))
//         console.error(getErrorMsg(error))
//       }
//       if (getErrorCode(error) !== 401) {
//         return Promise.reject(error)
//       }
//       instance.interceptors.response.eject(interceptorId)
//       localStorage.removeItem('csrfToken')
//       try {
//         // message.loading({ content: 'Refreshing token ...', key: 'refreshToken' })
//         await getRefreshPromise(instance) // refresh token
//         // message.success({ content: 'Refreshing token done', key: 'refreshToken' })
//         return instance.request(error.config) // resume api
//       } catch (e) {
//         // message.error({ content: 'Refreshing token fail, logout ...', key: 'refreshToken' })
//         console.error('Error on refresh token, going to logout', e)
//         onDeleteToken(instance)
//       } finally {
//         addResponseInterceptors(instance)
//         Router.reload()
//       }
//     }
//   )
// }

export const createApiPjc = (config: any = defaultConfig) => {
  const instance = axios.create(config)
  if (config?.client_id) instance.defaults.headers.common["client_id"] = config?.client_id
  if (config?.client_secret) instance.defaults.headers.common["client_secret"] = config?.client_secret
  // addRequestInterceptors(instance)
  // addResponseInterceptors(instance)
  return instance
}

/**
 * api with interceptors
 */
export const apiPjc = createApiPjc()

export const api = axios.create(defaultConfig)
