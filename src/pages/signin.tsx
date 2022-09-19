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
import { useCookie, useQueryParams, useLocation } from 'react-recipes'
import ky from 'ky'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { authAtom } from '@/app/store'
import { mutSignin, useVerify } from '@/hooks'

const Signin = () => {
  // const [code, setCode] = useQueryParam('code', StringParam)
  const { push, pathname } = useLocation()
  const toast = useToast()
  const signinMutation = mutSignin()
  const { getParams } = useQueryParams()
  const [ cookie ] = useCookie('pocketrss_sess', '')
  const { code, redirect_uri } = getParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [auth, setAuth] = useAtom(authAtom)
  const { data } = useVerify({ token: auth.token })
  
  useEffect(() => {
    console.log('auth: ', auth,  'auth verify...', data, '  reuri:', redirect_uri)
  }, [auth, data, redirect_uri])
  
  const handleLogin = (evt) => {
    console.log(redirect_uri)
    signinMutation
      .mutateAsync({ code, username, password })
      .then((resp) => {
        if (!resp.ok) { throw 'Sigin failed' }
        return resp.json()
      })
      .then((data) => data.access_token)
      .then((token) => {
        setAuth({ username, token })
        // navigate(redirect_uri)
        // let url = '/'
        // if (redirect_uri && redirect_uri.length > 0) {
        //   url = `${redirect_uri}?code=${code}`
        // }
        // window.location.href = url
      })
      .catch((err) => toast({
        title: 'Error',
        description: 'Signin failed',
        status: 'error',
      }))
  }
	return (
		<Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
        <Stack align='center'>
          <Heading fontSize='4xl'>PocketRSS</Heading>
          <Text fontSize='lg' color='gray.600'>
            Sign In
          </Text>
          {/* <Text>{code}</Text> */}
        </Stack>
        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='lg'
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Username</FormLabel>
              <Input type="text" value={username} onChange={(evt) => setUsername(evt.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(evt) => setPassword(evt.target.value)} />
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
                }}>
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
