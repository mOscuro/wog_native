import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { URL_GET_USER } from '../env_vars.js';
import { LOGIN_USER_SUCCESS } from '../actions/types.js';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        console.log('LOGIN!');
        
        this.get_token_from_storage().then((token) => console.log(token));
        // this.get_from_storage()
        // .then(() => {
            // console.log("hello");
        AsyncStorage.getItem('token').then((value)=>{
            console.log('bonjour');
            this.state = {token: value};

            return value;
            // if(data[0][1]){
            //     token = data[0][1] || null;
            //     console.log('=========');
            //     console.log(value);
            //     //return this.getUser(data[1][1]);
            //     return token
            // }
            // return 'nothing';
        }).then((token) => console.log('vl ' + token));

        // }).then((user) => {
        //     if(user){
        //         return user.json();

        //     }else{
        //         return null;
        //     }
        // }).then((obj) => {
        //     const { id, email, first_name, last_name, key } = obj;
        //     const user = { id, email, first_name, last_name, key };
        //     dispatch({
        //         type: LOGIN_USER_SUCCESS,
        //         payload: user        
        //     });
        // });
        // });
    }

    async get_token_from_storage(){
        console.log('**************');
        let response = await AsyncStorage.getItem('token');
        let token = await JSON.parse(response) || []; 
        console.log(token);
        console.log('**************');
        return 'blabla';
    }

    getUser(userId){
        return fetch(URL_GET_USER + userId,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }
    
    onButtonPress(text) {
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner />
        }else{
            return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
        }
    }
    
    render() {
        var token_info = '';
        if (this.props.token){
            token_info = 'Logged in!';
        }else{
            token_info = 'no token';
        }

        return(
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeHolder="email@example.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>
                
                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeHolder="pass***d"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>
                
                <CardSection>
                    <Text style={{color: 'red'}}>{this.props.error}</Text>
                    {this.renderButton()}
                </CardSection>
                <Text>{token_info}</Text>
            </Card>
        );
        
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error,
        loading: state.auth.loading,
        token: state.auth.token,
    }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);