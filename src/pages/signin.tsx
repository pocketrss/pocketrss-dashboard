import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { KeyboardEvent, MouseEvent, useState } from 'react'

import { authAtom } from '@/app/store'
import { mutSignin } from '@/hooks'
import { CodeResponseProps } from '@/types'
import ky from 'ky'
import { useSearchParam } from 'react-use'

const Signin = () => {
  const toast = useToast()
  const signinMutation = mutSignin()
  const code = useSearchParam('code')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [_, setAuth] = useAtom(authAtom)

  const handleLogin = async (evt: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
    evt.preventDefault()

    const resp = await ky.post('/oauth/signin', { json: { code, username, password } })
    const data: CodeResponseProps = await resp.json()
    console.log('signin...', resp, '  data: ', data)
    const token = data?.access_token ?? ''
    if (token.length === 0) {
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
        </Stack>
        <Box rounded='lg' bg={useColorModeValue('white', 'gray.700')} boxShadow='lg' p={8}>
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Username</FormLabel>
              <Input type='text' value={username} onChange={(evt) => setUsername(evt.target.value)} />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                onKeyDown={(evt) => {
                  if (evt.key === 'Enter') {
                    handleLogin(evt)
                  }
                }}
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg='blue.400'
                color='white'
                onClick={handleLogin}
                // onKeyDown={(evt) => {
                //   if (evt.key === 'Enter') {
                //     handleLogin()
                //   }
                // }}
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
