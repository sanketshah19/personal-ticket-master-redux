import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Card, Table} from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';

import {startGetSingleCustomer} from '../../actions/customers';

class CustomersTickets extends React.Component{
    
    componentDidMount(){
        const id = this.props.match.params.id
        this.props.dispatch(startGetSingleCustomer(id))
    }

    render(){
        return(
            <div className="mt-3">
                {
                    Object.values(this.props.customer).length !== 0 &&
                    <div>
                        {
                            Object.values(this.props.customer).length !== 0 &&
                                <div className="col-md-6 offset-md-3">
                                    <Card className="text-center" style={{ border: "thin solid #007BFF", margin: "2rem", borderRadius:'15px'}}>
                                        <Card.Header>Ticket of <strong>{this.props.customer.name}</strong></Card.Header>
                                        <Card.Body>
                                            <Avatar style={{width:50, height: 50, marginLeft: "45%" }} className="mx-auto mb-2">
                                                {this.props.customer.name.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <Card.Title>{this.props.customer.name}</Card.Title>
                                            <Card.Text>
                                            <strong>Email</strong>: {this.props.customer.email}<br/>
                                            <strong>Mobile</strong>: {this.props.customer.mobile}
                                            </Card.Text>
                                            <Link to="/customers"> <Button variant="outline-primary">Back</Button> </Link>
                                        </Card.Body>
                                    </Card>
                                </div>
                        }
                        {
                            Object.values(this.props.tickets).length !== 0 ?
                            (
                            <div>
                                <Table striped bordered hover className="text-center mx-auto">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Employee</th>
                                        <th>Department</th>
                                        <th>Priority</th>
                                        <th>Message</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.tickets.map((ticket) => {
                                            return(
                                                <tr key={ticket._id}>
                                                    <td>{ticket.code}</td>
                                                    <td>{ticket.employees && ticket.employees.map(emp => emp.name).join(', ')}</td>
                                                    <td>{ticket.department && ticket.department.name}</td>
                                                    <td>{ticket.priority}</td>
                                                    <td>{ticket.message}</td>
                                                    <td>{ticket.isResolved ? "Resolved" : "Pending" }</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                </Table>
                            </div>
                            )
                            : 
                            (
                            <div>
                                <h2 className='error text-center' style={{ color: 'red' }}>No Tickets Found!</h2>
                            </div>
                            )
                        }
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customer: state.singleCustomer,
        tickets: state.assoTicket
    }
}

export default connect(mapStateToProps)(CustomersTickets)