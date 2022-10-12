import { DrawerFormProps } from '@/types'
import { FormControl, FormLabel, Text } from '@chakra-ui/react'

const FormElement = (props: DrawerFormProps) => {
  const { title, children } = props
  return (
    <FormControl {...props}>
      <FormLabel htmlFor={title.toLowerCase()}>{title}</FormLabel>
      {children}
    </FormControl>
  )
}

const FormElementReadonly = ({ title, children }: DrawerFormProps) => {
  return (
    <FormControl>
      <FormLabel htmlFor={title.toLowerCase()} mt={2}>
        {title}
      </FormLabel>
      <Text boxShadow='xs' rounded='sm' overflowX='auto' bgColor='gray.100' p='1'>
        {children}
      </Text>
    </FormControl>
  )
}

export { FormElement, FormElementReadonly }
