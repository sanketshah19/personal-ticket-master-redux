import React from 'react';
import {connect} from 'react-redux';

import TicketsForm from './Form';
import {startAddTicket} from '../../actions/tickets';

class TicketsNew extends React.Component{

    handleSubmit = (formData) => {
        this.props.dispatch(startAddTicket(formData))
    }
    
    render(){
        return(
            <div>
                <TicketsForm customers={this.props.customers} departments={this.props.departments} employees={this.props.employees} handleSubmit={this.handleSubmit}/>
            </div>
        )
    }

}

export default connect()(TicketsNew)