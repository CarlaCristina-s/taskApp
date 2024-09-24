import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Animated,
} from "react-native";
import { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";


export default function Home() {
  const translateX = useRef(new Animated.Value(-200)).current;

  const animateText = () => {
    translateX.setValue(-200); 
    Animated.timing(translateX, {
      toValue: 0, 
      duration: 2000, 
      useNativeDriver: true, 
    }).start();
  };

  useEffect(() => {
    animateText(); 
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6ab09b" />
      <Text
        style={{
          alignSelf: "center",
          fontSize: 22,
          marginVertical: 45,
          fontWeight: "bold",
          textTransform: "uppercase",
          color: "#6ab09b",
        }}
      >
        Bem-vindo ao TaskApp
      </Text>

      <LottieView
        source={require("../assets/Animation - 1727117940117.json")}
        style={{ width: "100%", height: "45%", marginBottom: 20 }}
        autoPlay={true}
      />

      <Animated.View style={{ transform: [{ translateX }] }}>
        <Text style={styles.textAnimationHome}>
          Organize suas tarefas diárias
        </Text>
      </Animated.View>

      <Animated.View style={{ transform: [{ translateX }] }}>
        <Text style={styles.textAnimationHome}>Alcance seus objetivos</Text>
      </Animated.View>

      <Animated.View style={{ transform: [{ translateX }] }}>
        <Text style={styles.textAnimationHome}>Otimize seu tempo</Text>
      </Animated.View>

      <Animated.View style={{ transform: [{ translateX }] }}>
        <Text style={styles.textAnimationHome}>Simplifique sua rotina</Text>
      </Animated.View>

      <Animated.View style={{ transform: [{ translateX }] }}>
        <Text style={styles.textAnimationHome}>
          Melhore sua qualidade de vida!
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textAnimationHome: {
    // alignSelf: "center",
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 30,
    color: "#ccc",
  },
});
