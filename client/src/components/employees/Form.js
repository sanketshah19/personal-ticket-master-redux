import React from 'react';
import swal from 'sweetalert';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';

import {startGetAllDepartments} from '../../actions/departments';

class EmployeesForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name: props.employee ? props.employee.name : '',
            email: props.employee ? props.employee.email : '',
            mobile: props.employee ? props.employee.mobile : '',
            department: props.employee ? ( props.employee.department && props.employee.department._id) : '',
            errors: {
                name: '',
                email: '',
                mobile: '',
                department: ''
            }
        }
    }

    componentDidMount(){
        this.props.dispatch(startGetAllDepartments())
    }

    handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        let errors = this.state.errors
        const validEmailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        const validMobileRegex = RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/)

        switch(name){
            case 'name': 
                errors.name = 
                    value.length < 1 
                    ? 'Name cannot be empty!'
                    : '';
                    break;
            case 'email': 
                errors.email = 
                    validEmailRegex.test(value)
                    ? ''
                    : 'Email is not valid!';
                    break;
            case 'mobile': 
                errors.mobile = 
                    validMobileRegex.test(value)
                    ? ''
                    : 'Mobile number is not valid!';
                    break;
            case 'department': 
            errors.department = 
                value.length < 1 
                ? 'Select the department!'
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
                name: this.state.name,
                email: this.state.email,
                mobile: this.state.mobile,
                department: this.state.department
            }
            this.props.handleSubmit(formData)
        }else{
            swal("Oops","Please fill all the details correctly!","error")
        }
    }

    render(){
        const {errors} = this.state
        return(
            <div>
                <Form onSubmit={this.handleSubmit} style={{ border: "thin solid #007BFF", padding: "2rem", margin: "2rem", borderRadius:'15px'}}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={this.state.name} onChange={this.handleChange} name="name" required />
                        <Form.Text className="text-muted">
                            {errors.name.length > 0 && <span className='error' style={{ color: 'red' }}>{errors.name}</span>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} name="email" required />
                        <Form.Text className="text-muted">
                            {errors.email.length > 0 && <span className='error' style={{ color: 'red' }}>{errors.email}</span>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="mobile">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="text" placeholder="Enter mobile number" value={this.state.mobile} onChange={this.handleChange} name="mobile" required />
                        <Form.Text className="text-muted">
                            {errors.mobile.length > 0 && <span className='error' style={{ color: 'red' }}>{errors.mobile}</span>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="department">
                        <Form.Label>Department</Form.Label>
                        <Form.Control as="select" value={this.state.department} onChange={this.handleChange} name="department" required >
                            <option value="">Select</option>
                            {
                                this.props.departments.map((dept) => {
                                    return(
                                        <option key={dept._id} value={dept._id}>{dept.name}</option>
                                    )
                                })
                            }
                        </Form.Control>
                        <Form.Text className="text-muted">
                            {errors.department.length > 0 && <span className='error' style={{ color: 'red' }}>{errors.department}</span>}
                        </Form.Text>
                    </Form.Group>

                    { !this.props.employee ? 
                        <span>
                            <Button variant="primary" type="submit" size="md" className="col-md-3 offset-md-3 mt-1 text-center">Submit</Button>
                            <Link to="/employees"><Button variant="primary" size="md" className="col-md-3 ml-2 mt-1 text-center">Back</Button></Link>
                        </span>
                    :
                        <Button variant="primary" type="submit" size="md" className="col-md-6 offset-md-3 mt-1 text-center">Submit</Button>
                    }
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        departments: state.departments
    }
}

export default connect(mapStateToProps)(EmployeesForm)