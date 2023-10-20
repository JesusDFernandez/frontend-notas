import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { useTasks } from '../context/tasksContext';
import { useState } from 'react';
import ModalPoup from './ModalPoup';

export default function Note({ id, title, description, color, category, icon }) {

    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);

    const { deleteTask } = useTasks();

    const handleEdit = () => {
        navigation.navigate('ActionButton', { id });
    }

    const handleDelete = (id) => {
        deleteTask(id);
    }
    const handlePreviewDelete = () => {
        setVisible(true)
    }

    return (
        <>
            <View style={styles.note}>

                <View style={{ display: "flex" }}>
                    <Text style={styles.text}> {title}</Text>
                    <Text
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={{ ...styles.text, width: 100, }}
                    >{description} </Text>
                </View>

                <View style={{ ...styles.tab, backgroundColor: color }} >
                    <FontAwesome5 name={icon} size={24} color="black" />
                    <Text style={{ color: "white" }}>{category}</Text>
                </View>

                <View style={{ display: "flex", gap: 10 }}>

                    <TouchableOpacity onPress={() => handleEdit()} >
                        <FontAwesome5 name="pencil-alt" size={20} color="#677294" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlePreviewDelete}>
                        <FontAwesome5 name="trash-alt" size={20} color="#677294" />
                    </TouchableOpacity>

                </View>

                <ModalPoup visible={visible}>

                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Text style={{ fontSize: 30 }}>x</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginVertical: 30, flexDirection: "column" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: 'center' }}>
                                ¿Confirmas que deseas eliminar la nota?
                            </Text>

                            <View style={{ flexDirection: "row", gap: 10, marginTop: 30 }}>

                                <TouchableOpacity style={{ ...styles.logoutBtn, backgroundColor: "white" }} onPress={() => setVisible(false)} >
                                    <Text style={{ ...styles.modalText, color: "#0EBE7F" }}>Cancelar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.logoutBtn} onPress={() => handleDelete(id)}>
                                    <Text style={styles.modalText}>Eliminar</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </ModalPoup>

            </View>
        </>
    )
}


const styles = StyleSheet.create({

    note: {
        borderWidth: 1,
        borderColor: 'rgba(103, 114, 148, 0.16)',
        height: 100,
        flexDirection: 'row',
        borderRadius: 12,
        paddingTop: 20,
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        backgroundColor: '#f3f3f3',
        margin: 8
    },

    tab: {
        display: "flex",
        flexDirection: "row",
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        minWidth: 120,
    },
    text: {
        color: "#677294",
    }

    , header: {
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