import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ResetButton = ({ onReset }) => {
    return (
        <TouchableOpacity onPress={onReset} style={styles.resetButton}>
            <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonText: {
        color: 'black',
        fontSize: 15,
        fontWeight: "bold"
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

export default ResetButton;
