import { StyleSheet, Text, View } from "react-native";

export default function Messages() {
  return (
    <View style={styles.container}>
      <View style={styles.msg}>
        <Text style={styles.msgText}>Não há mensagens para serem lidas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  msgText: {
    color: "#808080",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
