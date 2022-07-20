import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StatusBar,
  Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';



const App = () => {
  const [textInput, setTextInput] = React.useState('');
  const [data,adddata] = React.useState([
    {
      id:Math.random(),
      title: "tast one"
    },
    {
      id:Math.random(),
      title: "tast two"
    },
    {
      id:Math.random(),
      title: "test 3"
    },
    {
      id:Math.random(),
      title: "tast one"
    }


  ]);

  React.useEffect(() => {
    getTodosFromUserDevice();
  }, []);

  React.useEffect(() => {
    saveTodoToUserDevice(data);
  }, [data]);



  const saveTodoToUserDevice = async data => {
    try {
      const stringifyTodos = JSON.stringify(data);
      await AsyncStorage.setItem('todos', stringifyTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodosFromUserDevice = async () => {
    try {
      const data = await AsyncStorage.getItem('todos');
      if (data != null) {
        adddata(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
    }
  };


  const deleteTodo = todoId => {
    const newTodosItem = data.filter(item => item.id != todoId);
    adddata(newTodosItem);
  };

  
  const renderItem = ({ item }) => (

    <View style={[styles.txtseparator,{display:'flex',flexDirection:'row',justifyContent:'space-between'}]}>  
    <Text style={styles.todotxt}>{item.title}</Text>
    <TouchableOpacity>
    <Icon name='delete' size={25} color='red' onPress={() => deleteTodo(item.id)}/>
    </TouchableOpacity>
    </View>
  );

  const addtodo = () => {
    if (textInput == '') {
      Alert.alert('Error', 'Please input todo');
      
    } else if (textInput.length < 3) {
      Alert.alert("Warning","Add more Description");

    } else if (textInput.length  > 10) {
      Alert.alert("Warning","Shorten your Desc");

    } else {
      const newdata = {
        id: Math.random(),
        title: textInput,
        
      };
      adddata([...data, newdata]);
      setTextInput('');
      Keyboard.dismiss();
    }
  };

  const clearAllTodos = () => {
    Alert.alert('Confirm.', 'Clear todos?', [
      {
        text: 'Yes.',
        onPress: () => adddata([]),
      },
      {
        text: 'No',
      },
    ]);
  };


    
  return (
    <SafeAreaView >
      <StatusBar auto='true'/>
      <View style={styles.header}>
        <Text style={styles.headertext}>To Do App</Text>
        <TouchableOpacity>
        <Icon name='delete' size={25} color='red' onPress={clearAllTodos}  />
        </TouchableOpacity>
      </View>

      <View style={styles.textview}>
        <View style={styles.textinput}>
        <TextInput placeholder='Add Todo' 
        value={textInput}
        onChangeText={text => setTextInput(text)}
        />
        </View>
        <TouchableOpacity style={styles.addtodo} onPress={addtodo}>
          <Icon name='add' size={25} color='green'/>
        </TouchableOpacity>

      </View>

      <View style={styles.body}>
        <View style={styles.tododisp}>
        <View >
        
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            
            
            
            />
            
          
          
        </View>
        
        </View>       

      </View>
     
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  txtseparator:{
    marginBottom: 15,
    width:'100%',
    borderBottomWidth: 1,
    borderBottomColor:'pink',
    paddingBottom: 2,
  },
  headertext:{
    fontSize:21,
  },
  header:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:15,
    marginTop:10,
    marginBottom: 20,
  },
 textview:{
  width: '90%',
  flexDirection:'row',
  marginHorizontal: 10,
  marginBottom: 25,
  
 },
 textinput:{
  flex:1,
  borderWidth: 1,
  textAlign:'center',
  alignItems:'center',
  height: 35,
  borderRadius:25,
  marginRight: 10
 },
 addtodo:{
  height: 35,
  backgroundColor: 'brown',
  borderRadius: 35,
  textAlign:'center',
  alignItems:'center',
  alignContent:'center',
  justifyContent:'center',
  width:35,
 },
 body:{
  marginHorizontal: 10,
  
 },
 tododisp:{
  flexDirection: 'row',
  justifyContent:'space-between',
  backgroundColor: 'blue',
  textAlign:'center',
  alignContent:'center',
  padding: 7,
  marginBottom: 3,
  borderRadius: 5,
  


 },
 todotxt:{
  fontSize: 20,
  // marginBottom:10
 }
});

export default App;
