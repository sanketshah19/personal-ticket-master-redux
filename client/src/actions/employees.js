import axios from '../config/axios';
import swal from 'sweetalert';

export const getAllEmployees = (employees) => {
    return {
        type: 'GET_ALL_EMPLOYEES',
        payload: employees
    }
}

export const addEmployee = (employee) => {
    return {
        type: 'ADD_EMPLOYEE',
        payload: employee
    }
}

export const editEmployee = (employee) => {
    return {
        type: 'EDIT_EMPLOYEE',
        payload: employee
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

export const startAddEmployee = (formData, props) => {
    return (dispatch) => {
        axios.post('/employees', formData, {
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
                    swal("Success!", "Employee Added Successfully!", "success")
                    props.history.push('/employees')
                    dispatch(addEmployee(response.data))
                }
            })
            .catch((err) => {
                swal("Oops!", `${err}`, "error");
            })
    }
}

export const startEditEmployee = (formData, id) => {
    return (dispatch) => {
        axios.put(`/employees/${id}`, formData, {
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
                dispatch(editEmployee(response.data))
            }
        })
        .catch((err) => {
            swal ("Oops", `${err}` ,"error")
        })
    }
}