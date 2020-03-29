import React from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
import {Button,Form} from 'react-bootstrap';

import axios from '../../config/axios';

import ForgotPasswordImg from '../../Images/FogotPassword.jpg';

class ForgotPassword extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email:'',
            isSubmit:false
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    handleLoginSubmit = (e) => {
        e.preventDefault()
        axios.post('/reset',this.state)
                .then((response)=>{
                    if(response.data.errors){
                        swal("Oops", `${response.data.errors}`, "error")
                    }else{
                        this.setState({email:'', isSubmit:true})
                    }
                })
                .catch((err)=>{
                    swal("Oops", `${err}`, "error")
                })
    }
    
    render(){
        return(
            <div className="row mt-3">
                <div className="col-md-7 mx-auto">
                    <img style={{width: '95%', height: '90%'}} src={ForgotPasswordImg} alt="Forgot Password"/>
                </div>
                <div className="col-md-5 mx-auto">
                    {
                    (this.state.isSubmit) ?
                        <div>
                            <h4 className="text-center">Password reset Link is sent to the Registered Email. Please Login using the link!</h4>
                            <Link to="/users/login"><Button variant="primary" size="md" className="col-md-3 offset-md-4 mt-1">Back</Button></Link>
                        </div>     
                        :
                        <div>
                            <h2 className="text-center">Forgot Password</h2><hr/>
                            <Form onSubmit={this.handleLoginSubmit} style={{ border: "thin solid #007BFF", padding: "2rem", margin: "2rem", borderRadius:'15px'}}>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control name="email" value={this.state.email} onChange={this.handleChange} type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Button variant="primary" type="submit" size="md" className="col-md-3 offset-md-3 mt-1 text-center">Submit</Button>
                                <Link to="/users/login"><Button variant="primary" size="md" className="col-md-3 ml-2 mt-1 text-center">Back</Button></Link>
                            </Form>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default ForgotPassword