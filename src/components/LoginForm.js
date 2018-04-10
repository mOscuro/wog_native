import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser } from '../actions';


class LoginForm extends Component {
    
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
    }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);