import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Text,FlatList,TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/AntDesign';
import CheckIcon from 'react-native-vector-icons/MaterialIcons';

const App = () => {

  const [dummyData,setData] = useState([{
    id: "1",
    title: 'First Item',
    check: false,
  },
  {
    id: "2",
    title: 'Second Item',
    check: false,
  },
  {
    id: "3",
    title: 'Third Item',
    check: false,
  },]);
  
  const toggleFunction= (id) => {
    const myVar = dummyData.map((e)=>{
      if(e.id===id){
        return {...e, check: !e.check}
      } else {
        return {...e}
      }
    })
    setData(myVar);
  }

  const Item = ({ title,check,id }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleFunction(id)}>
        {check ? <Icon size={30} name="checkcircleo" /> : <CheckIcon size={35} color="grey" name="radio-button-unchecked" />}
      </TouchableOpacity>
      <Text style={styles.content}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} 
          check={item.check}
          id={item.id}
     />
  );

  return (  
  <>
    <StatusBar />
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Today</Text>
         <Icon size={30} color="blue" name="pluscircleo" />
      </View>
      <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  header: {
    padding: 15,
    alignItems:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: 'center',
    borderBottomWidth:1,
  },
  content: {
    padding: 10,
    fontSize:16,
  },
  text: {
    fontSize: 30,
    fontWeight:"bold",
  },
});

export default App;