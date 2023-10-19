import React from 'react';
import { Image, Platform, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import plus from '../../assets/plus.png'
import { FontAwesome5 } from '@expo/vector-icons'
import Dashboard from './Dashboard';
import CreateNota from './CreateNota';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

export default function Tabs() {


    return (

        <Tab.Navigator screenOptions={{
            showLabel: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
                backgroundColor: '#0EBE7F',
                width: "100%",
                height: 80,
                paddingBottom: 10
            }
        }}>

            <Tab.Screen name={"Home"} component={Dashboard}
                options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: "transparent",
                    },
                    headerTitleStyle: {
                        color: "#ffffff",
                    },
                    tabBarLabelStyle: { color: 'white' },
                    tabBarIcon: ({ focused }) => (
                        <View style={{
                            position: 'absolute',
                            top: 15
                        }}>
                            <FontAwesome5
                                name="home"
                                size={30}
                                color={focused ? 'black' : 'white'}
                            ></FontAwesome5>
                        </View>
                    )

                }} ></Tab.Screen>


            <Tab.Screen name={"ActionButton"} component={CreateNota} options={{
                headerTransparent: true,
                headerTitle: '',
                headerStyle: {
                    backgroundColor: "transparent",
                },
                headerTitleStyle: {
                    color: "#ffffff",
                },
                tabBarLabel: '',
                // tabBarLabelStyle: { color: 'white' },

                tabBarIcon: ({ focused }) => (

                    <View style={{
                        width: 65,
                        height: 65,
                        backgroundColor: '#8687E7',
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: Platform.OS == "android" ? 50 : 30
                    }}>

                        <Image source={plus} style={{
                            width: 22,
                            height: 22,
                            tintColor: focused ? 'black' : 'white'
                        }}></Image>
                    </View>
                )
            }}></Tab.Screen>
            {/* /** */}

            <Tab.Screen name={"Perfil"} component={Profile} options={{
                headerTransparent: true,
                headerTitle: '',
                headerStyle: {
                    backgroundColor: "transparent",

                },
                headerTitleStyle: {
                    color: "#ffffff",
                },

                tabBarLabelStyle: { color: 'white' },

                tabBarIcon: ({ focused }) => (
                    <View style={{
                        position: 'absolute',
                        top: 15,
                    }}>
                        <FontAwesome5
                            name="user-alt"
                            size={30}
                            color={focused ? 'black' : 'white'}
                        ></FontAwesome5>
                    </View>
                )
            }} ></Tab.Screen>



        </Tab.Navigator>

    );
}