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

    const ChangeHandler= event=>{
        setForm({...form,[event.target.name]:event.target.value})
    }

    const loginHander  = async () =>{
        try{
           const data = await request('/auth/login', 'POST',{...form})
           auth.login(data.token, data._id)
        }catch(e){}
    }

    const TextFields =[
        {id:'email',label:"email",  name:"email", type:'email'},
        {id:'password',label:"Пароль", name:"password", type:'password'}
    ]

    return (
        <div>
            {error?<Alert severity="error" onClose={() => {ClearError()}}>{error}</Alert>:null}
            <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
            >
                <FormAuth
                    formTitle={'Авторизация'}
                    textFields={TextFields}
                    onChangeTextFields={ChangeHandler}
                    buttononClick={loginHander}
                    buttonodisabled={loading}
                    buttonTitle={'Войти'}
                />
            </Stack>
        </div>
    );
}