import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TimerDisplay = ({hours, minutes, seconds}) => (
    <Text style={styles.timerText}>
        {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </Text>
);

const styles = StyleSheet.create({
    timerText: {
        fontSize: 35,
        fontWeight: 'bold',
        marginVertical: 10,
        borderWidth: 4,
        backgroundColor: "white",
        borderRadius: 10,
        paddingRight: 5,
        paddingLeft: 5,
        overflow: 'hidden'
    },
});

export default TimerDisplay;