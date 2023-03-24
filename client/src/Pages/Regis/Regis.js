import React, { useState, useContext } from "react"
import Alert from '@mui/material/Alert'
import useHttp from '../../hooks/http.hook'
import FormAuth from "../../Component/FormAuth/FormAuth"
import AuthContext from './../../context/AuthContext'

export default function Regis() {
    const { loading, request, error, message, ClearError, ClearMessage } = useHttp()
    const [form, setForm] = useState({ email: '', password: '', fullname: '' })
    const auth = useContext(AuthContext)

    const ChangeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHander = async () => {
        try {
            const data = await request('/auth/registration', 'POST', { ...form, role: 'user' })
            auth.login(data.token, data._id)
            setForm({ email: '', password: '', fullname: '' })
        } catch (e) { console.log('Regis registerHander', e) }
    }

    const TextFields = [
        { id: 'fullName', label: "ФИО", name: "fullname", type: 'text' },
        { id: 'email', label: "email", name: "email", type: 'email' },
        { id: 'password', label: "Пароль", name: "password", type: 'password' }
    ]

    if (error) { setTimeout(() => ClearError(), 6000) }
    if (message) { setTimeout(() => ClearMessage(), 6000) }

    return (
        <div>
            {error ? <Alert severity="error" onClose={ClearError}>{error}</Alert> : null}
            {message ? <Alert severity="error" onClose={ClearMessage}>{message}</Alert> : null}
            <FormAuth
                formTitle={'Регистрация'}
                textFields={TextFields}
                viewSelectRole={false}
                formValue={form}
                onChangeTextFields={ChangeHandler}
                buttononClick={registerHander}
                buttonLoading={loading}
                buttonTitle={'Зарегистрироваться'}
            />
        </div>
    );
}