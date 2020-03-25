import React from 'react';
import {connect} from 'react-redux';
import {Button, Table} from 'react-bootstrap';

import DepartmentsNew from './New';
import DepartmentImg from '../../Images/Department.png';

import {startGetAllDepartments, startRemoveDepartment} from '../../actions/departments';

class DepartmentsList extends React.Component{

    componentDidMount(){
        this.props.dispatch(startGetAllDepartments())
    }

    handleRemove = (id) => {
        this.props.dispatch(startRemoveDepartment(id))
    }

    render(){
        return(
            <div>
                <h2 className="text-center">Departments List</h2><hr/>
                <DepartmentsNew/>
                <div className="row mt-3">
                    <div className="col-md-6 mx-auto">
                        <img style={{width: '85%', height: '85%'}} src={DepartmentImg} alt="Department" />
                    </div>
                    <div className="col-md-6 mx-auto text-center">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.departments.map((dept, i) => {
                                        return(
                                            <tr key={dept._id}>
                                                <td>{i+1}</td>
                                                <td>{dept.name}</td>
                                                <td><Button variant="outline-danger" onClick={() => this.handleRemove(dept._id)}>Remove</Button></td>
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
        departments: state.departments
    }
}

export default connect(mapStateToProps)(DepartmentsList)