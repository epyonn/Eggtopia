import React, { createContext, useReducer, useEffect , useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Creating a new context for our app.
export const AppContext = createContext();

const initialState = {
    totalTime : 0,
    expProgress: 0,
    inventory: [
        { id: 1, image: require('../assets/fruits/rainbow_pineapple.png'), name: "rainbow_pineapple" },
        { id: 2, image: require('../assets/fruits/mangosteen.png'), name: 'mangosteen' },
        { id: 3, image: require('../assets/fruits/pear.png'), name: 'pear' },
        { id: 4, image: require('../assets/fruits/blue_pineapple.png'), name: 'blue_pineapple' },
        { id: 5, image: require('../assets/fruits/fruit_group.png'), name: 'fruit_group' },
        { id: 6, image: require('../assets/fruits/pear.png'), name: 'pear'  }, 
        { id: 7, image: require('../assets/fruits/water_strawberry.png'), name: 'water_strawberry' }, 
        { id: 8 }, // Empty slots
        { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 },
        { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 },
        { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 },
    ],
    egg_inventory: [
        { 
            id: 109203, 
            type: 'egg',
            pet: 'dragon',
            evolution: 0,
            image: require('../assets/dragon/egg/egg-idle.gif'), 
            walking_image: require('../assets/dragon/egg/egg-idle.gif'),
            name: "dragon_egg",
            expProgress: 0,
        }, 
        { 
            id: 158943, 
            type: 'egg',
            pet: 'bird',
            evolution: 0,
            image: require('../assets/bird/egg/egg-idle.gif'), 
            walking_image: require('../assets/bird/egg/egg-idle.gif'),
            name: "bird_egg",
            expProgress: 0,
        }, 
        { id: 3 }, { id: 4 },
        { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, // Empty slots
        { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 },
        { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 },
        { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 },
    ],
    pet_inventory: [
        { 
            id: 98485, 
            type: 'pet',
            pet: 'wolf',
            evolution: 1,
            image: require('../assets/wolf/firstEvo/wolf-first-idle.gif'), 
            walking_image: require('../assets/wolf/firstEvo/wolf-first-walking.gif'),
            name:'wolf-first-evo',
            expProgress: 0
        }, 
        {   id: 984115, 
            type: 'pet',
            pet: 'dragon',
            evolution: 1,
            image: require('../assets/dragon/firstEvo/dragon-first-idle.gif'), 
            walking_image: require('../assets/dragon/firstEvo/dragon-first-walking.gif'),
            name:'dragon-first-evo',
            expProgress: 0
        
        },
        {   
            id: 982932, 
            type: 'pet',
            evolution: 1,
            pet: 'bird',
            image: require('../assets/bird/firstEvo/bird-first-idle.gif'), 
            walking_image: require('../assets/bird/firstEvo/bird-first-walking.gif'),
            name:'bird-first-evo',
            expProgress: 0
        }, { id: 4 },
        { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, // Empty slots
        { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 },
        { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 },
        { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 },

    ],
    selected_pet:[ 
        {
            id: 2930912,
            type: 'egg',
            pet: 'wolf',
            evolution: 0,
            image: require('../assets/wolf/egg/egg-idle.gif'),
            walking_image: require('../assets/wolf/egg/egg-idle.gif'),
            name: 'wolf-egg',
            expProgress: 0
        }
    ]
};

// A reducer function to update our state based on actions.
const reducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT_EXP' :
            // Extract the selected_pet from state
            const selectedPet = state.selected_pet[0]; // Assuming there's only one selected pet
            if (selectedPet) {
                // Update the expProgress of the selected pet
                selectedPet.expProgress = Math.min(selectedPet.expProgress + action.payload, 1);
            }
            // Return the updated state
            return { ...state };

        case 'SET_INVENTORY':
            // Return a new state with updated inventory
            return {...state, inventory: action.payload};

        case 'SELECT_PET':
            return{...state, selected_pet: [action.payload]};

        case 'SET_PET_INVENTORY':
            return {...state, pet_inventory: action.payload};

        case 'SET_EGG_INVENTORY':
            return {...state, egg_inventory: action.payload};

        case 'SET_INITIAL_STATE':
            return {...state, ...action.payload};

        case 'SET_TOTAL_TIME':
            return {...state, totalTime: action.payload}
        default: 
            return state;
    }
};

// Help function to load state from AsyncStorage
const loadState = async () => {
    try {
        //const serializedState = await AsyncStorage.getItem('appState');
        // Reset State 
    const serializedState = await AsyncStorage.setItem('appState', JSON.stringify(initialState));

        if (serializedState === null) {
            return undefined;
        }
        console.log(JSON.parse(serializedState))
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn(" Failed to retrieve state from AsyncStorage.", e);
        return undefined;
    }

}

const saveState = async (state) => {
    try {
        const serializedState = JSON.stringify(state);
        await AsyncStorage.setItem('appState', serializedState);

    } catch (e) {
        console.warm("Failed to save the state to AsyncStorage");
    }
};

// context provider component to wrap around parts of our app
export const AppProvider = ({ children }) => {
    const [hasLoaded, setHasLoaded] = useState(false);  // New piece of local state to track loading
    const [state, dispatch] = useReducer(reducer, initialState); 

    useEffect(() => {
        // New effect to asynchronously load the state from AsyncStorage
        const fetchState = async () => {
            const storedState = await loadState();
            if (storedState) {
                dispatch({ type: 'SET_INITIAL_STATE', payload: storedState });
            }
            setHasLoaded(true);  // Set the loading state to true after loading
        };

        fetchState();
    }, []);

    // Use useEffect hook to watch for state changes and save to AsyncStorage
    useEffect(() => {
        if (hasLoaded) {  // Only save state to AsyncStorage if it has been loaded before
            saveState(state);
        }
    }, [state]);

    if (!hasLoaded) {  // Don't render children until the state has been loaded from AsyncStorage
        return null;  // Or return a loading component
    }

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
};