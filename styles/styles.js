import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    text: {
        fontSize: 20,
        color: "blue",
    },
    image: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '100%',
        //height: '100%',
        height: '100%',
    },
    container: {
        width: 100,
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
      metricsView: {
        margin: 20,
        //backgroundColor: '#DBA463',
        backgroundColor: '#F4D29C',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        borderWidth: 3,
        height: '75%',
        width: 375,
        display: 'flex',
        flexDirection: 'column',
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
        justifyContent: 'space-between',
        height: 430,
        
    
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
        elevation: 1,
      },
      selectedItem: {
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: '#B3B9D1',
      },
      inventoryButton: {
        backgroundColor: "#2196F3",
        borderRadius: 15,
        padding: 5,
        elevation: 2,
        marginTop: 15,
        alignSelf: 'center',
        marginRight: 5,
        //borderWidth: 1,
      },

      inventoryButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        
      },
      buttons: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 20,
      },

      buttonRow: {
        dislay: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%',
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
      timerText: {
        fontSize: 20,
        marginVertical: 10,
        borderWidth: 2,
        backgroundColor: "white",
        borderRadius: 5,
        paddingRight: 5,
        paddingLeft: 5,
        overflow: 'hidden',
        marginLeft: 2,
      },
      timeContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        marginLeft: 15,
      },
      timeLabel: {
        fontSize: 20,
        marginVertical: 10,
        borderWidth: 2,
        backgroundColor: "white",
        borderRadius: 5,
        paddingRight: 0,
        paddingLeft: 0,
        overflow: 'hidden',
        marginLeft: 5,
        backgroundColor: '#B0B0B0',
        justifyContent: 'center',
        alignItems: 'center'
      },
      labelText: {
        color: 'yellow',
        fontWeight: 'bold',      
        zIndex: 2,
        borderRadius: 10,
        padding: 3,
      },
      expGif: {
        width: 200,
        height: 200,
        position: "absolute",
        alignSelf: "center", 
        transform: [{ translateY: 140}, {translateX: 150}],
        zIndex: -1 
      },
        centeredViewTreasureChest: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          borderWidth: 3,
      },
      modalViewTreasureChest: {
        margin: 5,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        borderWidth: 3,
      },
      treasureImage: {
        height: 125,
        width: 125,
      },
      closeButtonTreasureChest: {
        marginTop: 10,
        padding: 5,
        backgroundColor: '#2196F3',
        borderRadius: 5,
      },
      closeButtonTextTreasureChest: {
        color: 'white',
        fontWeight: 'bold',
      },
      stopwatch: {
        height: 60,
        width: 60,
      },
      watch: {
        position: 'absolute',
        left: 90,
        paddingTop: 4, 
        zIndex: 1,
        
      },
      chart: {

        
      },
      tableContainer: {
        marginTop: 20,
        overflow: 'hidden',
        height: 150,
        borderRadius: 10,
   
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, // Increase the shadow opacity value
        shadowRadius: 3,
        
      },
      tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      tableCell: {
        flex: 1,
        textAlign: 'center',
      },
      table: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.0, // Increase the shadow opacity value
        shadowRadius: 3,
        
      },
      chart: {
        marginTop: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15, // Increase the shadow opacity value
        shadowRadius: 3,
        paddingBottom: 0,
      }

});

// After lunch plot data from graph. 