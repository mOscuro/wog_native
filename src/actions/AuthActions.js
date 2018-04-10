import { Actions } from 'react-native-router-flux';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {   
    return (dispatch) => {
        // dispatch({ type: LOGIN_USER })
        
        console.log('email = ' + email);
        console.log('pass = ' + password);

        fetch('10.0.2.2:8000/auth/login/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          })
          .then((response) => console.log(response))
          .catch((error) => {
            console.error(error);
          });

        // if (email == 'moscuro@wog.com' && password == 'moscuro') {
        //     const user = { id: 1, name: 'matthieu' }
        //     loginUserSuccess(dispatch, user);
        // }else{
        //     loginUserFail(dispatch);
        // }

    };
};


const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user        
    });

    Actions.main();
};

const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL, payload: 'Authentication failed.' });
};