import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Table} from 'react-bootstrap';

import EmployeeImg from '../../Images/Employee.png';

import {startGetAllEmployees} from '../../actions/employees';

class EmployeesList extends React.Component{
    
    componentDidMount(){
        this.props.dispatch(startGetAllEmployees())
    }

    render(){
        return(
            <div>
                <h2 className="text-center">Employees List</h2><hr/>
                <Link to="/employees/new"><Button>Add Employee</Button></Link>
                <div className="row mt-3">
                    <div className="col-md-7 mx-auto text-center">
                        <Table striped bordered hover responsive="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.employees.map((emp, i) => {
                                        return(
                                            <tr key={emp._id}>
                                                <td>{i+1}</td>
                                                <td><Link to={`/employees/tickets/${emp._id}`}>{emp.name}</Link></td>
                                                <td>{emp.email}</td>
                                                <td>{emp.mobile}</td>
                                                <td>{emp.department && emp.department.name}</td>
                                                <td><Button variant="outline-success">Edit</Button><Button className="ml-2" variant="outline-danger">Remove</Button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-md-5 mx-auto">
                        <img style={{width: '100%', height: '100%'}} src={EmployeeImg} alt="Employee" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }
}

export default connect(mapStateToProps)(EmployeesList)