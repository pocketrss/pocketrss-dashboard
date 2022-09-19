import { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
//import { useLocalStorage } from 'usehooks-ts'
import { useLocalStorage } from 'react-recipes'
import ky from 'ky'
import { useAtom } from 'jotai'
import { useMutation, useQuery } from '@tanstack/react-query'
import { authAtom } from '@/app/store'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null)
  const [token, setToken] = useLocalStorage('token', null)
  const [auth, setAuth] = useAtom(authAtom)
  const navigate = useNavigate()

  const login = async (param) => {
    const data = await ky.post('/oauth/login', {
      json: param,
    }).json()
    // setUser(data)
    // setToken(data.access_token)
    auth.token = data.access_token
    setAuth(auth)
    navigate('/')
  }

  const logout = () => {
    // setUser(null)
    // setToken(null)
    setAuth({ token: '', username: '' })
    navigate('/login', { replace: true })
  }

  const value = useMemo(() => ({
    user: auth.user,
    token: auth.token,
    login,
    logout,
  }), [auth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export const useVerify = ({token, config}) => {
  return useQuery({
    ...config,
    queryKey: ['verify', token],
    queryFn: () => ky.get('/oauth/verify', { headers: { 'Authorization': `Bearer ${token}` }}).json(),
  })
}

export const mutSignin = () => {
  return useMutation(({ username, password, code }) => {
    return ky.post('/oauth/signin', { json: { code, username, password }})
  })
}

