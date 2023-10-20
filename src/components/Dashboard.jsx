import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import Note from './Note';
import { useAuth } from '../context/authContext';
import { useNavigation } from '@react-navigation/native';
import { useTasks } from '../context/tasksContext';
import ModalPoup from './ModalPoup';
import ModalCategories from './ModalCategories';
import { useCategories } from '../context/categoriesContext';


export default function Dashboard() {
    const image = require('../../assets/bg.png');

    const { logout } = useAuth();

    const [visible, setVisible] = useState(false);

    const navigation = useNavigation();

    const [visibleCategories, setVisibleCategories] = useState(false);

    const handlePreviewLogout = () => {
        setVisible(true)
    }
    const handleLogout = async () => {
        const resLogout = await logout()
        if (resLogout) {
            navigation.navigate('Login');
        }
    }

    const { tasks, getTasks, refresh, setTasks } = useTasks();
    const category = useCategories();

    useEffect(() => {
        getTasks();
    }, [refresh, category?.refresh]);

    const filtrar = (text) => {
        if (text === "") {
            getTasks();
        } else {
            const filteredTasks = tasks.filter(task => task?.category?.title.toLowerCase().includes(text.toLowerCase()));
            setTasks(filteredTasks);
        }
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    <View style={styles.container2}>

                        <TouchableOpacity style={styles.logout} onPress={handlePreviewLogout} >

                            <FontAwesome5
                                name="sign-out-alt"
                                rotation={180}
                                size={30}
                                color='red'
                            ></FontAwesome5>

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
                                        ¿Confirmas que deseas cerrar sesión?
                                    </Text>

                                    <View style={{ flexDirection: "row", gap: 10, marginTop: 30 }}>

                                        <TouchableOpacity style={{ ...styles.logoutBtn, backgroundColor: "white" }} onPress={() => setVisible(false)} >
                                            <Text style={{ ...styles.modalText, color: "#0EBE7F" }}>Cancelar</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} >
                                            <Text style={styles.modalText}>Cerrar sesión</Text>
                                        </TouchableOpacity>

                                    </View>

                                </View>
                            </View>
                        </ModalPoup>

                        <Text style={styles.title}> NOTAS </Text>

                        <View style={{ height: "90%", paddingTop: 70 }}>
                            <View style={styles.search} >

                                <TextInput
                                    style={styles.inputText2}
                                    placeholder="Buscar..."
                                    placeholderTextColor="#003f5c"
                                    onChangeText={text => filtrar(text)}
                                />

                                <AntDesign
                                    name="search1"
                                    size={24}
                                    color="#aaa"
                                    style={styles.icon}
                                />

                            </View>

                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 25,
                                paddingBottom: 10
                            }}>

                                <Text style={{
                                    // display: "flex",
                                    // flexDirection: "row",
                                    // justifyContent: "center",
                                    // alignItems: "center",
                                    // gap: 5,
                                    borderRadius: 4,
                                    paddingHorizontal: 4,
                                    paddingVertical: 8,
                                    textAlign: "center",
                                    minWidth: 100,
                                    backgroundColor: "white"
                                }}>Notas</Text>
                                <Text style={{
                                    // display: "flex",
                                    // flexDirection: "row",
                                    // justifyContent: "center",
                                    // alignItems: "center",
                                    // gap: 5,
                                    borderRadius: 4,
                                    paddingHorizontal: 4,
                                    paddingVertical: 8,
                                    textAlign: "center",
                                    minWidth: 100,
                                    backgroundColor: "white"
                                }} onPress={() => setVisibleCategories(true)} >Categorias</Text>
                            </View>

                            <ModalCategories visible={visibleCategories} setVisible={setVisibleCategories}>

                            </ModalCategories>


                            <ScrollView>

                                {tasks.map((task) => (
                                    <Note task={task} key={task._id}
                                        id={task._id}
                                        icon={task.category?.icon}
                                        category={task.category?.title}
                                        title={task.title}
                                        description={task.description}
                                        color={task.category?.color}
                                    />
                                ))}

                            </ScrollView>

                        </View>
                    </View>
                </ImageBackground >
            </View >
        </>

    );


}




const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        position: "absolute",
        top: 20,
        color: "#000",
        fontSize: 24,
        fontStyle: "normal",
        fontWeight: "500",
        letterSpacing: -0.3,
    },
    logout: {
        position: "absolute",
        top: 20,
        right: 25
    },
    icon: {
        position: "absolute",
        left: 15

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
    },

});