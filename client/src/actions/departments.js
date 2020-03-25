import axios from '../config/axios';
import swal from 'sweetalert';

export const getAllDepartments = (departments) => {
    return {
        type: 'GET_ALL_DEPARTMENTS',
        payload: departments
    }
}

export const startGetAllDepartments = () => {
    return (dispatch) => {
        axios.get('/departments', {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                const departments = response.data
                dispatch(getAllDepartments(departments))
            })
            .catch((err) => {
                swal("Oops", `${err}` ,"error")
            })
    }
}