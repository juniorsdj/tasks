import React from 'react'
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import Agenda from './screens/agenda'
import Auth from './screens/auth'

const MainRoutes ={
    Auth:{
        name: 'Auth',
        screen: Auth
    },
    Home:{
        name: 'Home',
        screen: Agenda
    }
}

const MainNavigator = createSwitchNavigator(MainRoutes, {
    initialRouteName: 'Auth'})
const App = createAppContainer(MainNavigator)


export default App