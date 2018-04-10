import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    
    // componentWillMount() {
    //     firebase.initializeApp({
    //         apiKey: 'AIzaSyCqucMascaxMnRN1zA4TQRU_N6qeUSEeaQ',
    //         authDomain: 'manager-7129b.firebaseapp.com',
    //         databaseURL: 'https://manager-7129b.firebaseio.com',
    //         projectId: 'manager-7129b',
    //         storageBucket: '',
    //         messagingSenderId: '609207009361'
    //     });
    // }
    
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
        return(
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;