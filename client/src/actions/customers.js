import axios from '../config/axios';
import swal from 'sweetalert';

export const getAllCustomers = (customers) => {
    return {
        type: 'GET_ALL_CUSTOMERS',
        payload: customers
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