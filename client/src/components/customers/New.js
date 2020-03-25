import React from 'react';
import {connect} from 'react-redux';
import CustomersForm from './Form';

import FormImg from '../../Images/CustForm.jpg';

import {startAddCustomer} from '../../actions/customers';

class CustomersNew extends React.Component{

    handleSubmit = (formData) => {
        this.props.dispatch(startAddCustomer(formData, this.props))
    }

    render(){
        return(
            <div>
                <h2 className="text-center">Add Customer Information</h2><hr/>
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <img style={{width: '100%', height: '450px'}} src={FormImg} alt="Customer Form" />
                    </div>
                    <div className="col-md-6 mx-auto">
                        <CustomersForm handleSubmit={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        )
    }

}

export default connect()(CustomersNew)