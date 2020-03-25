import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';

import Home from './components/common/Home';

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>

      {
        localStorage.getItem('authToken') ?
        (
          <Navbar bg="dark" variant="dark" expand="lg">
              <Navbar.Brand href="/">Ticket-Master</Navbar.Brand>
              <Nav.Item className="ml-auto">
                <Link to="/" className="ml-2">Home</Link>
                <Link to="/customers" className="ml-2">Customers</Link>
                <Link to="/departments" className="ml-2">Departments</Link>
                <Link to="/employees" className="ml-2">Employees</Link>
                <Link to="/tickets" className="ml-2">Tickets</Link>
                <Link to="#" className="ml-2">Logout</Link>
              </Nav.Item>
          </Navbar>
        )
        :
        (
          <Navbar bg="dark" variant="dark" expand="lg">
              <Navbar.Brand href="/">Ticket-Master</Navbar.Brand>
              <Nav.Item className="ml-auto">
                <Link to="/" className="ml-2">Home</Link>
                <Link to="/users/register" className="ml-2">Register</Link>
                <Link to="/users/login" className="ml-2">Login</Link>
              </Nav.Item>
          </Navbar>
        )
      }

      <Switch>

        <Route path="/" component={Home} exact={true} />
        
      </Switch>

      </BrowserRouter>
    </div>
  )
}

export default App