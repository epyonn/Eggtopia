// Import necessary hooks and functions from React library
import React, { useState, useEffect, useContext, useRef } from 'react';
// Import the application context
import { AppContext } from '../context/AppContext';
// Import necessary components and styling from React Native
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
// Import the Picker component for user input on time
import { Picker } from '@react-native-picker/picker';
// Import the TreasureChest component
import TreasureChest from './TreasureChest';

// Define the CountdownTimer component, with default props for hours, minutes, and seconds
const CountdownTimer = ({ initialHours = 0, initialMinutes = 0, initialSeconds = 0 }) => {
    // useContext hook to access the global state and dispatch function
    const { state, dispatch } = useContext(AppContext);
    // Constant for experience increment value
    const expIncrement = 0.02;
    const selected_pet = state.selected_pet[0];

    // Check if selected_pet exists before accessing its properties
    const idleImage = selected_pet ? selected_pet.image : null;
    const walkingImage = selected_pet ? selected_pet.walking_image : null;

    // useState hooks to manage local state of hours, minutes, and seconds
    const [hours, setHours] = useState(initialHours);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    // useState hook to control the visibility of the time picker modal
    const [isPickerVisible, setPickerVisibility] = useState(false);
    // useState hook to control the visibility of the treasure chest
    const [showTreasureChest, setShowTreasureChest] = useState(false);

    // Temp time for pickers

    const [tempHours, setTempHours] = useState(hours);
    const [tempMinutes, setTempMinutes] = useState(minutes);

    // useState hook for the gif animation display
    //const [currentGif, setCurrentGif] = useState(require('../assets/wolf/firstEvo/wolf-first-idle.gif'));
    const [currentGif, setCurrentGif] = useState(idleImage)
    
    // useRef hook to track if the timer is running
    const isTimerRunning = useRef(true);
    // useRef hook to track if the timer was reset
    const wasReset = useRef(false);

    // New state to check if the timer is manually finished
    const [isManuallyFinished, setIsManuallyFinished] = useState(false);


    // Total Time
    const [startHours, setStartHours] = useState(initialHours);
    const [startMinutes, setStartMinutes] = useState(initialMinutes);
    const [totalTime, setTotalTime] = useState(0);

    // Function to reset the timer to default values
    const resetTimer = () => {
        setIsManuallyFinished(true); // Set the manual finish flag
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    };

    // Array of wolf GIFs
    const wolfGifs = [
      /*
        require('../assets/wolf_running.gif'),
        require('../assets/wolf_slash.gif'),
        require('../assets/wolf_idle.gif'),
        require('../assets/wolf_fire.gif')
      */
        /*
        require('../assets/wol
        f/wolf_running.gif'),
        require('../assets/wolf/wolf_slash.gif'),
        require('../assets/wolf/wolf_idle.gif'),
        require('../assets/wolf/wolf_fire.gif')
        */

        //require('../assets/wolf/firstEvo/wolf-first-walking.gif')
        selected_pet.walking_image
    ];

    // useEffect hook to change the gif every 1.5 seconds
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

                            dispatch({
                                type: 'INCREMENT_EXP',
                                payload: Math.min(state.expProgress + expIncrement, 1)
                            });
                            setShowTreasureChest(true);

                            const totalTimeInMinutes = (startHours * 60) + startMinutes;
                            let updatedTotalMinutes = state.totalTime + totalTimeInMinutes;
                            dispatch({ type:'SET_TOTAL_TIME', payload: updatedTotalMinutes})
                            console.log("total time " + state.totalTime)
                            
                            //setTotalTime(prevTime => prevTime + totalTimeInMinutes);

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
                setSeconds(seconds - 1);  // Decrement the seconds
            }
        }, 1000);

        return () => clearInterval(myInterval);  // Cleanup function to clear the interval when unmounting or state changes
    }, [hours, minutes, seconds]);


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
      { hours === 0 && minutes === 0 && seconds === 0 ? (
        <Image
          source={selected_pet.image}
          style={styles.monster}

      />) : (
        <Image
          source={selected_pet.walking_image}
          style={styles.monster}
        />
      )
      }
      <TouchableOpacity onPress={() => setPickerVisibility(true)}>
        <Text style={styles.timerText}>
          {hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isPickerVisible}
        onRequestClose={() => setPickerVisibility(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tempHours}
                style={{ width: 150 }}
                onValueChange={(itemValue) => setTempHours(itemValue)}>
                {Array.from({ length: 24 }, (_, index) => (
                  <Picker.Item key={index} label={`${index} Hr`} value={index} />
                ))}
              </Picker>
              <Picker
                selectedValue={tempMinutes}
                style={{ width: 150 }}
                onValueChange={(itemValue) => {
                  setTempMinutes(itemValue);
                  //setSeconds(0);
                }}>
                {Array.from({ length: 60 }, (_, index) => (
                  <Picker.Item key={index} label={`${index} Min`} value={index} />
                ))}
              </Picker>
            </View>

            <TouchableOpacity onPress={() => {
              setHours(tempHours);
              setMinutes(tempMinutes);
              setSeconds(0);

              // Total Time
              setStartHours(tempHours);  // Update starting hours
              setStartMinutes(tempMinutes);  

              setPickerVisibility(false)

            }}
            style={styles.resetButton}
            >
              <Text>Done</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={resetTimer} style={styles.resetButton}>
        <Text style={styles.buttonText}> Reset </Text>
      </TouchableOpacity>
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
    paddingHorizontal: 20,
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
  //width: 230,
  //height: 230,
  width: 230,
  height: 230,
}

});

// Export the CountdownTimer component
export default CountdownTimer;