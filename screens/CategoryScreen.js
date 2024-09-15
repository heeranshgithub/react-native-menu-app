import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Pressable,
} from "react-native"

import { MEALS, CATEGORIES } from "../data/data"
import { useEffect } from "react"
const listContainerHorizontalPadding = 30
const boxSize =
  Dimensions.get("window").width - listContainerHorizontalPadding * 4

const CategoryScreen = ({ navigation, route }) => {
  const categoryId = route.params.categoryId
  const filteredMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(categoryId)
  )

  const handleSelectedMeal = (mealId) => {
    navigation.navigate("MealDetail", { mealId: mealId })
  }

  const renderBox = ({ item }) => {
    return (
      <Pressable
        onPress={() => handleSelectedMeal(item.id)}
        style={({ pressed }) => (pressed ? { opacity: 0.5 } : null)}
        android_ripple={{ color: "#ccc" }}
      >
        <View style={styles.boxContainer}>
          <View style={styles.box}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: item.imageUrl,
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.footerContainer}>
              <Text style={styles.footerHeaderText}>{item.title}</Text>
              <Text style={styles.footerText}>
                {item.duration} {item.complexity.toUpperCase()}{" "}
                {item.affordability.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    )
  }

  useEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === categoryId
    ).title
    navigation.setOptions({
      title: categoryTitle,
    })
  }, [categoryId, navigation])

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={filteredMeals}
          renderItem={renderBox}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  )
}
export default CategoryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  boxContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginVertical: 20,
  },
  box: {
    height: boxSize,
    width: boxSize,
  },
  imageContainer: {
    width: "100%",
    height: "75%",
    overflow: "hidden",

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  footerContainer: {
    backgroundColor: "white",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  footerHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  footerText: {
    color: "black",
    fontSize: 12,
    marginBottom: 10,
  },
})
