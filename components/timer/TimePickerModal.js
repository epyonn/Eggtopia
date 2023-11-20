// TimePickerModal.js
import React from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TimePickerModal = ({ isVisible, onClose, hours, minutes, setHours, setMinutes, onConfirm }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={hours}
                            style={{ width: 150 }}
                            onValueChange={(itemValue) => setHours(itemValue)}>
                            {Array.from({ length: 24 }, (_, index) => (
                                <Picker.Item key={index} label={`${index} Hr`} value={index} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={minutes}
                            style={{ width: 150 }}
                            onValueChange={(itemValue) => setMinutes(itemValue)}>
                            {Array.from({ length: 60 }, (_, index) => (
                                <Picker.Item key={index} label={`${index} Min`} value={index} />
                            ))}
                        </Picker>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            onConfirm(hours, minutes);
                        }}
                        style={styles.resetButton}
                    >
                        <Text>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 3,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    resetButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: 'white'
    },
});

export default TimePickerModal;
