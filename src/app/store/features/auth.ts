import { atomWithStorage } from 'jotai/utils'

const auth = {
	token: '',
	username: '',
}

const authAtom = atomWithStorage('APP_AUTH', auth)

export default authAtom
