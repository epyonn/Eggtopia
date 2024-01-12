import React, { useContext , useEffect} from 'react';
import { AppContext} from '../../context/AppContext';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, ScrollView, View, Text } from 'react-native';
import { styles } from '../../styles/styles';

const screenWidth = Dimensions.get('window').width;

const Chart = () => {
  const { state, dispatch } = useContext(AppContext);
  const metrics = state.metrics;
  const filteredMetrics = metrics.reduce((result, metric) => {
    const existingMetric = result.find(item => item.date === metric.date);

    if (existingMetric) {
      existingMetric.minutes += metric.minutes;
    } else {
      result.push({ ...metric });
    }
  
    return result;
  }, []);

  const chartData = {
    labels: filteredMetrics.map(metric => {
      const parts = metric.date.split("-");
      const date = new Date(parts[2], parts[0] - 1, parts[1]);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }),
    datasets: [{
      data: filteredMetrics.map(item => item.minutes),
    }],
  };

  return (
    <View 
      
    >
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={true}
        style={styles.chart}

      >
        <LineChart
          data={chartData}
          width={screenWidth}
          height={320}
          verticalLabelRotation={30}
          chartConfig={{

          
            /*
            // original values blue to orange 
            backgroundColor: '#e26a00',
            // backgroundGradientFrom: '#0081A7',
            backgroundGradientFrom: 'rgb(33, 150, 243)',
            backgroundGradientTo: '#FED9B7',
            */

            // new values to white 
            // change background to white
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff', 
            backgroundGradientTo: '#ffffff',
          
            decimalPlaces: 1,

            color: (opacity = 1) => `rgba(98, 0, 234, ${opacity})`, // darker purple

            style: {
              paddingBottom: 20,
            },
          }}
          bezier
          fromZero
        />
      </ScrollView>
    </View>
  )
}



export default Chart;

// Fix storing data as an objet in state
