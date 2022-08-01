import { FeedProps } from '@/types'
import { Alert, AlertIcon, FormControl, FormLabel, Input, Switch } from '@chakra-ui/react'
import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const FeedForm = ({
  feed = {
    id: 0,
    title: '',
    subscription: '',
    description: '',
    sensitive: false,
    disabled: false
  },
  onFormValueChanged
}: {
  feed: FeedProps
  onFormValueChanged: Dispatch<SetStateAction<Object>>
}) => {
  const [title, setTitle] = useState<string>(feed?.title ?? '')
  const [subscription, setSubscription] = useState<string>(feed?.subscription ?? '')
  const [description, setDescription] = useState<string>(feed?.description ?? '')
  const [sensitive, setSensitive] = useState<boolean>(feed?.sensitive ?? false)
  const [disabled, setDisabled] = useState<boolean>(feed?.disabled ?? false)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()

  // if (!feed) {
  //   return (
  //     <Alert status='warning'>
  //       <AlertIcon />
  //       Seems your account is about expire, upgrade now
  //     </Alert>
  //   )
  // }

  useEffect(() => {
    console.log('form value changed: ', { id: feed.id, title, subscription, description, sensitive, disabled })
    onFormValueChanged({ id: feed.id, title, subscription, description, sensitive, disabled })
  }, [title, subscription, description, sensitive, disabled])

  return (
    <form onSubmit={handleSubmit(() => console.log('asdf'))}>
      <FormControl>
        <FormLabel htmlFor='id'>ID</FormLabel>
        <Input value={feed.id} readOnly isDisabled />
      </FormControl>
      <FormControl isInvalid={errors.title}>
        <FormLabel htmlFor='title'>Title</FormLabel>
        <Input value={title} onChange={(evt) => setTitle(evt.target.value)} />
      </FormControl>
      <FormControl isInvalid={errors.subscription}>
        <FormLabel htmlFor='subscription'>Subscription</FormLabel>
        <Input value={subscription} onChange={(evt) => setSubscription(evt.target.value)} />
      </FormControl>
      <FormControl isInvalid={errors.description}>
        <FormLabel htmlFor='description'>Description</FormLabel>
        <Input value={description} onChange={(evt) => setDescription(evt.target.value)} />
      </FormControl>
      <FormControl isInvalid={errors.sensitive}>
        <FormLabel htmlFor='sensitive'>Enable Sensitive Mask</FormLabel>
        <Switch isChecked={sensitive} onChange={(evt) => setSensitive(evt.target.checked)} />
      </FormControl>
      <FormControl isInvalid={errors.disabled}>
        <FormLabel htmlFor='disabled'>Disabled</FormLabel>
        <Switch isChecked={disabled} onChange={(evt) => setDisabled(evt.target.checked)} />
      </FormControl>
    </form>
  )
}

export default memo(FeedForm)
