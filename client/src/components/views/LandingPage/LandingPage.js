import React, { useEffect } from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom'

function LandingPage(props) {

    // Page에 진입하자 마자 바로 실행을 의미
    // CORS 정책에 의해 Error 발생
    // Why ? ClientPort = 3000 / ServerPort = 5000 
    // 서로다른 포트를 가지고 있기때문에 아무 설정없이 Request요청을 보낼수 없다.
    // => Proxy 설정이 필요
    useEffect(() => {
        axios.get("/api/hello")
            .then(response => {
                console.log(response.data)
            })
    }, [])

    const logoutHandler = () => {
        axios.get("/api/user/logout")
            .then(response => {
                if (response.data.success) {
                    props.history.push('/login')
                } else {
                    alert("로그아웃 실패 !")
                }
            })
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <h2>시작페이지</h2>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    )
}

export default withRouter(LandingPage)
