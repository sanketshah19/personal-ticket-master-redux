import React from 'react';
import {connect} from 'react-redux';

import TicketsForm from './Form';
import TicketImg from '../../Images/TicketForm.jpg';

import {startGetAllCustomers} from '../../actions/customers';
import {startGetAllDepartments} from '../../actions/departments';
import {startGetAllEmployees} from '../../actions/employees';
import {startGetSingleTicket, startEditTicket} from '../../actions/tickets';

class TicketsEdit extends React.Component{
    
    componentDidMount(){
        const id = this.props.match.params.id
        this.props.dispatch(startGetSingleTicket(id))
        this.props.dispatch(startGetAllCustomers())
        this.props.dispatch(startGetAllDepartments())
        this.props.dispatch(startGetAllEmployees())
    }

    handleSubmit = (formData) => {
        const id = this.props.match.params.id
        this.props.dispatch(startEditTicket(id, formData, this.props))
    }

    render(){
        return(
            <div>
                <h2 className="text-center">Edit Ticket Information</h2><hr/>
                <div className="row mt-3">
                    <div className="col-md-7 mx-auto">
                        <img src={TicketImg} alt="Ticket Form" style={{width: '100%', heigth: '450px'}} />
                    </div>
                    <div className="col-md-5 mx-auto">
                    { Object.values(this.props.ticket).length !== 0 && 
                        <TicketsForm customers={this.props.customers} departments={this.props.departments} employees={this.props.employees} ticket={this.props.ticket} handleSubmit={this.handleSubmit}/>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customers,
        departments: state.departments,
        employees: state.employees,
        ticket: state.singleTicket
    }
}

export default connect(mapStateToProps)(TicketsEdit)