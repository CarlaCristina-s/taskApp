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
import uuid from "react-native-uuid";

export default function Task() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskFilter, setTaskFilter] = useState("");
  const [nonFilteredTasks, setNonFilteredTasks] = useState([]);

  async function addTask() {
    const filteredTasks = nonFilteredTasks.filter(
      (task) => task.name === taskName
    );
    if (filteredTasks.length !== 0) {
      Alert.alert("Atenção", "O nome da tarefa está repetido.");
      setTaskName("");
      setTaskDate("");
      return;
    }

    if (taskName === "") {
      Alert.alert("Atenção", "O nome da tarefa está vazio.");
      setTaskName("");
      setTaskDate("");
      return;
    }

    const newTask = {
      id: uuid.v4(),
      name: taskName,
      date: taskDate,
    };

    const tasksUpdated = [...nonFilteredTasks, newTask];
    setNonFilteredTasks(tasksUpdated);
    setTaskFilter("");
    setTasks(tasksUpdated);

    setModalVisible(false);
    Keyboard.dismiss();
  }

  useEffect(() => {
    if (taskFilter === null || taskFilter === "") {
      setTasks(nonFilteredTasks);
      return;
    }

    const filteredTasks = nonFilteredTasks.filter(({ name }) =>
      name.toLowerCase().startsWith(taskFilter.toLowerCase())
    );

    setTasks(filteredTasks);
  }, [taskFilter]);

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
          onPress: () => setTasks(tasks.filter((tasks) => tasks !== item)),
        },
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    async function carregarDados() {
      const tasks = await AsyncStorage.getItem("tasks");

      if (tasks) {
        setTasks(JSON.parse(tasks));
      }
    }
    carregarDados();
  }, []);

  useEffect(() => {
    async function salvarDados() {
      AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    }
    salvarDados();
  }, [tasks]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6ab09b" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Minhas Tarefas</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonNewTask}
          title="Nova Tarefa"
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonTextTask} placeholder="Nova tarefa">
            <MaterialIcons name="add-task" size={24} color="#6ab09b" />
            Adicionar Tarefa
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.inputFilter}
          placeholder="Buscar Tarefa"
          value={taskFilter}
          placeholderTextColor="#ccc"
          maxLength={25}
          autoCorrect={true}
          onChangeText={setTaskFilter}
        />

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
                value={taskName}
                placeholderTextColor="#ccc"
                maxLength={25}
                autoCorrect={true}
                onChangeText={setTaskName}
              />

              <TextInput
                style={styles.input}
                placeholder="Digite uma data (DD-MM-YYYY)"
                placeholderTextColor="#ccc"
                value={taskDate}
                onChangeText={setTaskDate}
                keyboardType="number-pad"
              />

              <View style={styles.buttonsModal}>
                <TouchableOpacity
                  style={styles.buttonAdd}
                  title="Adicionar"
                  onPress={() => {
                    addTask();
                    setTaskName("");
                    setTaskDate("");
                  }}
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
            </View>
          </Modal>
        </View>

        <View style={styles.bodyFlatlist}>
          <FlatList
            horizontal="true"
            style={styles.flatlisForm}
            data={tasks}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.containerFlatlisForm}>
                <Text style={styles.textItem}>{item.name}</Text>
                <Text style={styles.textItem}>{item.date}</Text>
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
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#6ab09b",
    backgroundColor: "#eee",
    // width: '60%',
    // alignSelf: 'center',
  },
  buttonTextTask: {
    textAlign: "center",
    fontSize: 18,
    color: "#6ab09b",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  containerModal: {
    marginTop: 80,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 50,
    height: 350,
    borderWidth: 1,
    borderColor: "#6ab09b",
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
    fontSize: 22,
    color: "#6ab09b",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  input: {
    height: 45,
    borderColor: "#6ab09b",
    borderWidth: 1,
    width: "100%",
    marginBottom: 15,
    paddingLeft: 10,
  },
  buttonsModal: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
    gap: 10,
    marginTop: 15,
  },
  buttonAdd: {
    borderRadius: 4,
    backgroundColor: "#6ab09b",
    padding: 10,
    width: 130,
    height: 50,
  },
  buttonTextAdd: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  buttonDel: {
    borderRadius: 4,
    backgroundColor: "red",
    padding: 10,
    width: 130,
    height: 50,
  },
  buttonTextDel: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputFilter: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#6ab09b",
    backgroundColor: "#eee",
    flex: 1,
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
});
