import React,{useEffect} from 'react';
import axios from 'axios';

function LandingPage() {

    // Page에 진입하자 마자 바로 실행을 의미
    // CORS 정책에 의해 Error 발생
    // Why ? ClientPort = 3000 / ServerPort = 5000 
    // 서로다른 포트를 가지고 있기때문에 아무 설정없이 Request요청을 보낼수 없다.
    // => Proxy 설정이 필요
    useEffect(() => {
        axios.get("/api/hello")
        .then(response => {
            console.log(response.data)})
    },[])

    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
           <h2>시작페이지</h2>
        </div>
    )
}

export default LandingPage
