import axios from '../config/axios';
import swal from 'sweetalert';

export const getAllCustomers = (customers) => {
    return {
        type: 'GET_ALL_CUSTOMERS',
        payload: customers
    }
}

export const addCustomer = (customer) => {
    return {
        type: 'ADD_CUSTOMER',
        payload: customer
    }
}

export const editCustomer = (customer) => {
    return {
        type: 'EDIT_CUSTOMER',
        payload: customer
    }
}

export const removeCustomer = (id) => {
    return {
        type: 'REMOVE_CUSTOMER',
        payload: id
    }
}

export const singleCustomer = (customer) => {
    return {
        type: 'SINGLE_CUSTOMER',
        payload: customer
    }
}

export const custTicket = (tickets) => {
    return {
        type: 'ASSO_TICKETS',
        payload: tickets
    }
}

export const startGetAllCustomers = () => {
    return (dispatch) => {
        axios.get('/customers', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                const customers = response.data
                dispatch(getAllCustomers(customers))
            })
            .catch((err) => {
                swal("Oops", `${err}` ,"error")
            })
    }
}

export const startAddCustomer = (formData, props) => {
    return (dispatch) => {
        axios.post('/customers', formData, {
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
                swal("Success!", "Customer Added Successfully!", "success")
                props.history.push('/customers')
                dispatch(addCustomer(response.data))
            }
        })
        .catch((err) => {
            swal("Oops!", `${err}`, "error");
        })
    }
}

export const startEditCustomer = (id, formData) => {
    return (dispatch) => {
        axios.put(`/customers/${id}`, formData, {
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
                swal("Success!", "Information Updated Successfully!", "success")
                dispatch(editCustomer(response.data))
            }
        })
        .catch((err) => {
            swal ("Oops", `${err}` ,"error")
        })
    }
}

export const startRemoveCustomer = (id) => {
    return (dispatch) => {
        axios.get(`/customers/tickets/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                const tickets = response.data.tickets
                if(tickets.length > 0){
                    swal ( "Can't remove customer", "Ticket is associated with customer!", "error" )
                }else{
                    swal({
                        title: "Are you sure?",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      })
                      .then(willDelete => {
                        if (willDelete) {
                            axios.delete(`/customers/${id}`, {
                                headers: {
                                    'x-auth': localStorage.getItem('authToken')
                                }
                            })
                            .then((response) => {
                                if(response.data.hasOwnProperty('errors')){
                                    swal("Oops!", `${response.data.message}`, "error");
                                }else{
                                    swal("Customer Removed Successfully!", {
                                        icon: "success",
                                      })
                                    dispatch(removeCustomer(id))
                                }
                            })
                            .catch((err) => {
                                swal ("Oops", `${err}` ,"error")
                            })
                        }
                      })
                }
            })
            .catch((err) => {
                swal ("Oops", `${err}` ,"error")
            })
    }
}

export const startGetSingleCustomer = (id) => {
    return (dispatch) => {
        axios.get(`/customers/tickets/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then((response) => {
            const customer = response.data.customer, tickets = response.data.tickets
            dispatch(singleCustomer(customer))
            dispatch(custTicket(tickets))
        })
        .catch((err) => {
            swal("Oops", `${err}`, "error")
        })
    }
}