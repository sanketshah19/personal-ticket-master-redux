import React from 'react';
import {connect} from 'react-redux';
import {Button, Modal} from 'react-bootstrap';

import EmployeesForm from './Form';

import { startEditEmployee } from '../../actions/employees';

class EmployeesEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            employee: {},
            show: false
        }
    }

    handleShow = () => {
        const employee = this.props.employee
        this.setState({employee, show: true})
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleSubmit = (formData) => {
        const id = this.props.employee._id
        this.setState({show: false})
        this.props.dispatch(startEditEmployee(formData, id))
    }

    render(){
        return(
            <span>
                <Button variant="outline-success" onClick={this.handleShow}>
                    Edit
                </Button>

                {
                    Object.keys(this.state.employee).length !== 0 &&
                    <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <h2 className="text-center">Edit employee Information</h2>
                        <EmployeesForm employee={this.state.employee} handleSubmit={this.handleSubmit}/>
                    </Modal.Body>
                </Modal>
                }
            </span>
        )
    }

}

export default connect()(EmployeesEdit)