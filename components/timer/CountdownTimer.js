import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../../context/AppContext';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import TreasureChest from '../rewards/TreasureChest';
import TimerDisplay from './TimerDisplay';
import PetImage from './PetImage';
import TimePickerModal from './TimePickerModal';
import ResetButton from './ResetButton';

const CountdownTimer = ({ initialHours = 0, initialMinutes = 0, initialSeconds = 0 }) => {
    
  const { state, dispatch } = useContext(AppContext);
    const selected_pet = state.selected_pet[0];
    const idleImage = selected_pet ? selected_pet.image : null;
    const walkingImage = selected_pet ? selected_pet.walking_image : null;
    const metrics = state.metrics;
    const [hours, setHours] = useState(initialHours);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isPickerVisible, setPickerVisibility] = useState(false);
    const [showTreasureChest, setShowTreasureChest] = useState(false);
    const [tempHours, setTempHours] = useState(hours);
    const [tempMinutes, setTempMinutes] = useState(minutes);
    const [currentGif, setCurrentGif] = useState(idleImage)
    const isTimerRunning = useRef(true);
    const wasReset = useRef(false);
    const [isManuallyFinished, setIsManuallyFinished] = useState(false);
    const [startHours, setStartHours] = useState(initialHours);
    const [startMinutes, setStartMinutes] = useState(initialMinutes);

    const resetTimer = () => {
        setIsManuallyFinished(true); // Set the manual finish flag
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    };

    // Array of wolf gifs. Eventually implement animation variety.
    const wolfGifs = [
        selected_pet.walking_image
    ];

    // useEffect hook to change the gif every 1.5 seconds
    // Eventual implementation of more animation variety. Need more assets.
    useEffect(() => {
        const gifInterval = setInterval(() => {
            if (isTimerRunning.current) {
                const randomGif = wolfGifs[Math.floor(Math.random() * wolfGifs.length)];
                setCurrentGif(randomGif);
            }
        }, 1500);
        return () => clearInterval(gifInterval);  // Cleanup function to clear the interval when unmounting
    }, []);

    // useEffect hook that handles the timer logic
    useEffect(() => {
        const myInterval = setInterval(() => {
            // Nested conditions to handle timer countdown logic
            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        // Logic to handle what happens when the timer reaches zero
                        if (!wasReset.current && !isManuallyFinished) {
                            dispatch({ type: "SET_INVENTORY_OPEN", payload: false})
                            setShowTreasureChest(true);
                            const totalTimeInMinutes = (startHours * 60) + startMinutes;
                            let updatedTotalMinutes = totalTimeInMinutes;
                            dispatch({ type:'SET_TOTAL_TIME', payload: updatedTotalMinutes})

                            const currentDate = new Date();
                            const formattedDate = (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' 
                                                + currentDate.getDate().toString().padStart(2, '0') + '-' 
                                                + currentDate.getFullYear();

                            let timeObject = {
                              date: formattedDate,
                              minutes: +totalTimeInMinutes // Convert string to a number
                            }

                            dispatch({ type: 'ADD_METRIC', payload: timeObject });

                            const thresholds = new Map([
                              [15, 0.03],
                              [30, 0.06],
                              [45, 0.09],
                              [60, 0.12],
                              [75, 0.15],
                              [100, 0.18],
                              [115, 0.21],
                              [130, 0.24]
                            ]);

                            let expIncrement = 0.0;

                            const updateExpIncrement = (updatedTotalMinutes) => {
                              for (let [minutes, increment] of thresholds) {
                                if (updatedTotalMinutes < minutes) {
                                  expIncrement = increment;
                                  break;
                                }
                              }
                            }

                            updateExpIncrement(updatedTotalMinutes);

                            dispatch({
                              type: 'INCREMENT_EXP',
                              payload: Math.min(state.expProgress + expIncrement, 1)
                            });

                        }
                        setIsManuallyFinished(false); // Reset the manual finish flag
                        clearInterval(myInterval);  // Stop the timer
                    } else {
                        setHours(hours - 1);
                        setMinutes(59);
                        setSeconds(59);
                    }
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } else {
                setSeconds(seconds - 1);  
            }
        }, 1000);
        return () => clearInterval(myInterval);  // Cleanup function to clear the interval when unmounting or state changes
    }, [hours, minutes, seconds]);

    const handleConfirmTime = (selectedHours, selectedMinutes) => {
      setHours(selectedHours);
      setMinutes(selectedMinutes);
      setSeconds(0);
      setStartHours(selectedHours);
      setStartMinutes(selectedMinutes);
      setPickerVisibility(false);
    };

    return (
        <View style={styles.container}>
          <TreasureChest 
              isVisible={showTreasureChest}
              onClose={() => setShowTreasureChest(false)}
          />

          <View style={styles.expBarLabelContainer}> 
            <View style={styles.textContainer}>
              <Text style={styles.expText}>EXP</Text>
            </View>
            <View style={styles.expBarContainer}>
              <View style={[styles.expBarProgress, { width: `${selected_pet.expProgress * 100}%`}]} />
            </View>
          </View>

          <PetImage 
              hours={hours} 
              minutes={minutes} 
              seconds={seconds} 
              selectedPet={selected_pet} 
          />

          <TouchableOpacity onPress={() => setPickerVisibility(true)}>
            <TimerDisplay hours={hours} minutes={minutes} seconds={seconds} />
          </TouchableOpacity>

          <TimePickerModal
                isVisible={isPickerVisible}
                onClose={() => setPickerVisibility(false)}
                hours={tempHours}
                minutes={tempMinutes}
                setHours={setTempHours}
                setMinutes={setTempMinutes}
                onConfirm={handleConfirmTime}
            />
            
          <ResetButton onReset={resetTimer}/>
      </View>
    );
};

// Define component styles
const styles = StyleSheet.create({
  // Main container styles
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Text style for the timer display
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
  // Styles for the modal's centered view
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  // Styles for the modal's main view
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 3,
  },
  // Styles for the container holding the hour and minute pickers
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  // Text style for the reset button
  buttonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: "bold"
  },
  // Reset button styles
  resetButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white'
  },
  expBarContainer: {
    position: 'absolute',  // Add absolute position
    right: 70,              // Start it from the rightmost edge
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
    fontWeight: 'bold',       // Add a bit of margin to separate it from the bar
    zIndex: 2,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  textContainer: {
    // Any additional styles can go here
    backgroundColor: 'white'
  },
  brownBag: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    },
  monster: {
    width: 230,
    height: 230,
  }
});

export default CountdownTimer;