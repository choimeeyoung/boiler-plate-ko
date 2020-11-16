import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import {withRouter }from 'react-router-dom'

function LoginPage(props) {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const dispatch = useDispatch(); 

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onSubmistHandler = (event) => {
        event.preventDefault();
        let body = {
            email: Email,
            password: Password
        }
        dispatch(loginUser(body))
        .then(reponse => {
            if(reponse.payload.loginSuccess){
                props.history.push('/')
            }
        })
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmistHandler}>
            <h2 style={{display:'block', textAlign:'center'}}>로그인</h2>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} style={{border:'1px solid'}} />

                <br />
                <button>Longin</button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
