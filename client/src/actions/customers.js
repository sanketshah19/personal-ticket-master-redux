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