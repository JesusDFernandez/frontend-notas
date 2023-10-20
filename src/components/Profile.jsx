import { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/authContext';
import { deleteUserRequest, updateUserRequest } from '../api/users';
import { useNavigation } from '@react-navigation/native';
import ModalPoup from './ModalPoup';

export default function Profile() {

    const image = require('../../assets/bg.png');

    const { getUser, logout } = useAuth();

    const [showPassword, setShowPassword] = useState(true);
    const [showPasswordNew, setShowPasswordNew] = useState(true);

    const [message, setMessage] = useState("");
    const [fullname, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [visible, setVisible] = useState(false);

    const navigation = useNavigation();

    const handleShowPassword = () => setShowPassword(!showPassword)

    const handleShowPasswordNew = () => setShowPasswordNew(!showPasswordNew)


    useEffect(() => {

        async function getUserId() {

            const { fullname, username } = await getUser()
            setFullName(fullname);
            setUsername(username);
            setPassword("");
            setPasswordNew("");
            setMessage("");
        }

        getUserId()

    }, [refresh])


    const handleUpdateFullnameAccount = async () => {
        try {
            const message = await updateUserRequest({
                "fullname": fullname.trim(),
            });

            if (message?.data?.message) {
                setMessage(message.data.message)
                setRefresh(!refresh);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdateUsernameAccount = async () => {
        try {
            const message = await updateUserRequest({
                "username": username.trim(),
            });
            if (message?.data?.message) {
                setMessage(message.data.message)
                setRefresh(!refresh);
            }
        } catch (error) {
            console.error(error);
        }

    }
    const handleUpdatePasswordAccount = async () => {
        try {
            const message = await updateUserRequest({
                "password": password.trim(),
                "passwordNew": passwordNew.trim(),
            });
            if (message?.data?.message) {
                setMessage(message.data.message)
                setRefresh(!refresh);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handlePreviewDeleteAccount = () => {
        setVisible(true)
    }

    const handleDeleteAccount = async () => {
        try {
            const logouts = await deleteUserRequest();
            const log = await logout();
            if (log) {
                navigation.navigate('Login');
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>
                    <View style={styles.inputView} >

                        <Text style={styles.title}> Perfil </Text>

                        <View style={{ position: "relative" }} >

                            <Text style={styles.descripcion}> Nombre y Apellido </Text>

                            <TextInput
                                style={styles.inputText}
                                placeholder="Nombre y Apellido..."
                                placeholderTextColor="#003f5c"
                                onChangeText={text => setFullName(text)}
                                value={fullname}
                            />

                            <TouchableOpacity
                                style={{ ...styles.icon2, width: 24, height: 24 }}
                                onPress={handleUpdateFullnameAccount}>
                                <FontAwesome5
                                    name="pencil-alt"
                                    size={24}
                                    color="#aaa"
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{ position: "relative" }} >

                            <Text style={styles.descripcion}> Usuario </Text>

                            <TextInput
                                style={styles.inputText}
                                placeholder="Usuario..."
                                placeholderTextColor="#003f5c"
                                onChangeText={text => setUsername(text)}
                                value={username}
                            />

                            <TouchableOpacity
                                style={{ ...styles.icon2, width: 24, height: 24 }}
                                onPress={handleUpdateUsernameAccount}>
                                <FontAwesome5
                                    name="pencil-alt"
                                    size={24}
                                    color="#aaa"
                                />
                            </TouchableOpacity>


                        </View>

                        <View style={{ position: "relative" }} >

                            <Text style={styles.descripcion}> Actual Contraseña </Text>

                            <TextInput
                                secureTextEntry={showPassword}
                                style={styles.inputText}
                                placeholder="Contraseña..."
                                placeholderTextColor="#003f5c"
                                onChangeText={text => setPassword(text)}
                                value={password}
                            />

                            <MaterialCommunityIcons
                                name={showPassword ? 'eye-off' : 'eye'}
                                size={24}
                                color="#aaa"
                                style={{ ...styles.icon2, right: 75 }}
                                onPress={handleShowPassword}
                            />

                        </View>

                        <View style={{ position: "relative" }} >

                            <Text style={styles.descripcion}> Nueva Contraseña </Text>

                            <TextInput
                                secureTextEntry={showPasswordNew}
                                style={styles.inputText}
                                placeholder="Contraseña..."
                                placeholderTextColor="#003f5c"
                                onChangeText={text => setPasswordNew(text)}
                                value={passwordNew}
                            />

                            <TouchableOpacity
                                style={{ ...styles.icon2, width: 24, height: 24 }}
                                onPress={handleUpdatePasswordAccount}>
                                <FontAwesome5
                                    name="pencil-alt"
                                    size={24}
                                    color="#aaa"
                                />
                            </TouchableOpacity>


                            <MaterialCommunityIcons
                                name={showPasswordNew ? 'eye-off' : 'eye'}
                                size={24}
                                color="#aaa"
                                style={{ ...styles.icon2, right: 75 }}
                                onPress={handleShowPasswordNew}
                            />

                        </View>

                        {message && <Text>{message}</Text>}

                        <TouchableOpacity
                            onPress={handlePreviewDeleteAccount}
                            style={{ ...styles.loginBtn, bottom: 0, backgroundColor: "#A31D00", display: "flex", flexDirection: "row", gap: 20 }}>
                            <FontAwesome5 name="trash-alt" size={20} color="white" />
                            <Text style={styles.loginText}>Eliminar Cuenta</Text>
                        </TouchableOpacity>


                        <ModalPoup visible={visible}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.header}>
                                    <TouchableOpacity onPress={() => setVisible(false)}>
                                        <Text style={{ fontSize: 30 }}>x</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginVertical: 30, flexDirection: "column" }}>
                                    <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: 'center' }}>
                                        ¿Confirmas que deseas eliminar su cuenta?
                                    </Text>

                                    <View style={{ flexDirection: "row", gap: 10, marginTop: 30 }}>

                                        <TouchableOpacity style={{ ...styles.logoutBtn, backgroundColor: "white" }} onPress={() => setVisible(false)} >
                                            <Text style={{ ...styles.modalText, color: "#0EBE7F" }}>Cancelar</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.logoutBtn}
                                            onPress={handleDeleteAccount}
                                        >
                                            <Text style={styles.modalText}>Eliminar Cuenta</Text>
                                        </TouchableOpacity>

                                    </View>

                                </View>
                            </View>
                        </ModalPoup>

                    </View>
                </View>
            </ImageBackground >
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputView: {
        width: "80%",
        marginBottom: 10,
        gap: 20
    },
    container2: {
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: "#000",
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "500",
        textAlign: "center",
        letterSpacing: -0.3,
    },
    logout: {
        position: "absolute",
        top: 0,
        right: 15
    },

    icon2: {
        bottom: 25,
        right: 15,
        position: "absolute",
    },
    icon: {
        color: "white",
    },

    inputText2: {
        width: "100%",
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(103, 114, 148, 0.16)',
        padding: 10,
        color: "#677294",
        fontSize: 16,
        fontWeight: "300",
        letterSpacing: -0.3,
        paddingLeft: 50,
        marginBottom: 20,
    },
    search: {
        flexDirection: 'row',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f3f3',
        position: "relative",
        width: "80%",
        marginBottom: 20
    },
    inputText: {
        width: "80%",
        height: 80,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(103, 114, 148, 0.16)',
        padding: 10,
        color: "#677294",
        fontSize: 16,
        fontWeight: "300",
        letterSpacing: -0.3,
        paddingTop: 30,
    },
    descripcion: {
        color: "#0EBE7F",
        textAlign: "left",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
        letterSpacing: -0.3,
        position: "absolute",
        left: 10,
        top: 5
    },
    loginBtn: {
        backgroundColor: "#0EBE7F",
        borderRadius: 12,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        color: "white",
        fontSize: 18,
    },

    inputPass: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "red",
        gap: 10,
        backgroundColor: "#8687E7",
        borderRadius: 12,
        height: 50,
    },
    header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    logoutBtn: {
        backgroundColor: "#0EBE7F",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },
    modalText: {
        color: "white",
        fontSize: 18,
    }

});