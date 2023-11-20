import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExperienceBar = ({ expProgress }) => {
    return (
        <View style={styles.expBarLabelContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.expText}>EXP</Text>
            </View>
            <View style={styles.expBarContainer}>
                <View style={[styles.expBarProgress, { width: `${expProgress * 100}%` }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    expBarLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '60%',
        height: 30,
        marginTop: 20,
    },
    expText: {
        color: 'yellow',
        fontSize: 12,
        fontWeight: 'bold',
        zIndex: 2,
        backgroundColor: 'black',
        borderRadius: 10,
    },
    textContainer: {
        backgroundColor: 'white'
    },
    expBarContainer: {
        position: 'absolute',
        right: 70,
        width: '60%',
        height: 15,
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        marginTop: 20,
        overflow: 'hidden',
        borderWidth: 2,
    },
    expBarProgress: {
        height: '100%',
        backgroundColor: '#4CAF50',
    },
});

export default ExperienceBar;
