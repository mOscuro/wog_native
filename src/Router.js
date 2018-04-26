import React, {Navigator} from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import WorkoutList from './components/WorkoutList';
import RootScene from './components/RootScene';


const RouterComponent = () => {
    return(
        <Router sceneStyle={{paddingTop: 64}}>
            <Scene key="root" hideNavBar>
                <Scene key="auth">
                    <Scene key="home" component={RootScene} title="Hello" initial />
                </Scene>
                <Scene key="main">
                    <Scene key="workoutList" component={WorkoutList} title="My Workouts" />
                </Scene>
            </Scene>
        </Router>
    );
};

export default RouterComponent;
