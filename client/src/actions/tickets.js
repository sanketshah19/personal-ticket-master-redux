import axios from '../config/axios';
import swal from 'sweetalert';

export const getAllTickets = (tickets) => {
    return {
        type: 'GET_ALL_TICKETS',
        payload: tickets
    }
}

export const dupTickets = (tickets) => {
    return {
        type: 'DUP_TICKETS',
        payload: tickets
    }
}

export const filterTickets = (action, dupTickets) => {
    return {
        type: action,
        payload: dupTickets
    }
}

export const filterTicketsByCode = (code, dupTickets) => {
    return {
        type: 'CODE',
        payload: {
            dupTickets,
            code
        }
    }
}

export const ticketStatus = (ticket) => {
    return {
        type: 'EDIT_TICKET',
        payload: ticket
    }
}

export const addTicket = (ticket) => {
    return {
        type: 'ADD_TICKET',
        payload: ticket
    }
}

export const startGetAllTickets = () => {
    return (dispatch) => {
        axios.get('/tickets', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                const tickets = response.data
                dispatch(getAllTickets(tickets))
                dispatch(dupTickets(tickets))
            })
            .catch((err) => {
                swal("Oops", `${err}` ,"error")
            })
    }
}

export const startTicketStatus = (id, formData) => {
    return (dispatch) => {
        axios.put(`/tickets/${id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                const ticket = response.data
                dispatch(ticketStatus(ticket))
            })
            .catch((err) => {
                swal("Oops", `${err}`, "error")
            })
    }
}

export const startAddTicket = (formData) => {
    return (dispatch) => {
        axios.post('/tickets', formData, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                if(response.data.hasOwnProperty('errmsg')){
                    if(response.data.name === "MongoError" && response.data.code === 11000){
                        swal ("Oops", `${Object.keys(response.data.keyValue)} already exists` ,"error")
                    }
                }else if(response.data.hasOwnProperty('errors')){
                    swal("Oops!", `${response.data.message}`, "error")
                }else{
                    swal("Success!", "Ticket Added Successfully!", "success")
                        const ticket = response.data
                        dispatch(addTicket(ticket))
                }
            })
            .catch((err) => {
                swal("Oops", `${err}`, "error")
            })
    }
}