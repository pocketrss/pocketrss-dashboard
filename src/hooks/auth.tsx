import ky from 'ky'
import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query'
import { createStandaloneToast } from '@chakra-ui/toast'

const { toast } = createStandaloneToast()

import { CodeResponseProps, Dict, useSigninOptions, useVerifyOptions, VerifyProps } from '@/types'

// const fetchVerify = async (token: string) => {
//   const resp = await ky.get('/api/v1/accounts/verify_credentials', { headers: { Authorization: `Bearer ${token}` } })
//   // if (resp.status === 200) {
//   //   throw new Error('Illegal argument')
//   // }
//   return (await resp?.json()) ?? {}
// }
const fetchVerify = async (token: string) => {
  let result = {}
  try {
    const resp = await ky.get('/api/v1/accounts/verify_credentials', { headers: { Authorization: `Bearer ${token}` } })
    result = await resp.json()
  } catch (err) {
    // window.location.href = '/signin'
    toast({ title: 'Error', status: 'error' })
  }
  return result
}

export const useVerify = ({ token, config }: useVerifyOptions): UseQueryResult<Dict> => {
  return useQuery({
    ...config,
    queryKey: ['verify', token],
    // queryFn: (): Promise<CodeResponseProps> =>
    //   ky.get('/api/v1/accounts/verify_credentials', { headers: { Authorization: `Bearer ${token}` } })?.json() ?? {
    //     data: {},
    //     status: 'error',
    //   },
    queryFn: () => fetchVerify(token),
  })
}

// export const useVerify = ({ token, config }: useVerifyOptions): UseQueryResult<VerifyProps> =>
//   useQuery(['verify', token], () => fetchVerify(token), {
//     onSuccess: () => console.log('success'),
//     onError: (err: Error) => {
//       console.dir(err)
//       toast({ title: 'Error', description: err.message, status: 'error' })
//     },
//   })

export const mutSignin = () => {
  return useMutation(({ username, password, code }: useSigninOptions) => {
    return ky.post('/oauth/signin', { json: { code, username, password } })
  })
}
