import React from 'react'
import { useQueryClient, useQuery, useMutation } from 'react-query'
import client from '../api'
import { Event } from '../types'
import { useHistory } from 'react-router-dom'

type EventPreviewProps = {
  event: Event
  handleEdit: (event: Event) => void
  handleDelete: (event: Event) => void
  handleDetail: (event: Event) => void
}

function EventPreview({
  event,
  handleEdit,
  handleDelete,
  handleDetail,
}: EventPreviewProps) {
  return (
    <>
      {event.name}
      <br />
      <button type='button' onClick={() => handleDetail(event)}>
        detail
      </button>
      <button type='button' onClick={() => handleEdit(event)}>
        edit
      </button>
      <button type='button' onClick={() => handleDelete(event)}>
        delete
      </button>
    </>
  )
}

function ListEvents() {
  const history = useHistory()
  const queryClient = useQueryClient() // eslint-disable-line no-unused-vars
  const eventsQuery = useQuery<Event[]>('events', () => {
    return client
      .get('/api/v1/events')
      .then((response) => response.data) as Promise<Event[]>
  })

  const deleteEvent = useMutation<any, any, Partial<Event>>(
    ({ id }) => {
      return client.delete(`/api/v1/events/${id}`)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('events')
      },
    }
  )

  const handleEdit = ({ id }: Event) => {
    history.push(`/events/update/${id}`)
  }

  const handleDelete = ({ id }: Event) => {
    deleteEvent.mutate({ id })
  }

  const handleDetail = ({ id }: Event) => {
    history.push(`/events/detail/${id}`)
  }

  return (
    <>
      <p>{eventsQuery.data?.length} events</p>
      <ul>
        {eventsQuery.data?.map((event) => (
          <li key={event.id}>
            <EventPreview
              event={event}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleDetail={handleDetail}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListEvents
