import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class WorkoutList extends Component {
    render() {
        return(
            <View>
                <Text>Welcome {this.props.user.email}</Text>
                <Text>WORKOUT</Text>
                <Text>WORKOUT</Text>
                <Text>WORKOUT</Text>
            </View>
        );
    }
}

const mapStateToProps = state =>{
    return { user: state.auth.user }
};

export default connect(mapStateToProps)(WorkoutList);