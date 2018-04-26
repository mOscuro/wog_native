import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { URL_GET_USER } from '../env_vars.js';
import { LOGIN_USER_SUCCESS } from '../actions/types.js';
import LoginForm from './LoginForm.js';
import WorkoutList from './WorkoutList.js';


class RootScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null
        }
        this.get_token_from_storage().then((token) => {
            this.setState({token: token});
        });
    }

    async get_token_from_storage(){
        return await AsyncStorage.getItem('token');
    }


    renderAppropriateScene() {
        console.log(this.state);
        if (this.state.token) {
            return <LoginForm />
        }else{
            return <WorkoutList />
        }
    }
    
    render() {
        console.log('render root...');
        return(
            <View>
                {this.renderAppropriateScene()}
            </View>
        );
        
    }
}


export default RootScene;