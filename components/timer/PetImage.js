import React from 'react';
import { Image, StyleSheet } from 'react-native';

const PetImage = ({ hours, minutes, seconds, selectedPet }) => {
    const imageSource = hours === 0 && minutes === 0 && seconds === 0 
        ? selectedPet.image 
        : selectedPet.walking_image;

    return (
        <Image
            source={imageSource}
            style={styles.monster}
        />
    );
};

const styles = StyleSheet.create({
    monster: {
        width: 230,
        height: 230,
    },
});

export default PetImage;
