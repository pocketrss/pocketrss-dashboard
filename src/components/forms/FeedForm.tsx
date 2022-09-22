import { FeedProps } from '@/types'
import { Alert, AlertIcon, FormControl, FormLabel, Input, Switch } from '@chakra-ui/react'
import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormElement } from './FormElement'

const FeedForm = ({
  feed = {
    id: 0,
    title: '',
    subscription: '',
    description: '',
    sensitive: false,
    disabled: false,
  },
  onFormValueChanged,
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
    formState: { errors, isSubmitting },
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
      <FormElement title='ID'>
        <Input value={feed.id} readOnly isDisabled />
      </FormElement>
      <FormElement title='Title' isInvalid={errors.title}>
        <Input value={title} onChange={(evt) => setTitle(evt.target.value)} />
      </FormElement>
      <FormElement title='Subscription' isInvalid={errors.subscription}>
        <Input value={subscription} onChange={(evt) => setSubscription(evt.target.value)} />
      </FormElement>
      <FormElement title='Description' isInvalid={errors.description}>
        <Input value={description} onChange={(evt) => setDescription(evt.target.value)} />
      </FormElement>
      <FormElement title='Sensitive' isInvalid={errors.sensitive}>
        <FormLabel htmlFor='sensitive'>Enable Sensitive Mask</FormLabel>
        <Switch isChecked={sensitive} onChange={(evt) => setSensitive(evt.target.checked)} />
      </FormElement>
      <FormElement title='Disabled' isInvalid={errors.disabled}>
        <Switch isChecked={disabled} onChange={(evt) => setDisabled(evt.target.checked)} />
      </FormElement>
    </form>
  )
}

export default memo(FeedForm)
