import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {
    // SpecificComponent
    // 이동 페이지 URL

    //  option
    //       null => 아무나 출입이 가능한 페이지
    //       true => 로그인한 유저만 출입이 가능한 페이지
    //       false => 로그인한 유저는 출입이 불가능한 페이지

    // adminRount 
    // 어드민만 출입이 가능한 페이지 인경우 true
    // 사용하지 않은 경우 : null

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth())
                .then(response => {

                    if (!response.payload.isAuth) {               // 로그인 하지 않은상태
                        if (option) {                             // option === true 로그인한 유저만 출입가능한 페이지
                            props.history.push('/login');
                        }
                    } else {                                     // 로그인 한 상태
                        if (!response.payload.isAdmin && adminRoute) { // 어드민 출입이 불가능 한 사람이 어드민 출입하려는 경우
                            props.history.push('/');
                        } else {
                            if (!option) {                        // 로그인한 유저가 출입 불가능 한 페이지를 집입 하려할때 
                                props.history.push('/');
                            }
                        }
                    }
                })
        }, [])
        return (<SpecificComponent />)
    }

    return AuthenticationCheck;
}