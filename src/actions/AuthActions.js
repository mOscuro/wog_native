import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';
import { URL_USER_LOGIN } from '../env_vars.js';

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

async function persist_user(value) {
    await AsyncStorage.setItem('user', value);
    try {
        return await AsyncStorage.setItem('token', value);
    } catch (error) {
        console.error('AsyncStorage#setItem error: ' + error.message);
    }
}

export const loginUser = ({ email, password }) => {   
    return (dispatch) => {
        // dispatch({ type: LOGIN_USER })
        
        console.log('email = ' + email);
        console.log('pass = ' + password);

        fetch('http://192.168.104.76:8085/auth/login/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: 'user1@wogether.com',
              password: 'Password44$',
            }),
          })
          .then((response) => {
                if(response.status == 200){  
                    return response.json();
                }else{
                    loginUserFail(dispatch);
                }
            })
          .then((json) => {
              console.log(json);
              
                const { id, email, first_name, last_name, key } = json;
                
                const user = { id, email, first_name, last_name, token: key };

                // Store to async storage
                persist_user(user);

                loginUserSuccess(dispatch, user);
            })
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