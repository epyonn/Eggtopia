import React, { useContext } from 'react';
import { AppContext} from '../../context/AppContext';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, ScrollView, View, Text } from 'react-native';
import { styles } from '../../styles/styles';

const screenWidth = Dimensions.get('window').width;

const Chart = () => {
  const { state, dispatch } = useContext(AppContext);
  const metrics = state.metrics;
  console.log('metrics in linechart ', metrics)

  // Transforming data for the chart
  const filteredMetrics = metrics.filter(metric => metric.minutes > 0);

  const chartData = {
    labels: filteredMetrics.map(metric => metric.date),
    datasets: [{
      data: filteredMetrics.map(item => item.minutes),
    }],
  };

  

  /*
  const chartConfig = {
    backgroundColor: '#e26a00',
    // backgroundGradientFrom: '#0081A7',
    backgroundGradientFrom: 'rgb(33, 150, 243)',
    backgroundGradientTo: '#FED9B7',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  const dataPointWidth = 50; // Width per data point
  const totalDataPoints = metrics.length;
  const dynamicChartWidth = totalDataPoints * dataPointWidth;
  const screenWidth = Dimensions.get('window').width;
  
  return (
    <View >


    <ScrollView 
      horizontal={true} 
      showsHorizontalScrollIndicator={true}
      style={styles.chart}
    >

      <LineChart
        data={metrics}
        width={dynamicChartWidth} // Dynamic width
        height={320}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
        fromZero
      />
    </ScrollView>
  </View>
  )*/

  return (
    <View>
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
            backgroundColor: '#e26a00',
            // backgroundGradientFrom: '#0081A7',
            backgroundGradientFrom: 'rgb(33, 150, 243)',
            backgroundGradientTo: '#FED9B7',
          */
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff', 
            backgroundGradientTo: '#ffffff',




         
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(33, 150, 243,1.0)`, // For the line color
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // For the x and y-axis labels

            style: {
              borderRadius: 16,
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