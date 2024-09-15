import { Pressable } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"

const IconButton = ({ onPress, name, color }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => (pressed ? { opacity: 0.5 } : null)}
      android_ripple={{ color: "#ccc" }}
    >
      <Ionicons name={name} size={24} color={color} />
    </Pressable>
  )
}
export default IconButton
