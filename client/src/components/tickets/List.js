import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Form, ProgressBar, Table} from 'react-bootstrap';

import {startGetAllTickets, filterTickets, filterTicketsByCode, startTicketStatus} from '../../actions/tickets';

class TicketsList extends React.Component{
    
    componentDidMount(){
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
                                                <td>{ticket.customer && ticket.customer.name}</td>
                                                <td>{ticket.employees && ticket.employees.map(emp => emp.name)}</td>
                                                <td>{ticket.department && ticket.department.name}</td>
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
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tickets: state.tickets,
        dupTickets: state.dupTickets
    }
}

export default connect(mapStateToProps)(TicketsList)