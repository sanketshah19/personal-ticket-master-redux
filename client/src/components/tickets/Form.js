import React from 'react';
import swal from 'sweetalert';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Form} from 'react-bootstrap';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class TicketsForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            employeesList: props.ticket ? props.ticket.employees : [],
            customer: props.ticket ? ( props.ticket.customer && props.ticket.customer._id) :'',
            department: props.ticket ? ( props.ticket.department && props.ticket.department._id) :'',
            employees: props.ticket ? [] : [],
            priority: props.ticket ? props.ticket.priority : '',
            message: props.ticket ? props.ticket.message : '',
            errors: {
                customer: '',
                department: '',
                employees: '',
                priority: '',
                message: ''
            }
        }
    }

    handleChange= (e) => {
        const {name, value} = e.target
        const {errors} = this.state

        if(name === 'department'){
            let employeesList = this.props.employees.filter(emp => (emp.department && emp.department._id) === value )
            this.setState({employeesList, [name]: value})
            this.setState({employees: []})
        }else{
            switch (name) {
                case 'customer': 
                errors.customer = 
                  value.length < 1
                    ? 'Select the customer!'
                    : '';
                break;
                case 'department': 
                    errors.department = 
                    value.length < 1
                    ? 'Select the department!'
                    : '';
                    break;
                case 'employees': 
                    errors.employees = 
                    value.length === 0
                    ? 'Select the employee!'
                    : '';
                    break;
                case 'priority': 
                    errors.priority = 
                    value === ''
                        ? 'Select priority!'
                        : '';
                    break;
                case 'message': 
                    errors.message = 
                    value.length < 1
                        ? 'Message cannot be empty!'
                        : '';
                    break;
                default:
                    break;
            }
            this.setState({errors, [name]: value});
        }
    }

    handleEmpList = () => {
        if(this.state.department === ""){
            const errors = this.state.errors
            errors.employees = "First select the department!"
            this.setState({errors})
        }
    }

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
          (val) => val.length > 0 && (valid = false)
        );
        (this.state.employees.length === 0 && (valid = false))
        return valid;
      }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.validateForm(this.state.errors)){
            const formData = {
                code: `DCT-${Math.floor(Math.random() * 1000)}`,
                customer: this.state.customer,
                department: this.state.department,
                employees: this.state.employees,
                priority: this.state.priority,
                message: this.state.message
            }
            this.props.handleSubmit(formData)
            this.setState({
                customer: '',
                department: '',
                employees: [],
                priority: '',
                message: ''
            })
        }else{
            swal ("Oops","Please fill all the details correctly!","error")
        }
    }

    render(){
        const {errors} = this.state
        return(
            <div>
                <Form onSubmit={this.handleSubmit} style={{ border: "thin solid #007BFF", padding: "2rem", margin: "1rem", borderRadius:'15px'}} className="mr-3">
                    
                    <Form.Group controlId="customer">
                        <Form.Label>Customer</Form.Label>
                        <Form.Control as="select" value={this.state.customer} onChange={this.handleChange} name="customer" required>
                            <option value="">Select Customer</option>
                            {
                                this.props.customers.map((cust) => {
                                    return(
                                        <option key={cust._id} value={cust._id}>{cust.name}</option>
                                    )
                                })
                            }
                        </Form.Control>
                        <Form.Text className="text-muted">
                            {errors.customer.length > 0 && <span className='error' style={{ color: 'red' }}>{errors.customer}</span>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="department">
                        <Form.Label>Department</Form.Label>
                        <Form.Control as="select" value={this.state.department} onChange={this.handleChange} name="department" required>
                            <option value="">Select Department</option>
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

                    <Form.Group controlId="employees">
                        <Form.Label>Employee</Form.Label>
                        <FormControl style={{ minWidth: '120', maxWidth: '300', display: 'flex',flexWrap: 'wrap'}}>
                            <Select
                            labelId="demo-mutiple-name-label"
                            id="demo-mutiple-name"
                            multiple
                            value={this.state.employees}
                            onChange={this.handleChange}
                            onClick={this.handleEmpList}
                            name = "employees"
                            required>
                            <MenuItem disabled value="">
                                <em>Select Employee</em>
                            </MenuItem>
                            {
                                this.state.employeesList.map((emp) => (
                                    <MenuItem key={emp._id} value={emp._id} >
                                        {emp.name}
                                    </MenuItem>
                                ))
                            }
                            </Select>
                        </FormControl>
                        <Form.Text className="text-muted">
                            {errors.employees.length > 0 && <span className='error' style={{ color: 'red' }}>{errors.employees}</span>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="priority">
                        <Form.Label>Priority</Form.Label>
                            <div required>
                                <Form.Check type="radio" label="Low" name="priority" value="Low" onChange={this.handleChange} checked={this.state.priority === "Low"} inline/>
                                <Form.Check type="radio" label="Medium" name="priority" value="Medium" onChange={this.handleChange} checked={this.state.priority === "Medium"} inline/>
                                <Form.Check type="radio" label="High" name="priority" value="High" onChange={this.handleChange} checked={this.state.priority === "High"} inline />
                            </div>
                        <Form.Text className="text-muted">
                            {errors.priority.length > 0 && <span className='error' style={{ color: 'red' }}>{errors.priority}</span>}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="message">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows="2" value={this.state.message} onChange={this.handleChange} name="message" required/>
                        <Form.Text className="text-muted">
                            {errors.message.length > 0 && <span className='error' style={{ color: 'red' }}>{errors.message}</span>}
                        </Form.Text>
                    </Form.Group>
                   
                    { this.props.ticket ?
                        <div>
                            <Button className="col-md-3 offset-md-3 mt-1" variant="primary" type="submit">Submit</Button>
                            <Link to="/tickets"><Button className="col-md-3 ml-1 mt-1" variant="primary" type="submit">Back</Button></Link>
                        </div>
                        :
                        <Button className="col-md-6 offset-md-3" variant="primary" type="submit">Submit</Button>
                    }
                </Form>
            </div>
        )
    }
}

export default connect()(TicketsForm)