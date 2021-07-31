import React from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { Event } from '../types'

type CreateProps = {
  event?: Event
  onSubmit: (values: Event, helpers: FormikHelpers<Event>) => void
}

function EventForm({ event, onSubmit }: CreateProps) {
  const initialValues: Event = {
    name: event ? event.name : '',
    date: event ? event.date : '',
    price: event ? event.price : '',
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={() => {
        return {}
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type='text' name='name' placeholder='Name' />

          <Field type='text' name='date' placeholder='Date' />

          <Field type='text' name='price' placeholder='Price' />

          <button type='submit' disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default EventForm
