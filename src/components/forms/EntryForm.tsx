import { EntryProps } from '@/types'
import { Alert, AlertIcon, FormControl, FormLabel, Input, Switch, Text } from '@chakra-ui/react'
import { DateTime } from 'luxon'
import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const EntryForm = ({
  entry = {
    id: 0,
    title: '',
    content: '',
    description: '',
    published_at: DateTime.local(),
    favorited_at: DateTime.local(),
    created_at: DateTime.local()
  },
}: {
  entry: EntryProps
}) => {
  console.log(DateTime.fromISO(entry.published_at.toLocaleString()).setLocale('zh-CN').toLocaleString())
  return (
    <form >
      <FormControl>
        <FormLabel htmlFor='id'>ID</FormLabel>
        <Text boxShadow="xs" rounded="sm" bgColor="gray.100" p="1">{entry.id}</Text>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='title'>Title</FormLabel>
        <Text boxShadow="xs" rounded="sm" bgColor="gray.100" p="1">{entry.title ?? ' '}</Text>
      </FormControl>
      <FormControl >
        <FormLabel htmlFor='subscription'>Content</FormLabel>
        <Text boxShadow="xs" rounded="sm" bgColor="gray.100" p="1">{entry.content ?? ' '}</Text>
      </FormControl>
      <FormControl >
        <FormLabel htmlFor='subscription'>Description</FormLabel>
        <Text boxShadow="xs" rounded="sm" bgColor="gray.100" p="1">{entry.description}</Text>
      </FormControl>
      <FormControl >
        <FormLabel htmlFor='description'>Published at</FormLabel>
        <Text boxShadow="xs" rounded="sm" bgColor="gray.100" p="1">{entry.published_at.toLocaleString()}</Text>
      </FormControl>
      <FormControl >
        <FormLabel htmlFor='sensitive'>Favorited at</FormLabel>
        <Text boxShadow="xs" rounded="sm" bgColor="gray.100" p="1">{entry.favorited_at?.toLocaleString()}</Text>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='disabled'>Created at</FormLabel>
        <Text boxShadow="xs" rounded="sm" bgColor="gray.100" p="1">{entry.created_at.toLocaleString()}</Text>
      </FormControl>
    </form>
  )
}

export default EntryForm
