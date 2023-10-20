import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/authContext';
import { useNavigation } from '@react-navigation/native';
import Loading from './Loading';

const Signup = () => {

    const image = require('../../assets/bg.png');

    const { signup, errors, loading } = useAuth();

    const [fullname, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);

    const navigation = useNavigation();

    const handleRegister = async () => {

        if (!fullname) {
            setMessage("Falta el nombre completo")
            return
        }
        if (!username) {
            setMessage("Falta el usuario")
            return
        }
        if (!password) {
            setMessage("Falta la contraseña")
            return
        }
        await signup({
            "username": username.trim(),
            "fullname": fullname.trim(),
            "password": password.trim()
        })
        navigation.navigate('Tabs')


    }


    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleCheckUsername = (text) => setUsername(text);


    return (
        <>
            <Loading visible={loading} />

            <View style={styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <View style={styles.container2}>

                        <Text style={styles.bienvenido}> Registro </Text>
                        <Text style={styles.descripcion}> Puedes crear, guardar, editar y borrar tus notas. </Text>
                        <View style={styles.inputView} >
                            <View style={styles.inputPass} >

                                <TextInput
                                    style={styles.inputText2}
                                    placeholder="Nombre y Apellido"
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => setFullName(text)}
                                />

                            </View>

                        </View>
                        <View style={styles.inputView} >
                            <View style={styles.inputPass} >

                                <TextInput
                                    style={styles.inputText2}
                                    placeholder="Usuario"
                                    placeholderTextColor="#003f5c"
                                    onChangeText={handleCheckUsername}
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

                        {errors && <Text>{errors[0]}</Text>}

                        <TouchableOpacity
                            onPress={handleRegister}
                            style={styles.loginBtn}>
                            <Text style={styles.loginText}>Registrar</Text>
                        </TouchableOpacity>

                    </View>

                </ImageBackground>
            </View>
        </>

    );
}
const styles = StyleSheet.create({
    container2: {
        marginTop: -100,
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
        width: "130%",
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
        right: -15,
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
        marginBottom: 50,
        letterSpacing: -0.3,
    }
});
export default Signup;