import axios from '../config/axios';
import swal from 'sweetalert';

export const getAllDepartments = (departments) => {
    return {
        type: 'GET_ALL_DEPARTMENTS',
        payload: departments
    }
}

export const addDepartment = (department) => {
    return {
        type: 'ADD_DEPARTMENT',
        payload: department
    }
}

export const removeDepartment = (id) => {
    return {
        type: 'REMOVE_DEPARTMENT',
        payload: id
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

export const startAddDepartment = (formData) => {
    return (dispatch) => {
        axios.post('/departments', formData, {
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
                    swal("Success!", "Department Added Successfully!", "success")
                    dispatch(addDepartment(response.data))
                }
            })
            .catch((err) => {
                swal("Oops", `${err}` ,"error")
            })
    }
}

export const startRemoveDepartment = (id) => {
    return (dispatch) => {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Department Removed Successfully!", {
                icon: "success",
              });
              axios.delete(`/departments/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
                .then((response) => {
                    dispatch(removeDepartment(id))
                })
                .catch((err) => {
                    swal("Oops", `${err}` ,"error")
                })
            } 
          })
    }
}