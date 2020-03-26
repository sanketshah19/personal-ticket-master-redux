import axios from '../config/axios';
import swal from 'sweetalert';

export const getAllEmployees = (employees) => {
    return {
        type: 'GET_ALL_EMPLOYEES',
        payload: employees
    }
}

export const startGetAllEmployees = () => {
    return (dispatch) => {
        axios.get('/employees', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                const employees = response.data
                dispatch(getAllEmployees(employees))
            })
            .catch((err) => {
                swal("Oops", `${err}` ,"error")
            })
    }
}