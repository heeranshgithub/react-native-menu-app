import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native"
import { CATEGORIES } from "../data/data"

const listContainerHorizontalPadding = 12
const numOfColumns = 2 //num of boxes in each row
const boxSize =
  (Dimensions.get("window").width - listContainerHorizontalPadding * 4) /
  numOfColumns

const AllCategoriesScreen = ({ navigation }) => {
  const handleSelectedCategory = (categoryId) => {
    navigation.navigate("MealsOverview", {
      categoryId: categoryId,
    })
  }
  const renderBox = ({ item }) => {
    return (
      <Pressable
        onPress={() => handleSelectedCategory(item.id)}
        style={({ pressed }) => (pressed ? { opacity: 0.5 } : null)}
        android_ripple={{ color: "#ccc" }}
      >
        <View style={[styles.box, { backgroundColor: item.color }]}>
          <Text style={styles.boxText}>{item.title}</Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={CATEGORIES}
          renderItem={renderBox}
          keyExtractor={(item) => item.id}
          numColumns={numOfColumns}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  )
}
export default AllCategoriesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: listContainerHorizontalPadding,
  },
  box: {
    height: boxSize,
    width: boxSize,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    borderRadius: 10,
  },
  boxText: {
    fontWeight: "bold",
    fontSize: 18,
  },
})
