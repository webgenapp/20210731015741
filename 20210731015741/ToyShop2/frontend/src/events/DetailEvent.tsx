import React from 'react'
import { useParams } from 'react-router-dom'
import client from '../api'
import { useQuery } from 'react-query'
import { Event } from '../types'

function DetailEvent() {
  const { id } = useParams<{ id: string }>()

  const { data, isLoading } = useQuery<Event>(['events', id], () =>
    client.get(`/api/v1/events/${id}`).then((response) => response.data)
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  const event = data as Event

  return (
    <div>
      <label>{event.name}</label>
      <br />

      <label>{event.date}</label>
      <br />

      <label>{event.price}</label>
      <br />
    </div>
  )
}

export default DetailEvent
