import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import ModalPoup from "./ModalPoup";
import { useCategories } from '../context/categoriesContext';
import ModalCreateCategory from './ModalCreateCategory';

const ModalCategories = ({ setCategory, visible, setVisible }) => {

    const { categories, getCategories, refresh, deleteCategory } = useCategories();

    const [visibleCreateCategory, setVisibleCreateCategory] = useState(false)
    const [editCategory, setEditCategory] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [idDelete, setIdDelete] = useState("");

    useEffect(() => {

        getCategories()

    }, [refresh]);


    const handleAgregar = (_id) => {
        if (setCategory) {

            setCategory(_id);
        }
        setVisible(false);

    }

    const handleCreateCategory = () => {
        setVisibleCreateCategory(true);
    }


    const handleEdit = (id) => {
        setVisibleCreateCategory(true);
        setEditCategory(id);
    }

    const handlePreviewDelete = (id) => {
        setIdDelete(id);
        setVisibleDelete(true);
    }

    const handleDelete = () => {
        deleteCategory(idDelete)
        setVisibleDelete(false);
    }


    return (
        <View>

            <ModalPoup visible={visible}>
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Text style={{ fontSize: 20, height: 30, width: 30 }}>x</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>

                        <Text style={{ marginBottom: 30, fontSize: 20, textAlign: 'center', borderBottomWidth: 2, paddingBottom: 10, borderBottomColor: 'rgba(0,0,0,0.5)', }}>
                            {setCategory ? "Elige una Categoria" : "Categorias"}
                        </Text>

                        <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 10, }}>

                            {visible &&
                                <>
                                    {categories.map((category) => (
                                        <View key={category._id} style={{ flexDirection: "row" }} >

                                            <TouchableOpacity
                                                onPress={() => handleAgregar(category._id)}
                                            >

                                                <View style={{ ...styles.tab, backgroundColor: category?.color }}>
                                                    <FontAwesome5 name={category?.icon} size={24} color="black" />
                                                    <Text >{category.title}</Text>
                                                </View>

                                            </TouchableOpacity>

                                            {category?.user ? <View >

                                                <TouchableOpacity
                                                    style={{ margin: 5 }}
                                                    onPress={() => handleEdit(category._id)}
                                                >
                                                    <FontAwesome5 name="pencil-alt" size={20} color="#677294" />
                                                </TouchableOpacity>

                                                <TouchableOpacity
                                                    style={{ margin: 5 }}
                                                    onPress={() => handlePreviewDelete(category._id)}
                                                >
                                                    <FontAwesome5 name="trash-alt" size={20} color="#677294" />
                                                </TouchableOpacity>

                                            </View> :
                                                <View style={{ marginLeft: 30 }}></View>
                                            }
                                        </View>
                                    ))
                                    }

                                    <TouchableOpacity onPress={handleCreateCategory} >
                                        <View style={{ ...styles.tab, backgroundColor: "#80FFD1" }}>
                                            <FontAwesome5 name="plus" size={24} color="black" />
                                            <Text>Crear Nueva</Text>
                                        </View>
                                    </TouchableOpacity>
                                </>

                            }

                        </View>

                    </View>
                </ScrollView>

            </ModalPoup>

            <ModalCreateCategory
                id={editCategory}
                setEditCategory={setEditCategory}
                visibleCreateCategory={visibleCreateCategory}
                setVisibleCreateCategory={setVisibleCreateCategory}
                setVisible={setVisible}
            />



            <ModalPoup visible={visibleDelete}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setVisibleDelete(false)}>
                            <Text style={{ fontSize: 30 }}>x</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 30, flexDirection: "column" }}>
                        <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: 'center' }}>
                            ¿Confirmas que deseas eliminar la categoria?
                        </Text>

                        <View style={{ flexDirection: "row", gap: 10, marginTop: 30 }}>

                            <TouchableOpacity style={{ ...styles.logoutBtn, backgroundColor: "white" }} onPress={() => setVisibleDelete(false)} >
                                <Text style={{ ...styles.modalText, color: "#0EBE7F" }}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.logoutBtn} onPress={handleDelete}>
                                <Text style={styles.modalText}>Eliminar</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
            </ModalPoup>

        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    tab: {
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        marginBottom: 10,
        minWidth: 200,
    },
    agregarBtn: {
        backgroundColor: "#0EBE7F",
        borderRadius: 12,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    agregarText: {
        color: "white",
        fontSize: 18,
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


export default ModalCategories;