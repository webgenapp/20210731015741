import client from '../api'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import EventForm from './EventForm'
import { Event } from '../types'
import { useQuery, useMutation, useQueryClient } from 'react-query'

function UpdateEvent() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()
  const history = useHistory()

  const { data, isLoading } = useQuery<Event>(['events', id], () =>
    client.get(`/api/v1/events/${id}`).then((response) => response.data)
  )

  const updateEvent = useMutation<Event, any, Event>(
    (values: Event) =>
      client
        .put(`/api/v1/events/${id}`, values)
        .then((response) => response.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('events')
      },
    }
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const event = data as Event
  return (
    <EventForm
      event={event}
      onSubmit={(values, { setSubmitting }) => {
        updateEvent.mutate(values)
        setSubmitting?.(false)
        history.push('/events')
      }}
    />
  )
}

export default UpdateEvent
