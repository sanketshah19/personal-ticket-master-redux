import React from 'react';
import swal from 'sweetalert';
import {connect} from 'react-redux';
import {Form, Button} from 'react-bootstrap';

import LoginImg from '../../Images/Login.jpg';

import {startLoginUser} from '../../actions/user';

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {
                email: '',
                password: ''
            }
        }
    }

    handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        let errors = this.state.errors
        const validEmailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)

        switch (name) {
          case 'email': 
            errors.email = 
              validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
            break;
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

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.validateForm(this.state.errors)){
            const formData = {
              email: this.state.email,
              password: this.state.password
            }
            this.props.dispatch(startLoginUser(formData, this.props))
        }else{
            swal ("Oops","Please fill all the details correctly!","error")
        }
    }


    render(){
        const {errors} = this.state;
        return(
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h2 className="text-center">Sign In</h2><hr/>
                    <Form onSubmit={this.handleSubmit} style={{ border: "thin solid #007BFF", padding: "2rem", margin: "2rem", borderRadius:'15px'}}>

                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} name="email" required/>
                                <Form.Text className="text-muted">
                                {errors.email.length > 0 && <span className='error' style={{ color: 'red' }}>{errors.email}</span>}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} name="password" required/>
                                <Form.Text className="text-muted">
                                {errors.password.length > 0 && <span className='error' style={{ color: 'red' }}>{errors.password}</span>}
                                </Form.Text>
                            </Form.Group>

                            <Button variant="primary" type="submit" size="lg" className="col-md-6 offset-md-3" value="Submit">
                                Login
                            </Button>
                        </Form>
                </div>
                <div className="col-md-6 mx-auto">
                    <img style={{width: '100%', height: '100%'}} src={LoginImg} alt="Login"/>
                </div>
            </div>
        )
    }

}

export default connect()(Login)