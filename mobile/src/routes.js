import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image } from 'react-native';

import New from './pages/New';
import Feed from './pages/Feed';

import logo from './assets/logo.png';

export default createAppContainer(
    createStackNavigator({
        Feed,
        New
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#000',
            headerLayoutPreset: 'center',
            headerTitle: <Image source={logo} />,
            headerBackTitle: null,
            headerTitleAlign: 'center'
        },
        mode: 'modal'
    })
);