import React,{useState, useContext} from "react"
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import useHttp from '../../hooks/http.hook'
import AuthContext from './../../context/AuthContext'
import FormAuth from "../../Component/FormAuth/FormAuth";

export default function Login() {
    const {loading,request,error,ClearError} = useHttp()
    const [form, setForm] = useState({email:'',password:''})
    const auth = useContext(AuthContext)
    const [message, setMessage] = useState(null)
    const [errors, setErrors] = useState(null)

    const ChangeHandler= event=>{
        setForm({...form,[event.target.name]:event.target.value})
    }

    const loginHander  = async () =>{
        try{
           const data = await request('/auth/login', 'POST',{...form})
           auth.login(data.token, data._id)
           if(data.errors){setErrors(data.errors)}
           if(data.message){setMessage(data.message)}
           setForm({email:'',password:''})
        }catch(e){console.log('Login loginHander', e)}
    }

    const TextFields =[
        {id:'email',label:"email",  name:"email", type:'email'},
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
                    formTitle={'Авторизация'}
                    textFields={TextFields}
                    viewSelect={false}
                    formValue={form}
                    onChangeTextFields={ChangeHandler}
                    buttononClick={loginHander}
                    buttonodisabled={loading}
                    buttonTitle={'Войти'}
                />
            </Stack>
        </div>
    );
}