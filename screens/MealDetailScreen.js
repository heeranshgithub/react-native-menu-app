import {
  View,
  StyleSheet,
  Button,
  Image,
  Text,
  Dimensions,
  ScrollView,
} from "react-native"

import { MEALS } from "../data/data"
import { useContext, useEffect } from "react"
import IconButton from "../components/IconButton"
import { FavoritesContext } from "../store/context/favorites-context"

const screenWidth = Dimensions.get("window").width
const MealDetailScreen = ({ navigation, route }) => {
  const mealId = route.params.mealId
  const meal = MEALS.find((meal) => meal.id === mealId)

  const favoriteMealsCtx = useContext(FavoritesContext)
  const isMealFavorite = favoriteMealsCtx.ids.includes(mealId)

  const changeFavoritesHandler = () => {
    if (isMealFavorite) favoriteMealsCtx.removeFavorite(mealId)
    else favoriteMealsCtx.addFavorite(mealId)
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          onPress={changeFavoritesHandler}
          name={isMealFavorite ? "star" : "star-outline"}
          color="white"
        />
      ),
    })
  }, [navigation, changeFavoritesHandler])
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: meal.imageUrl }} style={styles.image} />
        </View>
        <View style={styles.textContentContainer}>
          <Text style={styles.mealHeadingText}>{meal.title}</Text>
          <Text style={styles.threeWordsRow}>
            {meal.duration}m {meal.complexity.toUpperCase()}{" "}
            {meal.affordability.toUpperCase()}
          </Text>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View style={styles.subHeadingContainer}>
              <Text style={styles.subHeading}>Ingredients</Text>
            </View>
            {meal.ingredients.map((item) => {
              return (
                <View style={styles.itemTextOuterContainer} key={item}>
                  <View style={styles.itemTextInnerContainer}>
                    <Text style={styles.itemText}>{item}</Text>
                  </View>
                </View>
              )
            })}
            <View style={styles.subHeadingContainer}>
              <Text style={styles.subHeading}>Steps</Text>
            </View>
            {meal.steps.map((item) => {
              return (
                <View style={styles.itemTextOuterContainer} key={item}>
                  <View style={styles.itemTextInnerContainer}>
                    <Text style={styles.itemText}>{item}</Text>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}
export default MealDetailScreen

const styles = StyleSheet.create({
  container: { flex: 1 },
  favButtonWrapper: {
    position: "absolute",
    right: 10,
  },
  contentContainer: {
    marginTop: 20,
    flex: 1,
  },
  imageContainer: {
    width: screenWidth,
    height: screenWidth,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContentContainer: {
    alignItems: "center",
    backgroundColor: "#59321e", //some mid brown shade
    flex: 1,
    paddingTop: 5,
    paddingBottom: 20,
  },
  mealHeadingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ede5e1", // some not so bright white
  },
  threeWordsRow: {
    color: "white",
    fontSize: 12,
    marginVertical: 10,
  },
  subHeadingContainer: {
    borderBottomColor: "#f7cbb5", //some extremely light brown shade
    borderBottomWidth: 2,
    width: "75%",
    alignItems: "center",
    paddingBottom: 5,
  },
  subHeading: {
    fontSize: 20,
    color: "#f7cbb5", //some extremely light brown shade
  },
  listContainer: {
    marginBottom: 10,
  },
  itemTextOuterContainer: {
    marginVertical: 5,
    // width: "75%", // matching the width of subHeadingContainer
    // alignSelf: "center", // to center it like subHeadingContainer
    width: screenWidth,
    alignItems: "center",
  },
  itemTextInnerContainer: {
    backgroundColor: "#f7cbb5",
    width: "75%",
    borderRadius: 5,
    paddingVertical: 2,
  },
  itemText: {
    color: "black",
    textAlign: "center",
  },
})
