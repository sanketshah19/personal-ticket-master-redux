import React from 'react';
import {connect} from 'react-redux';

import EmployeesForm from './Form';
import FormImg from '../../Images/EmpForm.jpg';

import {startAddEmployee} from '../../actions/employees';

class EmployeesNew extends React.Component{

    handleSubmit = (formData) => {
        this.props.dispatch(startAddEmployee(formData, this.props))
    }

    render(){
        return(
            <div>
                <h2 className="text-center">Add Employee Information</h2><hr/>
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <img style={{width: '100%', height: '450px'}} src={FormImg} alt="Employee Form" />
                    </div>
                    <div className="col-md-6 mx-auto">
                        <EmployeesForm handleSubmit={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(EmployeesNew)