import React from 'react';
import {connect} from 'react-redux';
import {Button, Modal} from 'react-bootstrap';
import CustomersForm from './Form';

import {startEditCustomer} from '../../actions/customers';

class CustomersEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            customer: {},
            show: false
        }
    }

    handleShow = () => {
        const customer = this.props.customer
        this.setState({customer, show: true})
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleSubmit = (formData) => {
        const id = this.props.customer._id
        this.setState({show: false})
        this.props.dispatch(startEditCustomer(id, formData))
    }

    render(){
        return(
            <span>
                <Button variant="outline-success" onClick={this.handleShow}>
                    Edit
                </Button>

                {
                    Object.keys(this.state.customer).length !== 0 &&
                    <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <h2 className="text-center">Edit Customer Information</h2>
                        <CustomersForm customer={this.state.customer} handleSubmit={this.handleSubmit}/>
                    </Modal.Body>
                </Modal>
                }
            </span>
        )
    }

}

export default connect()(CustomersEdit)