import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
// import { useQueryParam, NumberParam, StringParam } from 'use-query-params'
import {  useQueryParams } from 'react-recipes'
import { useAtom } from 'jotai'
import { MouseEvent, useState } from 'react'

import { authAtom } from '@/app/store'
import { mutSignin } from '@/hooks'
import { CodeResponseProps } from '@/types'
import ky from 'ky'

const Signin = () => {
  const toast = useToast()
  const signinMutation = mutSignin()
  const { getParams } = useQueryParams()
  const { code, redirect_uri } = getParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [_, setAuth] = useAtom(authAtom)
  // const { data } = useVerify({ token: auth.token })

  // useEffect(() => {
  //   console.log('auth: ', auth, 'auth verify...', data, '  reuri:', redirect_uri)
  // }, [auth, data, redirect_uri])

  const handleLogin = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault()
    console.log(redirect_uri)
    // signinMutation
    //   .mutateAsync({ code, username, password })
    //   .then((resp) => {
    //     if (!resp.ok) {
    //       throw 'Sigin failed'
    //     }
    //     return resp.json() as CodeResponseProps
    //   })
    //   .then((data) => data.access_token ?? '')
    //   .then((token) => {
    //     setAuth({ username, token })
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //     toast({
    //       title: 'Error',
    //       description: 'Signin failed',
    //       status: 'error',
    //     })
    //   })
    // const mu = signinMutation.mutate({ code, username, password })
    // const resp = await mu.json()
    const resp = await ky.post("/oauth/signin", { json: { code, username, password }})
    const data: CodeResponseProps = await resp.json()
    console.log('signin...', resp, '  data: ', data)
    const token = data?.access_token ?? ''
    if (token.length === 0 ) {
      toast({
        title: 'Error',
        description: 'Signin failed',
        status: 'error',
      })
      return
    }
    setAuth({ username, token })
    evt.stopPropagation()
  }
  return (
    <Flex minH='100vh' align='center' justify='center' bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
        <Stack align='center'>
          <Heading fontSize='4xl'>PocketRSS</Heading>
          <Text fontSize='lg' color='gray.600'>
            Sign In
          </Text>
          {/* <Text>{code}</Text> */}
        </Stack>
        <Box rounded='lg' bg={useColorModeValue('white', 'gray.700')} boxShadow='lg' p={8}>
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Username</FormLabel>
              <Input type='text' value={username} onChange={(evt) => setUsername(evt.target.value)} />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input type='password' value={password} onChange={(evt) => setPassword(evt.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              {/* <Stack
                direction={{ base: 'column', sm: 'row' }}
                align='start'
                justify='space-between'>
                <Checkbox>Remember me</Checkbox>
                <Link color='blue.400'>Forgot password?</Link>
              </Stack> */}
              <Button
                bg='blue.400'
                color='white'
                onClick={handleLogin}
                isLoading={signinMutation.isLoading}
                loadingText='submitting...'
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Signin
