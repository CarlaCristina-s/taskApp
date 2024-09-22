import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image } from "react-native";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6ab09b"  />
      <Image
          source={{
            uri: "https://tenor.com/pt-PT/view/todo-lista-todolist-tarefa-tarefas-gif-15158023465715231225",
          }}
          style={styles.myImage}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
 
});
