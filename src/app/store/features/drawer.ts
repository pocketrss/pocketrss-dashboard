import { DrawerPayloadProps } from "@/types"
import { atom } from "jotai"

export const initialPayload: DrawerPayloadProps = {
  id: '',
  title: '',
  // subscription: '',
  // description: '',
  // sensitive: false,
  // disabled: false,
  // isSubmitting: false,
}

const drawer = {
  isSubmitting: false,
  isOpen: false,
  payload: initialPayload
}

const drawerAtom = atom(drawer)

export default drawerAtom
