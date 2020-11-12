import {combineReducers} from 'redux';
import user from './user_reducer';

// reducer 란 : 어떻게 state가 변하는 가를 보여준 후 변한 마지막의 값을 Return 해준다
// Store 안에 있는 여러개의 reducer를 combineReducers를 이용하여 하나로 합려줍
const rootReducer = combineReducers({
    user
})

export default rootReducer;
