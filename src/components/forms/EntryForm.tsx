import { EntryProps } from '@/types'
import { Code, FormControl, FormLabel, Icon, Link, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { RiExternalLinkLine } from 'react-icons/ri'

import { FormElementReadonly } from './FormElement'

const EntryForm = ({
  entry = {
    id: 0,
    title: '',
    content: '',
    description: '',
    published_at: DateTime.local(),
    favorited_at: DateTime.local(),
    created_at: DateTime.local()
  }
}: {
  entry: EntryProps
}) => {
  console.log(DateTime.fromISO(entry.published_at.toLocaleString()).setLocale('zh-CN').toLocaleString())
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
