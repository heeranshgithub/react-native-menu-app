import { useContext } from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Pressable,
} from "react-native"
import { FavoritesContext } from "../store/context/favorites-context"
import { MEALS, CATEGORIES } from "../data/data"
const listContainerHorizontalPadding = 30
const boxSize =
  Dimensions.get("window").width - listContainerHorizontalPadding * 4

const FavoritesScreen = () => {
  const favoriteMealsCtx = useContext(FavoritesContext)
  const favIdsArr = favoriteMealsCtx.ids
  const favMeals = favIdsArr.map((id) => {
    return MEALS.find((meal) => meal.id === id)
  })
  const renderBox = ({ item }) => {
    return (
      <Pressable>
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
  return (
    <View style={styles.container}>
      {favIdsArr.length === 0 ? (
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      ) : (
        <View style={styles.container}>
          <View style={styles.listContainer}>
            <FlatList
              data={favMeals}
              renderItem={renderBox}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      )}
    </View>
  )
}
export default FavoritesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
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
