import axios from '../config/axios';
import swal from 'sweetalert';

export const startRegisterUser = (formData, props) => {
    return (dispatch) => {
        axios.post('/users/register', formData)
            .then((response) => {
              if(response.data.hasOwnProperty('errmsg')){
                if(response.data.name === "MongoError" && response.data.code === 11000){
                  swal ("Oops", `${Object.keys(response.data.keyValue)} already exists` ,"error")
                }
              }else if(response.data.hasOwnProperty('errors')){
                swal("Oops!", `${response.data.message}`, "error")
              }else{
                props.history.push('/users/login')
                swal("Success!", "User Registered!", "success")
              }
            })
            .catch((err) => {
              swal ("Oops", `${err}` ,"error")
            })
    }
}