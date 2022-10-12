import { drawerAtom } from '@/app/store'
import { Input, Switch } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { Dispatch, memo, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormElement } from './FormElement'

const FeedForm = () => {
  const [drawer, setDrawer] = useAtom(drawerAtom)
  const { id, title, subscription, description, sensitive, disabled } = drawer.payload

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  useEffect(() => setDrawer({ ...drawer, isSubmitting }), [isSubmitting])

  return (
    <form onSubmit={handleSubmit(() => console.log('on submitting...'))}>
      <FormElement title='ID'>
        <Input value={id} readOnly isDisabled />
      </FormElement>
      <FormElement title='Title' isInvalid={errors.title}>
        <Input
          value={title}
          onChange={(evt) => setDrawer({ ...drawer, payload: { ...drawer.payload, title: evt.target.value } })}
        />
      </FormElement>
      <FormElement title='Subscription' isInvalid={errors.subscription}>
        <Input
          value={subscription}
          onChange={(evt) => setDrawer({ ...drawer, payload: { ...drawer.payload, subscription: evt.target.value } })}
        />
      </FormElement>
      <FormElement title='Description' isInvalid={errors.description}>
        <Input
          value={description}
          onChange={(evt) => setDrawer({ ...drawer, payload: { ...drawer.payload, description: evt.target.value } })}
        />
      </FormElement>
      <FormElement title='Mark as Sensitive' isInvalid={errors.sensitive}>
        {/* <FormLabel htmlFor='sensitive'>Enable Sensitive Mask</FormLabel> */}
        <Switch
          isChecked={sensitive}
          onChange={(evt) => setDrawer({ ...drawer, payload: { ...drawer.payload, sensitive: evt.target.checked } })}
        />
      </FormElement>
      <FormElement title='Disabled' isInvalid={errors.disabled}>
        <Switch
          isChecked={disabled}
          onChange={(evt) => setDrawer({ ...drawer, payload: { ...drawer.payload, disabled: evt.target.checked } })}
        />
      </FormElement>
    </form>
  )
}

export default memo(FeedForm)
