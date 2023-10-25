import React, {useState, useContext} from 'react';
import {AppContext} from '../context/AppContext';
import {Image, TouchableOpacity, View, StyleSheet, Modal, Text, ScrollView} from 'react-native';

const Incubator = () => {
    // use AppContext to access global state to dispatch the function
    const {state, dispatch} = useContext(AppContext);
    const egg_inventory = state.egg_inventory;

    const inventory = state.inventory;
    const pet_inventory = state.pet_inventory;
    const selectedPet = state.selected_pet[0];

    // Inventory Open
    const [isIncubatorOpen, setIncubator] = useState(false);
    const [selectedEggId, setSelectedEggId] = useState(null);

    // Utility function to chunk an array into smaller arrays of specified size
    const chunkArray = (array, chunkSize) => {
        const results = [];
        while (array.length) {
            results.push(array.splice(0,chunkSize))
        }
        return results;
    }

    const useItem = () => {

            // Pet that will be added to the main screen based on Id chosen
            const selectedPetData = egg_inventory.find(egg => egg.id === selectedEggId)

            if(selectedPetData.type === "egg" && selectedPet.type === 'pet') {
                // selectedPet is the egg that is active
                //const currentEgg = selectedPet;
                
                // Remove the selected egg from egg_inventory
                const updatedEggInventory = egg_inventory.filter(egg => egg.id !== selectedEggId)
                updatedEggInventory.push({id: Math.max(...updatedEggInventory.map(item => item.id)) + 1});



                const updatedPetInventory = [...pet_inventory];
                const emptySlotIndex = pet_inventory.findIndex(pet => !pet.name);
                updatedPetInventory[emptySlotIndex] = selectedPet;
 
                // Create a copy of the pet_inventory with the selected pet removed.
               // const emptySlotIndex = egg_inventory.findIndex(pet => !pet.name)
                //updatedEggInventory[emptySlotIndex] = currentEgg;

                dispatch({ type:'SELECT_PET', payload: selectedPetData });

                // Set Egg Inventory  
                dispatch({ type:'SET_EGG_INVENTORY', payload: updatedEggInventory });

                dispatch({ type: 'SET_PET_INVENTORY', payload: updatedPetInventory});

                console.log("pet inventory after egg use ", pet_inventory)
                console.log("egg_inventory after clicking select: ", egg_inventory)


            }

            if (selectedPet.type === "egg" && selectedPetData.type === "egg")
            {
                const currentPet = selectedPet;

                const updatedEggInventory = egg_inventory.filter(egg => egg.id !== selectedEggId)
                updatedEggInventory.push({id: Math.max(...updatedEggInventory.map(item => item.id)) + 1});


                const emptySlotIndex = egg_inventory.findIndex(egg => !egg.name)
                updatedEggInventory[emptySlotIndex] = currentPet;
                dispatch({ type:'SELECT_PET', payload: selectedPetData });
                dispatch({ type: 'SET_EGG_INVENTORY', payload: updatedEggInventory})
            }

            setSelectedEggId(null);
            setIncubator(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setIncubator(true)}
            >
                <Image
                    
                    source={require('../assets/incubator/egg_incubator.png')}
                    style={styles.incubator} 
                
                />
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
                                    {
                                        row.map((slot,index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={[
                                                    styles.inventoryEgg,
                                                    selectedEggId === slot.id && styles.selectedEgg

                                                ]}
                                                onPress={() => {
                                                    if (slot.name) {
                                                        setSelectedEggId(slot.id);
                                                    } else {
                                                        setSelectedEggId(null);
                                                    }
                                                }}
                                            >
                                                {slot.image && <Image source={slot.image} style={styles.eggImage} />}

                                            </TouchableOpacity>
                                        ))
                                    }
                                </View>
                            ))}
                            </ScrollView>

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={styles.eggButton}
                                    onPress={useItem}
                                >
                                    <Text style={styles.eggButtonText}> Select </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.eggButton}
                                    onPress={() => {
                                        setIncubator(false);
                                    }}
                                >
                                    <Text style={styles.eggButtonText}> Close </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
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
        //resizeMode: 'cover',
        
    },


})


export default Incubator;