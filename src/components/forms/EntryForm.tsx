import { drawerAtom } from '@/app/store'
import { EntryProps } from '@/types'
import { Code, FormControl, FormLabel, Icon, Link, Text } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { DateTime } from 'luxon'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RiExternalLinkLine } from 'react-icons/ri'

import { FormElementReadonly } from './FormElement'

const EntryForm = () => {
  const [drawer, setDrawer] = useAtom(drawerAtom)
  const entry = drawer.payload

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  useEffect(() => setDrawer({ ...drawer, isSubmitting }), [isSubmitting])

  return (
    <form>
      <FormElementReadonly title='ID'>{entry.id}</FormElementReadonly>
      {entry.title && <FormElementReadonly title='Title'>{entry.title}</FormElementReadonly>}
      <FormControl>
        <FormLabel htmlFor='url'>URL</FormLabel>
        {/* <Text boxShadow='xs' rounded='sm' bgColor='gray.100' p='1'>
          {entry.id}
        </Text> */}
        <Link href={entry.url} color='blue' noOfLines={1} isExternal>
          {entry.url}
          <Icon fontSize='16' as={RiExternalLinkLine} />
        </Link>
      </FormControl>
      {entry.content && <FormElementReadonly title='Content'>{entry.content}</FormElementReadonly>}
      {entry.description && <FormElementReadonly title='Description'>{entry.description}</FormElementReadonly>}
      <FormElementReadonly title='Published_at'>{entry.published_at.toLocaleString()}</FormElementReadonly>
      <FormElementReadonly title='Favorited_at'>{entry.favorited_at?.toLocaleString()}</FormElementReadonly>
      <FormElementReadonly title='Created_at'>{entry.created_at.toLocaleString()}</FormElementReadonly>
    </form>
  )
}

export default EntryForm
