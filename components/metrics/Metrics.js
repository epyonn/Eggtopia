import React, { useContext } from 'react';
import { AppContext} from '../../context/AppContext';
import { Image, Modal, TouchableOpacity, View, Text , ScrollView} from 'react-native';

import Chart from './LineChart';
import { styles } from '../../styles/styles';



const Metrics = () => {
    const { state, dispatch } = useContext(AppContext);
    const isMetricsOpen = state.isMetricsOpen;
    const metrics = state.metrics;
    const totalTime = state.totalTime;
    const uniqueDates = [...new Set(metrics.map(metric => metric.date))];

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
    
    const filteredMetrics = metrics.reduce((result, metric) => {
        const parts = metric.date.split("-");
        const formattedDate = new Date(parts[2], parts[0] - 1, parts[1]);
        const date = formattedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        const existingMetric = result.find(item => item.date === date);

        if (existingMetric) {
            existingMetric.minutes += metric.minutes;
        } else {
            result.push({ date: date, minutes: metric.minutes });
        }

        return result;
    }, []);

    return (
        <Modal
        animationType='slide'
        transparent={true}
        visible={isMetricsOpen}
        >

        <View style={styles.centeredView}>
            <View style={styles.metricsView}>
            <View>
                <Image source={require('../../assets/metrics/sun.png')} style={{ width: 50, height: 100, margin: 0, position: 'absolute', top: -23, left: 30 }} />
                <Text style={{ fontSize: 18, textAlign: 'center', margin: 10, padding: 5, }}>
                    Daily Focus Time
                </Text>
                <Image source={require('../../assets/metrics/moon.png')} style={{ width: 50, height: 100, margin: 0, position: 'absolute', top: -30, right: 30 }} /> 
            </View>


            <View style={styles.chart}>
                <Chart />
            </View>


                <View style={styles.tableContainer}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Date</Text>
                        <Text style={styles.tableCell}>Minutes</Text>
                    </View>

                    <View style={styles.table}>
                        <ScrollView>
                            {filteredMetrics.map((item, index) => (
                                <TableRow key={index} date={item.date} minutes={item.minutes} />
                            ))}
                        </ScrollView>
                    </View>
                </View>


            <View style={styles.metricButtonContainer}>
                
                <View style={styles.averageContainer}>
                    
                    <Text> Minutes Per Day : {(totalTime/uniqueDates.length).toFixed(0)} </Text>
                </View>
               
                <TouchableOpacity
                    style={styles.metricButton}
                    onPress={() => dispatch({ type: 'SET_METRICS_OPEN', payload: false})}
                >
                    <Text style={styles.inventoryButtonText}>Close</Text>
                </TouchableOpacity>
            </View>          
            


            </View>
        </View>
        </Modal>
        
    )
}

export default Metrics;