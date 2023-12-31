import React, {useState, useEffect, useContext} from 'react';
import { AppContext } from '../../context/AppContext'
import {Modal, View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { styles } from '../../styles/styles.js';

const TreasureChest = ({ isVisible, onClose }) => { //State being passed in from parent component.
    const [imageSource, setImageSource] = useState(require('../../assets/treasureChest/treasure_chest.gif'));
    const {state, dispatch} = useContext(AppContext);
    const inventory = state.inventory;
    const egg_inventory = state.egg_inventory;

    const genRandomKey = () => {
        const randomKey = Math.floor(Math.random() * 10000);
        return randomKey;
    }

    const getRandomFruit = () => {
        const randomIndex = Math.floor(Math.random() * rewards.length);
        return rewards[randomIndex];
    };

    // Array of fruit images.
    const rewards = [
        { name: 'blue_pineapple', image: require('../../assets/fruits/blue_pineapple.png')}, 
        { name: 'fire_peach', image: require('../../assets/fruits/fire_peach.png') },
        { name: 'fruit_group', image: require('../../assets/fruits/fruit_group.png') },
        { name: 'ice_pineapple', image: require('../../assets/fruits/ice_pineapple.png') },
        { name: 'green_mango', image: require('../../assets/fruits/green_mango.png') },
        { name: 'mangosteen', image: require('../../assets/fruits/mangosteen.png') },
        { name: 'pear', image: require('../../assets/fruits/pear.png') },
        { name: 'rainbow_pineapple', image: require('../../assets/fruits/rainbow_pineapple.png')},
        { name: 'pineapple', image: require('../../assets/fruits/pineapple.png')},
        { name: 'artichoke', image: require('../../assets/fruits/artichoke.png')},
        { name: 'strawberry', image: require('../../assets/fruits/water_strawberry.png')},
        { name: 'earth_apple', image: require('../../assets/fruits/earth_apple.png')},
        {   
            id: genRandomKey(), 
            type: 'egg',
            pet: 'dragon',
            evolution: 0,
            image: require('../../assets/dragon/egg/egg-idle.gif'), 
            walking_image: require('../../assets/dragon/egg/egg-idle.gif'),
            name: "dragon_egg",
            expProgress: 0,
        },
        {   
            id: genRandomKey(), 
            type: 'egg',
            pet: 'bird',
            evolution: 0,
            image: require('../../assets/bird/egg/egg-idle.gif'), 
            walking_image: require('../../assets/bird/egg/egg-idle.gif'),
            name: "bird_egg",
            expProgress: 0,
        },
        {   
            id: genRandomKey(), 
            type: 'egg',
            pet: 'wolf',
            evolution: 0,
            image: require('../../assets/wolf/egg/egg-idle.gif'), 
            walking_image: require('../../assets/wolf/egg/egg-idle.gif'),
            name: "wolf_egg",
            expProgress: 0,
        }
    ];
    
    useEffect(() => {
        // Check if the modal is set to be visible.
        if (isVisible) {
            // Schedule a function to run after a delay (1500ms = 1.5 seconds in this case).
            const timer = setTimeout(() => {
                // Get a random fruit from the predefined list.
                const randomFruit = getRandomFruit();  
                if (randomFruit.type  === 'egg') {
                    setImageSource(randomFruit.image);
                    // Create a shallow copy of the existing inventory.
                    const updatedEggInventory = [...egg_inventory];
                    // Find the first item in the inventory that doesn't have an image and name - effectively an empty slot.
                    const firstEmptySlot = updatedEggInventory.find(item => !item.image && !item.name);
                    // Check if an empty slot was found.
                    if (firstEmptySlot) {
                        // Update the empty slot with the image and name of the random fruit.
                        firstEmptySlot.image = randomFruit.image;
                        firstEmptySlot.name = randomFruit.name;
                        firstEmptySlot.type = randomFruit.type;
                        firstEmptySlot.walking_image = randomFruit.walking_image;
                        firstEmptySlot.id = randomFruit.id;
                        firstEmptySlot.expProgress = randomFruit.expProgress;
                        firstEmptySlot.evolution = randomFruit.evolution;
                        firstEmptySlot.pet = randomFruit.pet;
                    } else {
                        // If no empty slot was found, add the new fruit to the end of the inventory.
                        updatedEggInventory.push({ 
                            id: Math.max(...updatedEggInventory.map(item => item.id)) + 1,  // Determine the next highest ID for the new item.
                            image: randomFruit.image,
                            name: randomFruit.name
                        });
                    }
                    // Dispatch an action to update the global inventory state with the modified inventory.
                    dispatch({ type: 'SET_EGG_INVENTORY', payload: updatedEggInventory });
                } else {
                    // Update the local state to reflect the image of the random fruit, which is displayed in the modal.
                    setImageSource(randomFruit.image);
                    // Create a shallow copy of the existing inventory.
                    const updatedInventory = [...inventory];
                    // Find the first item in the inventory that doesn't have an image and name - effectively an empty slot.
                    const firstEmptySlot = updatedInventory.find(item => !item.image && !item.name);
                    // Check if an empty slot was found.
                    if (firstEmptySlot) {
                        // Update the empty slot with the image and name of the random fruit.
                        firstEmptySlot.image = randomFruit.image;
                        firstEmptySlot.name = randomFruit.name;
                    } else {
                        // If no empty slot was found, add the new fruit to the end of the inventory.
                        updatedInventory.push({ 
                            id: Math.max(...updatedInventory.map(item => item.id)) + 1,  // Determine the next highest ID for the new item.
                            image: randomFruit.image,
                            name: randomFruit.name
                        });
                    }
                    // Dispatch an action to update the global inventory state with the modified inventory.
                    dispatch({ type: 'SET_INVENTORY', payload: updatedInventory });
                }
            }, 2000); 
            // Clean-up function: This will run when the component is unmounted or if the effect runs again.
            return () => clearTimeout(timer);  // Clear the timer to prevent it from running if the effect is cleaned up.
        } else {
            // If the modal is not visible, reset the image to show the closed treasure chest.
            setImageSource(require('../../assets/treasureChest/treasure_chest.gif')); 
        }
    }, [isVisible]);  // This effect depends on the 'isVisible' prop. It will run every time 'isVisible' changes.
    
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredViewTreasureChest}>
                <View style={styles.modalViewTreasureChest}>
                    <Image
                        source={imageSource}
                        style={styles.treasureImage}
                    />
                    <TouchableOpacity
                        style={styles.closeButtonTreasureChest}
                        onPress={onClose}
                    >
                        <Text style={styles.closeButtonTextTreasureChest}> Close </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default TreasureChest;