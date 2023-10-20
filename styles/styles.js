import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    text: {
        fontSize: 20,
        color: "blue",
    },
    image: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        //height: '100%',
        height: '100%',
    }
});