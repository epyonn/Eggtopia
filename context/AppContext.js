import React, { createContext, useReducer, useEffect , useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen'; 

// Creating a new context for our app.
export const AppContext = createContext();

const initialState = {
    isInventoryOpen: false,
    isMetricsOpen: false,
    metrics: [],
    // Need to add dates to track total time and date.
    totalTime: 0,
    expProgress: 0,
    selectedFruitId: null,
    selectedPetId: null,
    activeTab:'Fruits',
    inventory: [
        // Extra fruits only for debugging.
        { id: 1, name: 'blue_pineapple', image: require('../assets/fruits/blue_pineapple.png') }, //works 
        { id: 2, name: 'fire_peach', image: require('../assets/fruits/fire_peach.png') },
        { id: 3, name: 'fruit_group', image: require('../assets/fruits/fruit_group.png') },
        { id: 4, name: 'ice_pineapple', image: require('../assets/fruits/ice_pineapple.png') },
        { id: 5, name: 'green_mango', image: require('../assets/fruits/green_mango.png') },

        { id: 6, name: 'mangosteen', image: require('../assets/fruits/mangosteen.png') },
        { id: 7, name: 'pear', image: require('../assets/fruits/pear.png') },
        { id: 8, name: 'rainbow_pineapple', image: require('../assets/fruits/rainbow_pineapple.png')},
        
        { id: 9, name: 'pineapple', image: require('../assets/fruits/pineapple.png')},
        { id: 10, name: 'artichoke', image: require('../assets/fruits/artichoke.png')},
        { id: 11, name: 'strawberry', image: require('../assets/fruits/water_strawberry.png')},
        { id: 12, name: 'earth_apple', image: require('../assets/fruits/earth_apple.png')},
        
        /*
        { id: 1, name: 'blue_pineapple', image: require('../assets/fruits/blue_pineapple.png') }, 
        { id: 2, name: 'fire_peach', image: require('../assets/fruits/fire_peach.png') },
        { id: 3, name: 'fruit_group', image: require('../assets/fruits/fruit_group.png') },
        { id: 4, name: 'ice_pineapple', image: require('../assets/fruits/ice_pineapple.png') },
        { id: 5 }, { id: 6}, {id: 7},{ id: 8 }, 
        { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 },
        */

        { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 },
        { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 },
        { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 },
        { id: 25 }, { id: 26 }, { id: 27 }, { id: 28 },
        { id: 29 }, { id: 30 }, { id: 31 }, { id: 32 },
    ],

    egg_inventory: [
        //Debugging purposes.
        /*
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
        */
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
            id: 158323, 
            type: 'egg',
            pet: 'bird',
            evolution: 0,
            image: require('../assets/bird/egg/egg-idle.gif'), 
            walking_image: require('../assets/bird/egg/egg-idle.gif'),
            name: "bird_egg",
            expProgress: 0,
        }, 
        { 
            id: 158943, 
            type: 'egg',
            pet: 'wolf',
            evolution: 0,
            image: require('../assets/wolf/egg/egg-idle.gif'), 
            walking_image: require('../assets/wolf/egg/egg-idle.gif'),
            name: "wolf_egg",
            expProgress: 0,
        },         
        //{id: 1}, {id: 2},{ id: 3 }, 
        { id: 4 },
        { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 },
        { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 },
        { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 },
        { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 },
        { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 },
        { id: 25 }, { id: 26 }, { id: 27 }, { id: 28 },
        { id: 29 }, { id: 30 }, { id: 31 }, { id: 32 },
    ],
    pet_inventory: [
        /* 
        Extra pets for debugging.
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
        },
        */

        { id: 1}, {id: 2}, {id: 3}, { id: 4 },
        { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, 
        { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 },
        { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 },
        { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 },
        { id: 21 }, { id: 22 }, { id: 23 }, { id: 24 },
        { id: 25 }, { id: 26 }, { id: 27 }, { id: 28 },
        { id: 29 }, { id: 30 }, { id: 31 }, { id: 32 },

    ],
    selected_pet:[ 
        {
            /*
            Debugging purposes

            id: 2930912,
            type: 'egg',
            pet: 'wolf',
            evolution: 0,
            image: require('../assets/wolf/egg/egg-idle.gif'),
            walking_image: require('../assets/wolf/egg/egg-idle.gif'),
            name: 'wolf-egg',
            expProgress: 0
            */

            id: 2930912,
            type: 'pet',
            pet: 'wolf',
            evolution: 1,
            image: require('../assets/wolf/firstEvo/wolf-first-idle.gif'),
            walking_image: require('../assets/wolf/firstEvo/wolf-first-walking.gif'),
            name: 'wolf',
            expProgress: 0
        }
    ],
};

// A reducer function to update our state based on actions.
const reducer = (state, action) => {
    switch (action.type) {

        case 'INCREMENT_EXP': 
        // Check if there is a selected pet in the state.
        if (state.selected_pet[0]) { 
            // Clone the selected pet object to avoid directly mutating the state.
            const newSelectedPet = { ...state.selected_pet[0] };
    
            // Increment the experience progress of the cloned pet, ensuring it doesn't exceed 1.
            newSelectedPet.expProgress = Math.min(newSelectedPet.expProgress + action.payload, 1);
    
            // Return the updated state with the modified selected pet.
            return { ...state, selected_pet: [newSelectedPet] };
        }
        // If there is no selected pet, return the unchanged state.
        return state;

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
            return {...state, totalTime: state.totalTime + action.payload};

        case 'SET_INVENTORY_OPEN':
            return {...state, isInventoryOpen: action.payload};

        case 'SET_METRICS_OPEN':
            return {...state, isMetricsOpen: action.payload};

        case 'SET_FRUIT_ID':
            return {...state, selectedFruitId: action.payload};
        
        case 'SET_PET_ID':
            return {...state, selectedPetId: action.payload};

        case 'SET_INVENTORY_TAB':
            return {...state, activeTab: action.payload};
        case 'ADD_METRIC':
                return {
                    ...state,
                    metrics: [...state.metrics, action.payload],
                }
            
        
        default: 
            return state;
    }
};

// Help function to load state from AsyncStorage
const loadState = async () => {
    try {
        const serializedState = await AsyncStorage.getItem('appState');

        // Reset State 
        // const serializedState = await AsyncStorage.setItem('appState', JSON.stringify(initialState));

        if (serializedState === null) {
            return undefined;
        }

        // console.log(JSON.parse(serializedState))
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

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
};