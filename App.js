import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import AllCategoriesScreen from "./screens/AllCategoriesScreen"
import CategoryScreen from "./screens/CategoryScreen"
import MealDetailScreen from "./screens/MealDetailScreen"
import FavoritesScreen from "./screens/FavoritesScreen"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { CATEGORIES } from "./data/data"
import Ionicons from "@expo/vector-icons/Ionicons"
import FavoritesContextProvider from "./store/context/favorites-context"

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#361404", //some dark brown shade same as root screen bg
        },
        headerTintColor: "white", // White color for the back button and title
        sceneContainerStyle: { backgroundColor: "#59321e" }, //some mid brown shade for content
        drawerContentStyle: { backgroundColor: "#361404" }, //some dark brown shade same as root screen bg
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#361404", //some dark brown shade same as root screen bg
        drawerActiveBackgroundColor: "#f7cbb5", //some extremely light brown shade
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={AllCategoriesScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons size={size} color={color} name="list" />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons size={size} color={color} name="star" />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerBackTitle: "Back", // This sets the back button text globally
              headerStyle: {
                backgroundColor: "#361404", //some dark brown shade same as root screen bg
              },
              headerTintColor: "white", // White color for the back button and title
              contentStyle: { backgroundColor: "#59321e" }, //some mid brown shade for content
            }}
          >
            <Stack.Screen
              name="Drawer"
              component={DrawerNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="MealsOverview" component={CategoryScreen} />
            <Stack.Screen
              name="MealDetail"
              component={MealDetailScreen}
              options={{ title: "About the Meal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#361404", //some dark brown shade
  },
})
