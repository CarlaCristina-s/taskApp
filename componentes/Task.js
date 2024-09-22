import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TextInput,
  FlatList,
  Alert,
  Modal,
  Button,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import DateTimePicker from "react-native-ui-datepicker";

export default function Task() {
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  // const [date, setDate] = useState();
  const [date, setDate] = useState([]);
  const [newDate, setNewDate] = useState("");

  const handleSubmit = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate)) {
      setFormattedDate(parsedDate.toLocaleDateString("pt-BR", options));
    } else {
      setFormattedDate("Data inválida");
    }
  };

  async function addTask() {
    const search = task.filter((task) => task === newTask);
    if (newTask === "") {
      return;
    }

    if (search.length !== 0) {
      Alert.alert("Atenção", "O nome da tarefa está repetido.");
      return;
    }

    setTask([...task, newTask]);
    setNewTask("");
    setModalVisible(false);

    Keyboard.dismiss();
  }

  async function removeTask(item) {
    Alert.alert(
      "Deletar Tarefa",
      "Tem certeza que deseja remover esta tarefa?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            return;
          },
          style: "cancelar",
        },
        {
          text: "OK",
          onPress: () => setTask(task.filter((tasks) => tasks !== item)),
        },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    async function carregarDados() {
      const task = await AsyncStorage.getItem("task");

      if (task) {
        setTask(JSON.parse(task));
      }
    }
    carregarDados();
  }, []);

  useEffect(() => {
    async function salvarDados() {
      AsyncStorage.setItem("task", JSON.stringify(task));
    }
    salvarDados();
  }, [task]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6ab09b" />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Minhas Tarefas</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonNewTask}
          title="Nova Tarefa"
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonTextTask} placeholder="Nova tarefa">
            <Ionicons name="add-circle-sharp" size={26} color="#fff" />
          </Text>
        </TouchableOpacity>

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.containerModal}>
              <Text style={styles.modalText}>Nova Tarefa</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite a tarefa"
                value={task}
                placeholderTextColor="#ccc"
                maxLength={25}
                autoCorrect={true}
                onChangeText={(text) => setNewTask(text)}
              />

              <TextInput
                style={styles.input}
                placeholder="Digite uma data (YYYY-MM-DD)"
                value={date}
                onChangeText={setDate}
              />

              <TouchableOpacity
                style={styles.buttonAdd}
                title="Adicionar"
                onPress={addTask}
              >
                <Text style={styles.buttonTextAdd}>Adicionar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonDel}
                title="Cancelar"
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonTextDel}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        <View style={styles.bodyFlatlist}>
          <FlatList
            style={styles.flatlisForm}
            data={task}
            keyExtractor={(item) => item.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.containerFlatlisForm}>
                <Text style={styles.textItem}>{item}</Text>

                <TouchableOpacity onPress={() => removeTask(item)}>
                  <MaterialIcons
                    name="delete-forever"
                    size={30}
                    color="#6ab09b"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignSelf: "center",
    flex: 1,
    width: "100%",
    height: 60,
    marginBottom: 20,
    backgroundColor: "#6ab09b",
    alignItems: "center",
    justifyContent: "center",
  },
  textHeader: {
    fontSize: 24,
    color: "#fff",
  },
  buttonNewTask: {
    width: 100,
    height: 60,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: "#6ab09b",
    marginHorizontal: 10,
  },
  buttonTextTask: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  containerModal: {
    marginTop: 100,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 50,
    alignItems: "center",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    color: "#808080",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  input: {
    height: 40,
    borderColor: "#808080",
    borderWidth: 1,
    width: "100%",
    marginBottom: 15,
    paddingLeft: 10,
  },
  buttonAdd: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#6ab09b",
    padding: 15,
    marginBottom: 15,
  },
  buttonTextAdd: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  buttonDel: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "blue",
    padding: 15,
    marginBottom: 15,
  },
  buttonTextDel: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  bodyFlatlist: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  flatlisForm: {
    flex: 1,
    marginTop: 5,
  },
  containerFlatlisForm: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "#eee",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    marginHorizontal: 10,
  },
  textItem: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#808080",
    marginTop: 4,
    textAlign: "center",
  },

  // form: {
  //   height: 60,
  //   justifyContent: "center",
  //   alignSelf: "stretch",
  //   flexDirection: "row",
  //   paddingTop: 10,
  //   borderColor: "#eee",
  //   paddingHorizontal: 10,
  // },
  // inputForm: {
  //   flex: 1,
  //   height: 40,
  //   backgroundColor: "#eee",
  //   borderRadius: 4,
  //   paddingVertical: 5,
  //   paddingHorizontal: 10,
  //   borderWidth: 1,
  //   borderColor: "#eee",
  // },
});
