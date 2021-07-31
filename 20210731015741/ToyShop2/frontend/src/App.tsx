import React, { useEffect } from 'react'

import CreateToy from './toys/CreateToy'
import ListToy from './toys/ListToy'
import DetailToy from './toys/DetailToy'
import UpdateToy from './toys/UpdateToy'

import CreateEvent from './events/CreateEvent'
import ListEvent from './events/ListEvent'
import DetailEvent from './events/DetailEvent'
import UpdateEvent from './events/UpdateEvent'

import CreateUser from './users/CreateUser'
import ListUser from './users/ListUser'
import DetailUser from './users/DetailUser'
import UpdateUser from './users/UpdateUser'

import LoginForm from './auth/LoginForm'
import RegisterForm from './auth/RegisterForm'

import { Route, Switch, BrowserRouter as Router, Link } from 'react-router-dom'

import { useQuery } from 'react-query'

import client, { fetchCSRFToken, hasCSRFToken } from './api'

function App() {
  const { data: user } = useQuery('user', () => client.get('/auth/me'), {
    retry: false,
  })

  useEffect(() => {
    if (!hasCSRFToken()) fetchCSRFToken()
  }, [])

  return (
    <Router>
      <nav>
        <ul className='flex'>
          <li>
            <Link to='/'>Home</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/login'>Login</Link>
            <br />
            <Link to='/register'>Register</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/toys'>Toys</Link>
            <br />
            <Link to='/toys/create'>Create a Toy</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/events'>Events</Link>
            <br />
            <Link to='/events/create'>Create a Event</Link>
            <br />
          </li>

          <li className='ml-10'>
            <Link to='/users'>Users</Link>
            <br />
            <Link to='/users/create'>Create a User</Link>
            <br />
          </li>
        </ul>
      </nav>
      <main>
        <Route path='/toys'>
          <h1>Toys</h1>
        </Route>

        <Route path='/events'>
          <h1>Events</h1>
        </Route>

        <Route path='/users'>
          <h1>Users</h1>
        </Route>

        <Switch>
          {/* Toy routes */}
          <Route path='/toys/create' component={CreateToy} />
          <Route path='/toys/update/:id' component={UpdateToy} />
          <Route path='/toys/detail/:id' component={DetailToy} />
          <Route path='/toys' component={ListToy} />,{/* Event routes */}
          <Route path='/events/create' component={CreateEvent} />
          <Route path='/events/update/:id' component={UpdateEvent} />
          <Route path='/events/detail/:id' component={DetailEvent} />
          <Route path='/events' component={ListEvent} />,{/* User routes */}
          <Route path='/users/create' component={CreateUser} />
          <Route path='/users/update/:id' component={UpdateUser} />
          <Route path='/users/detail/:id' component={DetailUser} />
          <Route path='/users' component={ListUser} />
          {/* auth routes */}
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={RegisterForm} />
        </Switch>
      </main>
    </Router>
  )
}

export default App
