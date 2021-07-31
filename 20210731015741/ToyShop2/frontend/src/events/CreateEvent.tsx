import client from '../api'
import { FormikHelpers } from 'formik'
import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Event, EventError } from '../types'
import EventForm from './EventForm'
import { useHistory } from 'react-router-dom'

function CreateEvent() {
  const queryClient = useQueryClient()
  const history = useHistory()
  const createEvent = useMutation<Event, EventError, Event>(
    (values) => {
      return client.post('/api/v1/events', values)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('events')
      },
    }
  )

  const handleSubmit = (
    values: Event,
    { setSubmitting }: FormikHelpers<Event>
  ) => {
    createEvent.mutate(values)
    setSubmitting?.(false)
    history.push('/events')
  }

  return <EventForm onSubmit={handleSubmit} />
}

export default CreateEvent
