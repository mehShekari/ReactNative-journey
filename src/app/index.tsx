import { StyleSheet, Text, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.heading}>This is Fukcing text</Text>
      <Text style={styles.headingWidthFonst}>This is Fukcing Heading with robot sans</Text>
      <ShadowBox />
    </SafeAreaView>
  )
}

function ShadowBox() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>
          <FontAwesomeFreeSolid name="rocket" size={40} color="#64513c" />
        </Text>
      </View>
    </View>
  )
}

const ShadowByPlatform = {
  ...Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    android: {
      elevation: 4
    }
  })
}

const styles = StyleSheet.create({
  heading: {
    flex: 1,
    maxHeight: 50,
    textAlign: 'center',
    backgroundColor: 'rgba(45,456,454, 0.2)',
  },
  headingWidthFonst: {
    fontFamily: "RobotoMono-Regular",
    textAlign: 'center'
  },
  container: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#789654",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    ...ShadowByPlatform
  }
})