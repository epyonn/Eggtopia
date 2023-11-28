// InventoryModal.js
import React, {useState, useContext} from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View, Text , Animated, ScrollView} from 'react-native';
import { AppContext } from '../../context/AppContext';
import { styles } from '../../styles/styles';
import Sound from 'react-native-sound';



const InventoryModal = ({
    isInventoryOpen,
    activeTab,
    inventory,
    pet_inventory,
    selectedFruitId,
    selectedPetId,
    setSelectedPetId,
    dispatch,
    totalTime,
}) => {
    
    const {state} = useContext(AppContext);
    const [expGif, setExpGif] = useState(false);


    const chunkArray = (array, size) => {
        const chunkedArr = [];
        let copied = [...array];
        const numOfChild = Math.ceil(copied.length / size);
        for (let i = 0; i < numOfChild; i++) {
            chunkedArr.push(copied.splice(0, size));
        }
        return chunkedArr;
    };

    const renderInventoryItems = (items, setSelectedId) => {
        return items.map((itemRow, rowIndex) => (
            <View key={rowIndex} style={styles.inventoryRow}>
                {itemRow.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.inventoryItem}
                        onPress={() => setSelectedId(item.id)}
                    >
                        {/* Render item image and other properties here */}
                    </TouchableOpacity>
                ))}
            </View>
        ));
    };

    // Sounds and Exp Gif
    const fruitSound = new Sound(require('../../assets/sounds/munching-food.mp3'), (error) => {
        if (error) {
            console.log('failed to load the sound new update', error);
            return;
        }
    });

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
            dispatch({ type: 'SET_INVENTORY', payload: updatedInventory}) 
            // Reset selected fruit states and close the inventory
            
            // FIX THIS TO BE DISPATCHED.

            //setSelectedFruitId(null);
            //setSelectedPetId(null);




            dispatch({ type: 'SET_FRUIT_ID', payload: null });
            dispatch({ type: 'SET_PET_ID', payload: null });

            // Close inventory
            dispatch({ type: 'SET_INVENTORY_OPEN', payload: false});
            //setInventory(false);
        } else if (activeTab === 'Pets') {

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
                    setSelectedPetId(null);
                    // Use dispatch instead of setter functions.
                    dispatch({type: 'SET_INVENTORY_OPEN', payload: false});
                } else {
                    // Create a copy of the pet_inventory with the selected pet removed.
                    const updatedPetInventory = pet_inventory.filter(pet => pet.id !== selectedPetId);
                    updatedPetInventory.unshift(selectedPet);
                    dispatch({ type: 'SET_PET_INVENTORY', payload: updatedPetInventory });
                    dispatch({ type:'SELECT_PET', payload: selectedPetData });
                    setSelectedPetId(null);
                    // Use dispatch instead of setting functions
                    dispatch({ type: 'SET_INVENTORY_OPEN', payload: false});
                }
            }
        }  
    };

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={isInventoryOpen}
            onRequestClose={() => dispatch({ type: 'SET_INVENTORY_OPEN', payload: false})}
            >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <View style={styles.tabs}>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'Fruits' && styles.activeTab]}
                    // Change to dispatch here
                    //onPress={() => setActiveTab('Fruits')}>
                onPress={() => dispatch({ type: 'SET_INVENTORY_TAB', payload: 'Fruits'})}>
                    {console.log(activeTab)}
                    <Text> Fruits </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'Pets' && styles.activeTab]}
                    // Change to dispatch here

                    //onPress={() => setActiveTab('Pets')}
                    onPress={() => dispatch({ type: 'SET_INVENTORY_TAB', payload: 'Pets'})}>
                    {console.log(activeTab)}
                    <Text> Pets </Text>
                </TouchableOpacity>
        </View>
            <View style={styles.inventoryItems}>
                <ScrollView>
                {chunkArray([...(activeTab === 'Fruits' ? inventory : pet_inventory)], 4).map((row, rowIndex) => ( 
                    <View key={`${activeTab}-${rowIndex}`} style={styles.inventoryRow}>
                        {row.map((slot, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.inventoryFruit,
                                    selectedFruitId === slot.id && styles.selectedItem || selectedPetId === slot.id && styles.selectedItem
                                ]}
                                onPress={() => {
                                    if (slot.name) {
                                        if (activeTab === 'Fruits') {
                                           // setSelectedFruitId(slot.id);
                                            dispatch({ type: 'SET_FRUIT_ID', payload: slot.id})

                                        } 
                                        if (activeTab === 'Pets') {
                                            //setSelectedPetId(slot.id)
                                            dispatch({ type: 'SET_PET_ID', payload: slot.id})
                                        }
                                        
                                    } else {
                                        //setSelectedFruitId(null);
                                        //setSelectedPetId(null)

                                        dispatch({ type: 'SET_FRUIT_ID', payload: slot.id})
                                        dispatch({ type: 'SET_INVENTORY_TAB', payload: slot.id})
                                    }
                                }}>
                                <View style={styles.innerShadow}>
                                    {slot.image && <Image source={slot.image} style={styles.inventoryImage}/>}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
                </ScrollView>
                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={styles.inventoryButton}
                        onPress={useItem}
                    >
                        <Text style={styles.inventoryButtonText}> Use </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.inventoryButton}
                        onPress={() => {    
                            dispatch({ type: 'SET_FRUIT_ID', payload: null});
                            dispatch({ type: 'SET_PET_ID', payload: null});
                            dispatch({ type: 'SET_INVENTORY_OPEN', payload: false});
                        }}
                    >
                        <Text style={styles.inventoryButtonText}>Close</Text>
                    </TouchableOpacity>
                    <View
                        style={styles.timeContainer}
                    >   
                        <View
                            style={styles.timeLabel}
                        >
                            <Text
                                style={styles.labelText}
                            >
                                Total Time:  
                            </Text>
                        </View>
                        <Text
                            style={styles.timerText}
                        >
                            {`${Math.floor(totalTime / 60).toString().padStart(2, '0')}:${(totalTime % 60).toString().padStart(2, '0')}`}
                        </Text>
                    </View>
                </View>
            </View>
            </View>
        </View>
    </Modal>
    );
};

export default InventoryModal;
