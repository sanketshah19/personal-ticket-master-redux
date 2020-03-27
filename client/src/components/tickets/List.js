import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Form, ProgressBar, Table} from 'react-bootstrap';

import TicketsNew from './New';

import {startGetAllCustomers} from '../../actions/customers';
import {startGetAllDepartments} from '../../actions/departments';
import {startGetAllEmployees} from '../../actions/employees';
import {startGetAllTickets, filterTickets, filterTicketsByCode, startTicketStatus} from '../../actions/tickets';

class TicketsList extends React.Component{
    
    componentDidMount(){
        this.props.dispatch(startGetAllCustomers())
        this.props.dispatch(startGetAllDepartments())
        this.props.dispatch(startGetAllEmployees())
        this.props.dispatch(startGetAllTickets())
    }

    handlePrioriy = (action) => {
        this.props.dispatch(filterTickets(action, this.props.dupTickets))
    }

    handleSearch = (e) => {
        this.props.dispatch(filterTicketsByCode(e.target.value, this.props.dupTickets))
    }

    handleStatus = (e, id) => {
        const ticket = this.props.tickets.find(ticket => ticket._id === id)
        ticket.isResolved = e.target.checked
        this.props.dispatch(startTicketStatus(id, ticket))
    }

    handleCustomerName = (id) => {
        const customer = this.props.customers.find((cust) => cust._id === id)
        return customer && customer.name
    }

    handleEmployeesName = (arr) => {
        if(!arr.includes(' ')){
            const names = arr.map((a) => this.props.employees.find(emp => emp._id == a) ? this.props.employees.find(emp => emp._id == a).name : '')
            return names.join(',')
        }
    }

    handleDepartmentName = (id) => {
        const department = this.props.departments.find(dept => dept._id === id)
        return department && department.name
    }
    
    render(){
        return(
            <div>
                <h2 className="text-center">Listing Tickets - {this.props.tickets.length}</h2><hr/>
                <div className="row">
                    <div className="col-md-7 mx-auto">
                        <Button variant="outline-primary" className="mr-2" onClick={() => this.handlePrioriy("ALL")}>All</Button>
                        <Button variant="outline-primary" className="mr-2" onClick={() => this.handlePrioriy("HIGH")}>High</Button>
                        <Button variant="outline-primary" className="mr-2" onClick={() => this.handlePrioriy("MEDIUM")}>Medium</Button>
                        <Button variant="outline-primary" className="mr-2" onClick={() => this.handlePrioriy("LOW")}>Low</Button>
                    </div>
                    <div className="col-md-5 mx-auto mt-1">
                        <Form.Control className="col-md-6 offset-md-4" type="text" placeholder="&#128269; Search by code..." onChange={this.handleSearch} />
                    </div>
                </div>
                <div className="row mt-3" >
                    <div className="col-md-8 mx-auto mt-3 text-center">
                        <Table striped bordered hover responsive="sm">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Customer</th>
                                    <th>Employee</th>
                                    <th>Department</th>
                                    <th>Priority</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.tickets.map((ticket) => {
                                        return(
                                            <tr key={ticket._id}>
                                                <td>{ticket.code}</td>
                                                <td>{ticket.customer && this.handleCustomerName(ticket.customer)}</td>
                                                <td>{ticket.employees && this.handleEmployeesName(ticket.employees)}</td>
                                                <td>{ticket.department && this.handleDepartmentName(ticket.department)}</td>
                                                <td>{ticket.priority}</td>
                                                <td>{ticket.message}</td>
                                                <td><Form.Check type="checkbox" checked={ticket.isResolved} onChange={(e) => this.handleStatus(e, ticket._id)}/></td>
                                                <td><Link to={`/tickets/edit/${ticket._id}`}><Button variant="outline-primary">Edit</Button></Link></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-md-4 mx-auto ml-2">
                    { Object.values(this.props.customers).length !== 0 && 
                        <TicketsNew customers={this.props.customers} departments={this.props.departments} employees={this.props.employees} />}
                    </div>
                </div>
                <div className="mx-auto mt-3">
                    {   Object.values(this.props.tickets).length !== 0 && 
                        <div>
                            <h2>Tickets Resolved: </h2> 
                            <ProgressBar className="mt-3" animated now={Math.round((this.props.tickets.filter(item=>item.isResolved).length * 100) / this.props.tickets.length)} variant="success" label={`${Math.round((this.props.tickets.filter(item=>item.isResolved).length * 100) / this.props.tickets.length)}%`}/>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customers,
        departments: state.departments,
        employees: state.employees,
        tickets: state.tickets,
        dupTickets: state.dupTickets
    }
}

export default connect(mapStateToProps)(TicketsList)