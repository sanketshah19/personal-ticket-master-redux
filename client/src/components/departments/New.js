import React from 'react';
import swal from 'sweetalert';
import {connect} from 'react-redux';
import {Button, Form, Modal} from 'react-bootstrap'; 

import {startAddDepartment} from '../../actions/departments';

class DepartmentsNew extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name: '',
            errors: {
                name: ''
            },
            show: false
        }
    }
    
    handleShow = () => {
        this.setState({show: true})
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        let errors = this.state.errors

        switch(name){
            case 'name': 
                errors.name = 
                    value.length < 1 
                    ? 'Department cannot be empty!'
                    : '';
                    break;
            default: 
                break;
        }
        this.setState({errors, [name]: value})
    }

    validateForm = (errors) => {
        let valid = true
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        )
        return valid
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.validateForm(this.state.errors)){
            const formData = {
                name: this.state.name
            }
            this.setState({show: false, name: ''})
            this.props.dispatch(startAddDepartment(formData))
        }else{
            swal("Oops","Please fill all the details correctly!","error")
        }
    }

    render(){
        const {errors} = this.state
        return(
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    Add Department
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                    <h2 className="text-center">Add Department</h2>
                    <Form onSubmit={this.handleSubmit} style={{ border: "thin solid #007BFF", padding: "2rem", margin: "2rem", borderRadius:'15px'}}>

                        <Form.Group controlId="name">
                            <Form.Label>Department</Form.Label>
                            <Form.Control type="text" placeholder="Enter department" value={this.state.name} onChange={this.handleChange} name="name" required />
                            <Form.Text className="text-muted">
                                {errors.name.length > 0 && <span className='error' style={{ color: 'red' }}>{errors.name}</span>}
                            </Form.Text>
                        </Form.Group>

                        <Button variant="primary" type="submit" size="md" className="col-md-6 offset-md-3 mt-1 text-center">Submit</Button>

                    </Form>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default connect()(DepartmentsNew)