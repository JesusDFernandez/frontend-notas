import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import ModalPoup from "./ModalPoup";
import { useCategories } from '../context/categoriesContext';
import { ListIcon } from './listIcon';
import { ListColor } from './listColor';
import Loading from './Loading';

const ModalCreateCategory = ({ id, setEditCategory, visibleCreateCategory, setVisibleCreateCategory }) => {

    const { createCategory, getCategory, updateCategory } = useCategories();

    const [icons, setIcons] = useState("");
    const [colors, setColors] = useState("transparent");
    const [title, setTitle] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        return () => {
            if (!visibleCreateCategory) {
                setLoading(false);
            }
        }
    }, [visibleCreateCategory]);


    useEffect(() => {
        if (id) {
            async function getCategoryId() {
                const data = await getCategory(id)
                setTitle(data.title);
                setIcons(data.icon);
                setColors(data.color)
            }
            getCategoryId()
        }
    }, [id])

    const handleCreateCategory = async () => {

        setLoading(true);

        if (!loading) {

            await createCategory({
                "title": title.trim(),
                "color": colors.trim(),
                "icon": icons.trim()
            });

            setTitle("");
            setIcons("");
            setColors("transparent")
            setVisibleCreateCategory(false);
        }
    }

    const handleEditCategory = async () => {
        setLoading(true);

        if (!loading) {

            await updateCategory(id, {
                "title": title.trim(),
                "color": colors.trim(),
                "icon": icons.trim()
            });

            setTitle("");
            setIcons("");
            setColors("transparent")
            setVisibleCreateCategory(false);
            setEditCategory(false);

        }
    }

    const handleTitle = (title) => setTitle(title)

    const handleIconEnter = (icon) => setIcons(icon);

    const handleColorEnter = (color) => setColors(color)

    return (
        <>

            <View>
                <ModalPoup visible={visibleCreateCategory}>
                    <Loading visible={loading} />
                    <View style={{ alignItems: 'center' }}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => {
                                setTitle("");
                                setIcons("");
                                setColors("transparent");
                                setEditCategory(false);
                                setVisibleCreateCategory(false)
                            }}>
                                <Text style={{ fontSize: 20, height: 30, width: 30 }}>x</Text>

                            </TouchableOpacity>
                        </View>
                    </View>


                    <View>
                        <View style={{ flexDirection: "row", gap: 10, marginBottom: 30, borderBottomWidth: 2, paddingBottom: 10, borderBottomColor: 'rgba(0,0,0,0.5)' }}>

                            {title && colors && icons &&
                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                    <View style={{ marginTop: 0, backgroundColor: colors, paddingHorizontal: 25, paddingVertical: 5, borderRadius: 6 }}>
                                        <FontAwesome5 name={icons} size={20} color="black" />
                                        <Text numberOfLines={1}
                                            ellipsizeMode="tail" style={{ textAlign: "center", maxWidth: 100 }}>{title}</Text>
                                    </View>
                                </View>
                            }

                            <Text numberOfLines={2}
                                style={{ maxWidth: 100, flexDirection: "column", marginTop: 10, justifyContent: "center", alignItems: "center", fontSize: 19, textAlign: 'center' }}>
                                {
                                    id ? "Edita" : "Crea"}  una Categoria
                            </Text>
                        </View>

                        <View style={{ gap: 20 }}>

                            <TextInput
                                style={styles.inputText2}
                                placeholder="Titulo"
                                placeholderTextColor="#003f5c"
                                onChangeText={handleTitle}
                                value={title}
                            />

                            <Text style={{ fontSize: 18, }}>Elige un color</Text>

                            <ScrollView style={{ height: 110 }}>

                                <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: "center", alignItems: "center" }}>
                                    {
                                        ListColor.map((color, index) => (
                                            <View key={index}>
                                                <TouchableOpacity
                                                    onPress={() => handleColorEnter(color)}
                                                    style={(colors === color) ? { ...styles.containerHovered } : { ...styles.container }}

                                                >
                                                    <Text style={{ backgroundColor: color, borderRadius: 50, width: 50, height: 50, margin: 10 }}>

                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        ))
                                    }
                                </View>
                            </ScrollView>

                            <Text style={{ fontSize: 18, }}> Elige un icono</Text>
                            <ScrollView style={{ height: 110 }}>
                                <View style={{ flexDirection: "row", flexWrap: 'wrap', justifyContent: "center", alignItems: "center" }}>

                                    {ListIcon.map((icon, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            underlayColor="transparent"
                                            onPress={() => handleIconEnter(icon)}
                                            style={(icons === icon) ? { ...styles.containerHovered } : { ...styles.container }}
                                        >
                                            <Text style={{ margin: 10, textAlign: 'justify' }}>
                                                <FontAwesome5 name={icon} size={40} color="black" />
                                            </Text>
                                        </TouchableOpacity>
                                    ))
                                    }
                                </View>
                            </ScrollView>

                            {id ? <TouchableOpacity onPress={handleEditCategory} >
                                <View style={{ ...styles.tab, backgroundColor: "#80FFD1" }}>

                                    <FontAwesome5 name="plus" size={24} color="black" />

                                    <Text >Editar Categoria</Text>

                                </View>
                            </TouchableOpacity>
                                : <TouchableOpacity onPress={handleCreateCategory} >
                                    <View style={{ ...styles.tab, backgroundColor: "#80FFD1" }}>

                                        <FontAwesome5 name="plus" size={24} color="black" />

                                        <Text >Guardar Categoria</Text>

                                    </View>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </ModalPoup >

            </View >
        </>
    );
};

const styles = StyleSheet.create({
    container2: {
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    tab: {
        display: "flex",
        flexDirection: "row",
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        minWidth: 120,
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
    },
    container: {
        backgroundColor: 'transparent',
        padding: 5,
    },
    containerHovered: {
        borderRadius: 12,
        backgroundColor: 'rgba(103, 114, 148, 0.16)',
        padding: 5,
    },
});

export default ModalCreateCategory;