import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Table} from 'react-bootstrap';

import CustomersEdit from './Edit';
import CustomerImg from '../../Images/Customer.svg';

import {startGetAllCustomers} from '../../actions/customers';

class CustomersList extends React.Component{
    
    componentDidMount(){
        this.props.dispatch(startGetAllCustomers())
    }
    
    render(){
        return(
            <div>
                <h2 className="text-center">Customers List</h2><hr/>
                <Link to="/customers/new"><Button variant="primary">Add Customer</Button></Link>
                <div className="row mt-3">
                    <div className="col-md-7 text-center mx-auto">
                        <Table striped bordered hover responsive="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.customers.map((customer, i) => {
                                        return(
                                            <tr key={customer._id}>
                                                <td>{i+1}</td>
                                                <td><Link to={`/customers/tickets/${customer._id}`}>{customer.name}</Link></td>
                                                <td>{customer.email}</td>
                                                <td>{customer.mobile}</td>
                                                <td><CustomersEdit customer={customer}/> <Button variant="outline-danger" className="ml-2">Remove</Button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-md-5 mx-auto">
                        <img style={{width: '100%', height: '400px'}} src={CustomerImg} alt="Customer" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customers
    }
}

export default connect(mapStateToProps)(CustomersList)