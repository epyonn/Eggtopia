import React, { useContext } from 'react';
import { AppContext} from '../../context/AppContext';
import { Image, Modal, TouchableOpacity, View, Text , ScrollView} from 'react-native';

import Chart from './LineChart';
import { styles } from '../../styles/styles';



const Metrics = () => {
    const { state, dispatch } = useContext(AppContext);
    const isMetricsOpen = state.isMetricsOpen;


    const TableRow = ({ date, minutes }) => (
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{date}</Text>
          <Text style={styles.tableCell}>{minutes}</Text>
        </View>
      );

      const focusData = [
        { date: "2023-03-01", minutes: 120 },
        { date: "2023-03-02", minutes: 150 },
        { date: "2023-03-03", minutes: 90 },
        { date: "2023-03-04", minutes: 100 },
        { date: "2023-03-05", minutes: 110 },
        { date: "2023-03-06", minutes: 95 },

      ];
      

    return (
        <Modal
        animationType='slide'
        transparent={true}
        visible={isMetricsOpen}
        >

        <View style={styles.centeredView}>
            <View style={styles.metricsView}>
            <View>
                <Image source={require('../../assets/metrics/sun.png')} style={{ width: 50, height: 100, margin: 0, position: 'absolute', top: -25, left: 30 }} />
                <Text style={{ fontSize: 18, textAlign: 'center', margin: 10, padding: 5, }}>
                    Daily Focus Time
                </Text>
                <Image source={require('../../assets/metrics/moon.png')} style={{ width: 50, height: 100, margin: 0, position: 'absolute', top: -30, right: 30 }} /> 
            </View>


            <View>
                <Chart />
            </View>

            <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Date</Text>
                <Text style={styles.tableCell}>Minutes</Text>
             </View>

            <ScrollView>
            {focusData.map((item, index) => (
                <TableRow key={index} date={item.date} minutes={item.minutes} />
            ))}
            </ScrollView>
            </View>


            <TouchableOpacity
                style={styles.inventoryButton}
                onPress={() => dispatch({ type: 'SET_METRICS_OPEN', payload: false})}
            >
                <Text style={styles.inventoryButtonText}> Close </Text>
            </TouchableOpacity>
            


            </View>
        </View>
        </Modal>
        
    )
}

export default Metrics;