import { drawerAtom } from '@/app/store'
import { FormControl, FormLabel, Icon, Link } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { DateTime } from 'luxon'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { RiExternalLinkLine } from 'react-icons/ri'

import { FormElementReadonly } from './FormElement'
import { HTMLRender } from '@/components'
import { length } from 'rambda'

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
        <Link href={entry.url} color='blue' isExternal>
          {entry.url}
          <Icon fontSize='16' as={RiExternalLinkLine} />
        </Link>
      </FormControl>
      {length(entry.content) > 0 && (
        <FormElementReadonly title='Content'>
          <HTMLRender html={entry.content} />
        </FormElementReadonly>
      )}
      {length(entry.content) > 0 && (
        <FormElementReadonly title='Description'>
          <HTMLRender html={entry.description} />
        </FormElementReadonly>
      )}
      <FormElementReadonly title='Published_at'>{entry.published_at.toLocaleString()}</FormElementReadonly>
      <FormElementReadonly title='Favorited_at'>{entry.favorited_at?.toLocaleString()}</FormElementReadonly>
      <FormElementReadonly title='Created_at'>{entry.created_at.toLocaleString()}</FormElementReadonly>
    </form>
  )
}

export default EntryForm
