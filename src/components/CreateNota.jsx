import { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useTasks } from '../context/tasksContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import ModalCategories from './ModalCategories';

import { useIsFocused } from '@react-navigation/native';

export default function CreateNota() {

    const route = useRoute();

    const image = require('../../assets/bg.png');

    const [title, setTitle] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [category, setCategory] = useState("");
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();

    const { createTask, getTask, updateTask, } = useTasks();


    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {

            const loadTask = async () => {
                if (route.params?.id) {

                    const task = await getTask(route.params?.id);
                    setTitle(task.title);
                    setDescripcion(task.description);
                    setCategory(task.category);

                } else {
                    setTitle("");
                    setDescripcion("");
                    setCategory("")
                    setMessage("")

                }
            }

            loadTask();

        } else {
            setTitle("");
            setDescripcion("");
            setCategory("")
            setMessage("")
            route.params = {};
        }

    }, [isFocused]);

    const [message, setMessage] = useState("");


    const handleCreateNote = async () => {

        if (!title) {
            setMessage("Falta el titulo")
            return
        }
        if (!descripcion) {
            setMessage("Falta la descripcion")
            return
        }
        if (!category) {
            setMessage("Falta la categoria")
            return
        }

        await createTask({
            "title": title.trim(),
            "description": descripcion.trim(),
            "category": category.trim()
        });

        navigation.navigate('Home');
    }


    const handleEditNote = async () => {

        await updateTask(route.params.id, {
            "title": title.trim(),
            "description": descripcion.trim(),
            "category": category.trim()
        });

        navigation.navigate('Home');

    }

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.container2}>
                    <View style={styles.inputView} >
                        {
                            route.params?.id ?

                                <Text style={styles.title}> EDITAR NOTA </Text>
                                : <Text style={styles.title}> CREAR NOTA </Text>
                        }

                        <Text style={styles.descripcion}> Titulo </Text>

                        <TextInput
                            style={styles.inputText}
                            placeholder="Titulo..."
                            placeholderTextColor="#003f5c"
                            onChangeText={text => setTitle(text)}
                            value={title}

                        />

                        <Text style={styles.descripcion}> Descripción </Text>

                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                            style={{ ...styles.inputText, height: 150 }}
                            placeholder="Descripción..."
                            placeholderTextColor="#003f5c"
                            onChangeText={text => setDescripcion(text)}
                            value={descripcion}
                        />

                        <Text style={styles.descripcion}> Categoria </Text>

                        <View style={styles.inputPass} >
                            <Octicons style={styles.icon} name="tag" size={24} color="black" />
                            <TouchableOpacity onPress={() => setVisible(true)}
                                style={styles.loginBtn}>
                                <Text style={styles.loginText}>Selecciona</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ ...styles.inputPass, backgroundColor: "#0EBE7F" }} >
                            <Octicons style={styles.icon} name="plus" size={24} color="black" />
                            {
                                route.params?.id ? <TouchableOpacity
                                    onPress={handleEditNote}
                                    style={styles.loginBtn}>
                                    <Text style={styles.loginText}>Editar Nota</Text>
                                </TouchableOpacity>
                                    : <TouchableOpacity
                                        onPress={handleCreateNote}
                                        style={styles.loginBtn}>
                                        <Text style={styles.loginText}>Guardar Nota</Text>
                                    </TouchableOpacity>


                            }
                        </View>
                        {message && <Text>{message}</Text>}

                        <ModalCategories visible={visible} setVisible={setVisible} setCategory={setCategory} />

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
        marginBottom: 50,
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
    descripcion: {
        color: "#677294",
        textAlign: "left",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
        letterSpacing: -0.3,
    },
    loginBtn: {
        width: "80%",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
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


});