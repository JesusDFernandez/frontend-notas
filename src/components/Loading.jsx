import React from 'react'
import { StyleSheet, Modal, View, Image } from 'react-native';

function Loading({ visible }) {
    return (
        <>
            <Modal transparent visible={visible}>
                <View style={styles.fullScreen}>
                    <Image
                        source={require('../../assets/spinner.gif')}
                    />
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9,
        backgroundColor: "rgba(0,0,0,0.5)"
    }
});
export default Loading