import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/register_action';



function RegisterPager(props) {
    const [Email,setEmail] = useState("");
    const [Name,setName] = useState("");
    const [Password,setPassword] = useState("");
    const [ConfirmPassword,setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const onEmailHandler = (event) =>{
        setEmail(event.currentTarget.value);
    }

    const onNameHandler = (event) =>{
        setName(event.currentTarget.value);
    }

    const onPasswordHandler = (event) =>{
        setPassword(event.currentTarget.value);
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmistHandler = (event) =>{
        event.preventDefault();

        if(Password !== ConfirmPassword){
            return alert("Password 와 ConfirmPassword는 일치 해야 합니다.");
        }

        let body = {
            email: Email,
            name: Name,
            password: Password
        }

        dispatch(registerUser(body))
        .then(response =>{
            if(response.payload.success){
                props.history.push('/')
            }
        })

    }









    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmistHandler}>
                <h2 style={{ display: 'block', textAlign: 'center' }}>회원가입</h2>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <br/>
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} style={{ border: '1px solid' }}  />
                <br/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} style={{ border: '1px solid' }} />
                <br/>
                <label>ConfirmPassword</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} style={{ border: '1px solid' }} />
                <br/>
                <br />
                <button>Register</button>
            </form>
        </div>
    )
}

export default RegisterPager
