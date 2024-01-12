import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { Image, TouchableOpacity, View, StyleSheet, Modal, Text, ScrollView } from 'react-native';
import { chunkArray } from '../../utils/UtilityFunctions';

const Incubator = () => {
    const { state, dispatch } = useContext(AppContext);
    const { egg_inventory, pet_inventory, selected_pet } = state;
    const selectedPet = selected_pet[0];
    const [isIncubatorOpen, setIncubator] = useState(false);
    const [selectedEggId, setSelectedEggId] = useState(null);
    
    const useItem = () => {
        const selectedPetData = egg_inventory.find(egg => egg.id === selectedEggId);
        if (!selectedPetData) return;

        let updatedEggInventory = egg_inventory.filter(egg => egg.id !== selectedEggId);
        updatedEggInventory.push({ id: Math.max(...updatedEggInventory.map(item => item.id)) + 1 });

        if (selectedPetData.type === "egg") {
            if (selectedPet.type === 'pet') {
                let updatedPetInventory = [...pet_inventory];
                const emptySlotIndex = pet_inventory.findIndex(pet => !pet.name);
                if (emptySlotIndex !== -1) {
                    updatedPetInventory[emptySlotIndex] = selectedPet;
                }
                dispatch({ type: 'SELECT_PET', payload: selectedPetData });
                dispatch({ type: 'SET_PET_INVENTORY', payload: updatedPetInventory });
            } else if (selectedPet.type === "egg") {
                const emptySlotIndex = updatedEggInventory.findIndex(egg => !egg.name);
                if (emptySlotIndex !== -1) {
                    updatedEggInventory[emptySlotIndex] = selectedPet;
                }
                dispatch({ type: 'SELECT_PET', payload: selectedPetData });
            }
        }

        dispatch({ type: 'SET_EGG_INVENTORY', payload: updatedEggInventory });
        setSelectedEggId(null);
        setIncubator(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setIncubator(true)}>
                <Image source={require('../../assets/incubator/egg_incubator.png')} style={styles.incubator} />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isIncubatorOpen}
                onRequestClose={() => setIncubator(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.eggItems}>
                            <ScrollView>
                                {chunkArray([...egg_inventory], 4).map((row, rowIndex) => (
                                    <View key={rowIndex} style={styles.inventoryRow}>
                                        {row.map((slot, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={[
                                                    styles.inventoryEgg,
                                                    selectedEggId === slot.id && styles.selectedEgg
                                                ]}
                                                onPress={() => {
                                                    if (slot.name) {
                                                        setSelectedEggId(prevId => prevId === slot.id ? null : slot.id);
                                                    }
                                                }}
                                            >
                                                {slot.image && <Image source={slot.image} style={styles.eggImage} />}
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                ))}
                            </ScrollView>
                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.eggButton} onPress={useItem}>
                                    <Text style={styles.eggButtonText}>Select</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.eggButton} onPress={() => {
                                    setIncubator(false)
                                    setSelectedEggId(null)
                                    }}>
                                    <Text style={styles.eggButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        position: 'absolute',
        top: 40,
        right: 0,
    },
    incubator: {
        display: 'flex',
        width: 100,
        height: 100,
        justifyContent:'flex-end'
    },
    eggItems: {
        flexDirection: 'column',
        //backgroundColor: 'black',
        justifyContent: 'space-between',
        height: 420
    
      },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        //backgroundColor: '#DBA463',
        backgroundColor: '#F4D29C',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        justifyContent: 'space-between',
        borderWidth: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    
      },
      inventoryEgg: {
        margin: 5,
        borderWidth: 3,
        borderRadius: 10,
        width: 64,
        height: 64,
        backgroundColor: '#FFFFFF',
        shadowColor: "#000",
        shadowOffset: { 
            width: 3, 
            height: 3 
        },  
        shadowOpacity: 0.5,
        shadowRadius: 1,
        shadowOffset: { 
            width: 3, 
            height: 3 
        },
        elevation: 2,
      },
      selectedEgg: {
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: '#B3B9D1',
      },
      buttonRow: {
        dislay: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      inventoryRow: {
        display: 'flex',
        flexDirection: 'row',
      },
      eggButton: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
        alignSelf: 'center',
        marginRight: 5
      },
      eggButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      eggImage: {
        width: 60,
        height: 60,
    },
})


export default Incubator;