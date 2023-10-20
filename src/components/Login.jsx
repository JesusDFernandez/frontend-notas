import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from "../context/authContext";
import Loading from './Loading';


const Login = () => {

    const { signin, errors, isAuthenticated, loading } = useAuth();

    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [message, setMessage] = useState("");

    const isFocused = useIsFocused();



    useEffect(() => {
        if (isAuthenticated && isFocused) {
            navigation.navigate('Tabs')
        }

        return () => {
            setUsername("");
            setPassword("");
            setMessage("");
        }

    }, [isAuthenticated, isFocused]);



    const image = require('../../assets/bg.png');

    const handleLogin = async () => {
        if (!username) {
            setMessage("Falta el usuario")
            return
        }
        if (!password) {
            setMessage("Falta la contraseña")
            return
        }
        await signin({
            "username": username.trim(),
            "password": password.trim()
        });

    }

    const handleShowPassword = () => setShowPassword(!showPassword)

    const handleUsername = (text) => setUsername(text)

    return (
        <>
            <Loading visible={loading} />

            <View style={styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <View style={styles.container2}>

                        <Text style={styles.bienvenido}> Bienvenido </Text>
                        <Text style={styles.descripcion}> Puedes crear, guardar, editar y borrar tus notas. </Text>

                        <Image source={require('../../assets/logo.png')} />

                        <View style={styles.inputView} >
                            <View style={styles.inputPass} >

                                <TextInput
                                    style={styles.inputText2}
                                    placeholder="Usuario"
                                    placeholderTextColor="#003f5c"
                                    onChangeText={handleUsername}
                                    value={username}
                                />

                            </View>

                        </View>

                        <View style={styles.inputView} >

                            <View style={styles.inputPass} >

                                <TextInput
                                    secureTextEntry={showPassword}
                                    style={styles.inputText2}
                                    placeholder="Contraseña"
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => setPassword(text)}
                                    value={password}
                                />

                                <MaterialCommunityIcons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="#aaa"
                                    style={styles.icon}
                                    onPress={handleShowPassword}
                                />

                            </View>

                        </View>
                        {message && <Text>{message}</Text>}
                        {errors && <Text>{errors[0]}</Text>}

                        <TouchableOpacity
                            onPress={handleLogin}
                            style={styles.loginBtn}>
                            <Text style={styles.loginText}>Iniciar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.signupText}>¡No tienes una cuenta? Registrate</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

            </View>
        </>

    );
}
const styles = StyleSheet.create({
    container2: {
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
    },

    inputView: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    inputText: {
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(103, 114, 148, 0.16)',
        padding: 10,
        color: "#677294",
        fontSize: 16,
        fontWeight: "300",
        letterSpacing: -0.3,
    },
    inputText2: {
        width: "120%",
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(103, 114, 148, 0.16)',
        padding: 10,
        color: "#677294",
        fontSize: 16,
        fontWeight: "300",
        letterSpacing: -0.3,
    },

    inputPass: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3',
        position: "relative",
    },
    icon: {
        position: "absolute",
        right: -10,
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        backgroundColor: "#0EBE7F",
        width: "80%",
        borderRadius: 12,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    signupText: {
        color: "#0EBE7F",
        fontSize: 14,
        fontWeight: "400",
        letterSpacing: -0.3
    },
    loginText: {
        color: "white",
        fontSize: 18,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },

    bienvenido: {
        color: "#000",
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "500",
        letterSpacing: -0.3,
    },
    descripcion: {
        color: "#677294",
        textAlign: "center",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "400",
        letterSpacing: -0.3
    }
});
export default Login;