import React from 'react';
import {connect} from 'react-redux';
import {Nav, Navbar} from 'react-bootstrap';
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';

import {startLogoutUser} from './actions/user';
import PrivateRoute from './components/privateRoute/PrivateRoute';

import Home from './components/common/Home';
import Register from './components/users/Register';
import Login from './components/users/Login';

import CustomersList from './components/customers/List';
import CustomersNew from './components/customers/New';
import CustomersTickets from './components/customers/Ticket';

import DepartmentsList from './components/departments/List';

import EmployeesList from './components/employees/List';
import EmployeesNew from './components/employees/New';
import EmployeesTickets from './components/employees/Ticket';

import TicketsList from './components/tickets/List';

function App(props) {
  function handleLogout(){
    props.dispatch(startLogoutUser())
  }
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
                <Link to="#" onClick={handleLogout} className="ml-2">Logout</Link>
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
        <Route path="/users/register" component={Register} />
        <Route path="/users/login" component={Login} />

        <PrivateRoute path="/customers" component={CustomersList} exact={true} />
        <PrivateRoute path="/customers/new" component={CustomersNew} />
        <PrivateRoute path="/customers/tickets/:id" component={CustomersTickets} />

        <PrivateRoute path="/departments" component={DepartmentsList} exact={true} />

        <PrivateRoute path="/employees" component={EmployeesList} exact={true} />
        <PrivateRoute path="/employees/new" component={EmployeesNew} />
        <PrivateRoute path="/employees/tickets/:id" component={EmployeesTickets} />

        <PrivateRoute path="/tickets" component={TicketsList} exact={true} />
        
      </Switch>

      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)