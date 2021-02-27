import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/AntDesign';
import CheckIcon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [text, setText] = useState('');

  const [dummyData, setData] = useState([
    {
      id: '1',
      title: 'First Item',
      check: false,
    },
    {
      id: '2',
      title: 'Second Item',
      check: false,
    },
    {
      id: '3',
      title: 'Third Item',
      check: false,
    },
  ]);

  function AllScreen() {
  return (
    <>
    <View>
        <FlatList
          data={dummyData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
    </View>
    </>
  );
}

function CompletedScreen() {
  return (
    <View>
        <FlatList
          data={dummyData.filter(e => e.check!==false)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
    </View>
  );
}

function RemainingScreen() {
  return (
    <View>
        <FlatList
          data={dummyData.filter(e => e.check===false)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
    </View>
  );
}

const Tab = createBottomTabNavigator();

  const toggleFunction = (id) => {
    const myVar = dummyData.map((e) => {
      if (e.id === id) {
        return { ...e, check: !e.check };
      } else {
        return { ...e };
      }
    });
    setData(myVar);
  };

  const Item = ({ title, check, id }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => toggleFunction(id)}>
        {check ? (
          <Icon size={30} name="checkcircleo" />
        ) : (
          <CheckIcon size={30} color="grey" name="radio-button-unchecked" />
        )}
      </TouchableOpacity>
      <Text style={check ? styles.checkedContent : styles.content}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} check={item.check} id={item.id} />
  );

  const addTodoItem = (text) => {
    if(text.trim().length > 0){
      setData([...dummyData,{ id: Math.random().toString(36).substring(7), title: text.trim(), check: false }])
    } else {
      alert("Empty Todo list not allowed");
    }
  }


  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Today</Text>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Icon size={30} color="blue" name="pluscircleo" />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add Todo</Text>
              <TextInput
                style={styles.inputField}
                
                onChangeText={text => setText(text)}
                value={text}
                placeholder=""
              />
              <View
                style={{
                  width: 225,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {addTodoItem(text)
                   setModalVisible(false)
                   setText('') 
                  }}
                  >
                  <Text style={styles.textStyle}>Add</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        
    <NavigationContainer>
      <Tab.Navigator
      tabBarOptions={{
    labelStyle: { fontSize:16,justifyContent:'center',textAlign:'center' },}}>
        <Tab.Screen name="All" component={AllScreen} />
        <Tab.Screen name="Completed" component={CompletedScreen} />
        <Tab.Screen name="Remaining" component={RemainingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  header: {
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  content: {
    padding: 10,
  },
  checkedContent: {
    padding: 10,
    textDecorationLine: "line-through",
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    width:275,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputField: {
    height: 150,
    width: 225,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
});

export default App;
