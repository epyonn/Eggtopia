import React, {useState, useContext, useEffect} from 'react';
import { AppContext } from '../context/AppContext';
import { Image, Modal, StyleSheet, TouchableOpacity, View, Text , Animated} from 'react-native';
import evolutionData from '../context/evolutionData';

const BrownBag = () => {
    // Use AppContext to access global state and the dispatch function.
    const { state, dispatch } = useContext(AppContext);
    const inventory = state.inventory;
    const pet_inventory = state.pet_inventory;
    const selectedPet = state.selected_pet[0];
    const egg_inventory = state.egg_inventory;
    const gifOpacity = useState(new Animated.Value(0))[0];

    // Define local component states for inventory modal visibility and selected fruit properties.
    const [isInventoryOpen, setInventory] = useState(false);
    const [selectedFruit, setSelectedFruit] = useState(null);
    const [selectedFruitId, setSelectedFruitId] = useState(null);
    const [selectedPetId, setSelectedPetId] = useState(null);
    const [activeTab, setActiveTab] = useState('Fruits');
    const [isEvolutionModalVisible, setEvolutionModalVisible] = useState(false);

    // Define a hash map to hold the evolution data
    // Function to use a selected fruit, updating inventory and user experience points.
    const useItem = () => {
        if (activeTab === 'Fruits') {
            // Filter out the fruit that matches the selected ID.
            const updatedInventory = inventory.filter(item => item.id !== selectedFruitId);
            // Add an empty slot to the inventory to replace the used fruit.
            updatedInventory.push({ id: Math.max(...updatedInventory.map(item => item.id)) + 1 });

            // Dispatch the updated inventory to the global state.
            dispatch({ type: 'SET_INVENTORY', payload: updatedInventory });
            
            // Reset selected fruit states and close the inventory.
            setSelectedFruitId(null);
            setInventory(false);
            // Dispatch to increment user experience by a given amount.
            dispatch({ type: 'INCREMENT_EXP', payload: 0.8 });

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
                    setInventory(false);

                } else {
                    // Create a copy of the pet_inventory with the selected pet removed.
                    const updatedPetInventory = pet_inventory.filter(pet => pet.id !== selectedPetId);

                    updatedPetInventory.unshift(selectedPet);
                    dispatch({ type: 'SET_PET_INVENTORY', payload: updatedPetInventory });

                    dispatch({ type:'SELECT_PET', payload: selectedPetData });
                    setSelectedPetId(null);
                    setInventory(false);

                    console.log("pet inventory:", pet_inventory)
                    console.log(selectedPet)

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
                    duration: 5000,
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
            <TouchableOpacity onPress={() => setInventory(true)}>
                <Image source={require('../assets/bag/brownbag7.png')} style={styles.brownBag} />
            </TouchableOpacity>
            <Modal
                animationType='slide'
                transparent={true}
                visible={isInventoryOpen}
                onRequestClose={() => setInventory(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                    <View style={styles.tabs}>
                        <TouchableOpacity 
                            style={[styles.tab, activeTab === 'Fruits' && styles.activeTab]}
                            onPress={() => setActiveTab('Fruits')}>
                            <Text> Fruits </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.tab, activeTab === 'Pets' && styles.activeTab]}
                            onPress={() => setActiveTab('Pets')}>
                            <Text> Pets </Text>
                        </TouchableOpacity>
                    </View>

                        <View style={styles.inventoryItems}>
                            {chunkArray([...(activeTab === 'Fruits' ? inventory : pet_inventory)], 4).map((row, rowIndex) => (
                                <View key={rowIndex} style={styles.inventoryRow}>
                                    {row.map((slot, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={[
                                                styles.inventoryFruit,
                                                selectedFruitId === slot.id && styles.selectedItem ||
                                                selectedPetId === slot.id
                                                
                                                &&
                    
                                                styles.selectedItem
                                            ]}
                                            onPress={() => {
                                                if (slot.name) {
                                                    if (activeTab === 'Fruits') {
                                                        setSelectedFruitId(slot.id);
                                                    } 
                                                    if (activeTab === 'Pets') {
                                                        setSelectedPetId(slot.id)
                                                    }
                                                    
                                                } else {
                                                    setSelectedFruitId(null);
                                                    setSelectedPetId(null)
                                                }
                                            }}>
                                            <View style={styles.innerShadow}>
                                                {slot.image && <Image source={slot.image} style={styles.inventoryImage}/>}

                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ))}
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
                                        setInventory(false);
                                        setSelectedFruit(null);
                                    }}
                                >
                                    <Text style={styles.inventoryButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
            animationType='slide'
            transparent={true}
            visible={isEvolutionModalVisible}
            onRequestClose={() => setEvolutionModalVisible(false)}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {/* Container for images and evolution text */}
                    <View style={styles.evolutionContainer}>
                        {/* Original Pet Image with inverse opacity */}
                        <Animated.Image 
                            source={selectedPet.image} 
                            style={[styles.evolutionImage, {opacity: Animated.subtract(1, gifOpacity)}]}
                        />
                        {/* Evolved Pet Image */}
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

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  brownBag: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 40,
    left: 0,
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
    elevation: 5,
    maxWidth: '90%', // Add a max width
    maxHeight: '80%'  // Add a max height

  },
  inventoryItems: {
    flexDirection: 'column',
    //backgroundColor: 'black',
    justifyContent: 'space-between',

  },
  inventoryRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  inventoryFruit: {
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

  inventorySlot: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: { 
        width: -1, 
        height: -1 
    },
    shadowOpacity: 0.0,
    shadowRadius: 5,
    shadowOffset: { 
        width: 3, 
        height: 3 
    },
    elevation: 2,
},
  selectedItem: {
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: '#B3B9D1',
  },
  inventoryButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    alignSelf: 'center',
    marginRight: 5
  },
  inventoryButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  buttonRow: {
    dislay: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#2196F3',
    },
    inventoryImage: {
        width: 60,
        height: 60,
        //resizeMode: 'cover',
        
    },

    evolutionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20, // or adjust this value to get desired spacing
        maxHeight: '90%',
        maxHeight: '80%',
        padding: 20
    },
    
    evolutionImage: {
        width: 200,
        height: 200,
        position: 'absolute',
        resizeMode: 'cover' // make sure the image covers the given width and height without distortion
    },
    
    evolutionText: {
        marginTop: 230, // this value should be slightly more than the height of the images to position the text underneath them
        fontSize: 16, // adjust as per your requirement
        //fontWeight: 'bold',
        textAlign: 'center'
    },
    evolutionButton: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 15,
        alignSelf: 'center',
        marginBottom: 5, // Add marginBottom to control the distance between the text and the button
      },
    
  
});

export default BrownBag;