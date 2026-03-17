import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScr from "../screens/HomeScr";
import MovieScr from "../screens/MovieScr";
import PersonScr from "../screens/PersonScr";
import SearchScr from "../screens/SearchScr";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScr} options={{ headerShown: false }} />
                <Stack.Screen name="MovieDetail" component={MovieScr} options={{ headerShown: false }} />
                <Stack.Screen name="PersonScr" component={PersonScr} options={{ headerShown: false }} />
                <Stack.Screen name="SearchScreen" component={SearchScr} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}