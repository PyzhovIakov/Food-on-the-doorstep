import React,{useState,useContext} from "react"
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import useHttp from '../../hooks/http.hook'
import FormAuth from "../../Component/FormAuth/FormAuth";
import AuthContext from './../../context/AuthContext'

export default function Regis() {
    const {loading,request,error,ClearError} = useHttp()
    const [form, setForm] = useState({email:'',password:'', fullname:''})
    const auth = useContext(AuthContext)
    const [message, setMessage] = useState(null)
    const [errors, setErrors] = useState(null)

    const ChangeHandler= event=>{
        setForm({...form,[event.target.name]:event.target.value})
    }

    const registerHander  = async () =>{
        try{
            const data = await request('/auth/registration', 'POST',{...form,role:'user'})
            auth.login(data.token, data._id)
            if(data.errors){setErrors(data.errors)}
            if(data.message){setMessage(data.message)}
        }catch(e){console.log('Regis registerHander', e)}
    } 

    const TextFields =[
        {id:'fullName',label:"ФИО", name:"fullname", type:'text'},
        {id:'email',label:"email", name:"email", type:'email'},
        {id:'password',label:"Пароль", name:"password", type:'password'}
    ]

    return (
        <div>
            {error?<Alert severity="error" onClose={() => {ClearError()}}>{error}</Alert>:null}
            {errors?<Alert severity="warning" onClose={() => {setErrors(null)}}>{errors}</Alert>:null}
            {message?<Alert severity="info" onClose={() => {setMessage(null)}}>{message}</Alert>:null}
            <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
            >
                <FormAuth
                    formTitle={'Регистрация'}
                    textFields={TextFields}
                    onChangeTextFields={ChangeHandler}
                    buttononClick={registerHander}
                    buttonodisabled={loading}
                    buttonTitle={'Зарегистрироваться'}
                />
            </Stack>
        </div>
    );
}