import React, {useState} from 'react';
import { Modal } from 'react-native';
import { AppContext } from '../context/AppContext';


const Analytics = () => {
    const {state, dispatch} = useContext(AppContext);
    const totalTime = state.totalTime;    
    const [displayModal, setModal] = useState(false);

    return (   
    

    )
}

export default Analytics;