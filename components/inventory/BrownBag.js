import React, {useState, useContext, useEffect} from 'react';
import { AppContext } from '../../context/AppContext';
import { Image, Modal, TouchableOpacity, View, Text , Animated} from 'react-native';
import Sound from 'react-native-sound';
import evolutionData from '../../context/evolutionData';
import InventoryModal from './InventoryModal';

import { styles } from '../../styles/styles';

const BrownBag = () => {
    // Use AppContext to access global state and the dispatch function.
    const { state, dispatch } = useContext(AppContext);
    const inventory = state.inventory;
    const pet_inventory = state.pet_inventory;
    const selectedPet = state.selected_pet[0];
    const egg_inventory = state.egg_inventory;
    const gifOpacity = useState(new Animated.Value(0))[0];
    const isInventoryOpen = state.isInventoryOpen;
    const totalTime = state.totalTime;
    const {activeTab} = state;
    // const [selectedFruit, setSelectedFruit] = useState(null);
    const selectedFruitId = state.selectedFruitId;
    const selectedPetId = state.selectedPetId;
    const [isEvolutionModalVisible, setEvolutionModalVisible] = useState(false);
    const [expGif, setExpGif] = useState(false);
    
    // Sounds and Exp Gif
    const fruitSound = new Sound(require('../../assets/sounds/munching-food.mp3'), (error) => {
        if (error) {
            console.log('failed to load the sound new update', error);
            return;
        }
    });

    
    // Function to use a selected fruit, updating inventory and user experience points.
    const useItem = () => {
        if (activeTab === 'Fruits') {
            const updatedInventory = inventory.map(item => {
                if (item.id === selectedFruitId && item.name) {
                    // Dispatch to increment user experience by a given amount.
                    // Original payload 0.8 for debugging.
                    //dispatch({ type: 'INCREMENT_EXP', payload: 0.02 });
                    dispatch({ type: 'INCREMENT_EXP', payload: 0.8 });
                    fruitSound.play((success) => {
                        if (success) {
                            console.log('Sound played successfully');
                        } else {
                            console.log('Play sound failed');
                        }
                    })
                    setTimeout(() => {
                        fruitSound.stop(() => {
                            console.log('Sound stopped after 1.8 seconds');
                        })
                    }, 1800);
                    setExpGif(true);
                    setTimeout(() => {
                        setExpGif(false);
                    }, 3000)
                    return { id: selectedFruitId };
                }
                return item;  // returning the item unchanged if the condition isn't met
            });

            dispatch({ type: 'SET_INVENTORY', payload: updatedInventory}); 
            dispatch({ type: 'SET_FRUIT_ID', payload: null});
            dispatch({ type: 'SET_PET_ID', payload: null});
            dispatch({ type: 'SET_INVENTORY_OPEN', payload: false});

        } else if (activeTab === 'Pets') {
            // setSelectedFruitId(null);
            // Pet that will be added to the main screen based on Id chosen
            const selectedPetData = pet_inventory.find(pet => pet.id === selectedPetId)
            if(selectedPetData) {
                if(selectedPet.type === "egg") {
                    // Put egg back into inventory
                    const updatedEggInventory = [...egg_inventory];
                    const emptySlotIndex = egg_inventory.findIndex(egg => !egg.name);
                    updatedEggInventory[emptySlotIndex] = selectedPet;
                    dispatch({type: "SET_EGG_INVENTORY", payload: updatedEggInventory});
                    dispatch({type:'SELECT_PET', payload: selectedPetData});
                    const updatedPetInventory = pet_inventory.filter(pet => pet.id !== selectedPetId);
                    updatedPetInventory.push({id: Math.max(...updatedPetInventory.map(item => item.id)) + 1});
                    dispatch({ type: 'SET_PET_INVENTORY', payload: updatedPetInventory })
                    dispatch({ type: 'SET_PET_ID', payload: null});
                    // Use dispatch instead of setter functions.
                    dispatch({type: 'SET_INVENTORY_OPEN', payload: false});
                } else {
                    // Create a copy of the pet_inventory with the selected pet removed.
                    const updatedPetInventory = pet_inventory.filter(pet => pet.id !== selectedPetId);
                    updatedPetInventory.unshift(selectedPet);
                    dispatch({ type: 'SET_PET_INVENTORY', payload: updatedPetInventory });
                    dispatch({ type:'SELECT_PET', payload: selectedPetData });
                    // setSelectedPetId(null);
                    // Use dispatch instead of setting functions
                    dispatch({ type: 'SET_INVENTORY_OPEN', payload: false});
                }
            }
        }  
    };

    // useEffect for pet evolution
    const evolvePet = () => {
        if (selectedPet.expProgress >= 1 && selectedPet.evolution !== 3) {
            const evolvedPet = { ...selectedPet, evolution: selectedPet.evolution + 1, expProgress: 0 };
            const petTypeMap = evolutionData.get(selectedPet.pet);
            const petEvolutionData = petTypeMap && petTypeMap.get(evolvedPet.evolution);
            if (petEvolutionData) {
                Object.assign(evolvedPet, petEvolutionData);
                // Fade in the evolved pet
                Animated.timing(gifOpacity, {
                    toValue: 1,
                    duration: 2500,
                    useNativeDriver: true
                }).start(() => {
                    // Once animation is complete, dispatch the evolved pet
                    dispatch({ type: "SELECT_PET", payload: evolvedPet });
                    // Reset opacity for next evolution
                    gifOpacity.setValue(0);
                });
            }
            setEvolutionModalVisible(true);
        }
    };

    // Use useEffect to call evolvePet whenever selectedPet.expProgress changes
    useEffect(() => {
        evolvePet();
    }, [selectedPet.expProgress]);
    // Utility function to chunk an array into smaller arrays of specified size.
    const chunkArray = (array, chunkSize) => {
        const results = [];
        while (array.length) {
            results.push(array.splice(0, chunkSize));
        }
        return results;
    };

    // Component JSX rendering logic.
    return (
        <View style={styles.container}>
            {
                expGif &&
                <Image
                source={require('../../assets/expBar/plusExpver1.gif')}
                style={styles.expGif}
                />
            }
            
            <TouchableOpacity onPress={() => dispatch({ type: 'SET_INVENTORY_OPEN', payload: true}, console.log('pressed ' + isInventoryOpen))}>
                <Image source={require('../../assets/bag/brownbag7.png')} style={styles.brownBag} />
            </TouchableOpacity>
    
            <InventoryModal
                isInventoryOpen={isInventoryOpen} 
                activeTab={activeTab}
                inventory={inventory} 
                pet_inventory={pet_inventory} 
                selectedFruitId={selectedFruitId}
                selectedPetId={selectedPetId} 
                dispatch={dispatch} 
                totalTime = {totalTime}
                setExpGif = {setExpGif}
            />
            <Modal
                animationType='slide'
                transparent={true}
                visible={isEvolutionModalVisible}
                onRequestClose={() => setEvolutionModalVisible(false)}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.evolutionContainer}>
                        <Animated.Image 
                            source={selectedPet.image} 
                            style={[styles.evolutionImage, {opacity: Animated.subtract(1, gifOpacity)}]}
                        />
                        <Animated.Image 
                            source={evolutionData.get(selectedPet.pet)?.get(selectedPet.evolution + 1)?.image || selectedPet.image} 
                            style={[styles.evolutionImage, {opacity: gifOpacity}]}
                        />
                        <Text style={styles.evolutionText}>Your pet has evolved!</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.evolutionButton} 
                        onPress={() => setEvolutionModalVisible(false)}
                    >
                        <Text style={styles.inventoryButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </Modal>
        </View>
    );
};

export default BrownBag;

