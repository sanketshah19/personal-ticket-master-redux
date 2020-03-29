import React from 'react';
import swal from 'sweetalert';
import {Button,Form} from 'react-bootstrap';

import axios from '../../config/axios';

class ReserPassword extends React.Component{
    constructor(props){
        super(props)
        this.state={
            password:'',
            confirmPassword:'',
            errors: {
                password: ''
            }
        }
    }

    handleChange=(e)=>{
        e.preventDefault()
        const { name, value } = e.target
        let errors = this.state.errors

        switch (name) {
            case 'password': 
              errors.password = 
                value.length < 6
                  ? 'Password must be 6 characters long!'
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

    handleLoginSubmit = (e) => {
        e.preventDefault()
        if(this.validateForm(this.state.errors)){
            axios.post(`/new-password${this.props.location.search}`, this.state)
            .then((response)=>{
                if(response.data.errors){
                    swal("Oops", `${response.data.errors.message}`, "error")
                }
                else{
                    if(response.data._id){
                        swal("Success!", "Your password has been changed successfully!", "success")
                        this.props.history.push('/users/login')
                    }
                }
            })
            .catch((err)=>{
                swal("Oops", `${err}`, "error")
            })
        }else{
            swal ("Oops","Please fill all the details correctly!","error")
        }
    }

    render(){
        const {errors} = this.state;
        return(
            <div className="row">
                <div className="col-md-5 offset-md-3">
                    <h2 className="text-center">Reset Password</h2><hr/>
                        <Form onSubmit={this.handleLoginSubmit} style={{ border: "thin solid #007BFF", padding: "2rem", margin: "2rem", borderRadius:'15px'}}>
                        <Form.Group controlId="formGroupPassword">
                                <Form.Label>Passoword</Form.Label>
                                <Form.Control name="password" value={this.state.password} onChange={this.handleChange} type="password" required={true} placeholder="Enter password" />
                                <Form.Text className="text-muted">
                                {errors.password.length > 0 && <span className='error' style={{ color: 'red' }}>{errors.password}</span>}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formGroupConfirmPassword">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} required={true} type="password" placeholder="Re-enter Password" />
                            </Form.Group>
                            {
                            (this.state.password === this.state.confirmPassword) ? 
                                <Button variant="primary" type="submit" size="lg" className="col-md-6 offset-md-3" value="Submit">
                                Submit
                                </Button>
                            :
                                <span style={{ color: 'red' }}>Passwords did not match!</span>
                            }
                        
                        </Form>
                
                </div>
            </div>
        )
    }
}

export default ReserPassword