import { FormControl, FormLabel, Text } from '@chakra-ui/react'

const FormElement = (props) => {
  const { title, children } = props
  return (
    <FormControl {...props}>
      <FormLabel htmlFor={title.toLowerCase()}>{title}</FormLabel>
      {children}
    </FormControl>
  )
}

const FormElementReadonly = ({ title, children }) => {
  return (
    <FormControl>
      <FormLabel htmlFor={title.toLowerCase()} mt={2}>
        {title}
      </FormLabel>
      <Text boxShadow='xs' rounded='sm' bgColor='gray.100' p='1'>
        {children}
      </Text>
    </FormControl>
  )
}

export { FormElement, FormElementReadonly }