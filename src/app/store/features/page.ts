import { atomWithStorage } from "jotai/utils"

const page = {
	pageSize: 10,
}

const pageAtom = atomWithStorage('APP_PAGE', page)

export default pageAtom

