import { View } from 'react-native';
import Constants from 'expo-constants'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/components/Login';
import Signup from './src/components/Signup';
import Tabs from './src/components/Tab';
import { AuthProvider } from './src/context/authContext';
import { TaskProvider } from './src/context/tasksContext';
import { CategoryProvider } from './src/context/categoriesContext';

const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <AuthProvider>
      <TaskProvider>
        <CategoryProvider>
          <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerTransparent: true,
                  headerTitle: '',
                  headerStyle: { backgroundColor: "transparent", opacity: 0 },
                  headerTitleStyle: { color: "red" },
                }}
              >

                <Stack.Screen name="Login" component={Login}
                  options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerStyle: { backgroundColor: "transparent", opacity: 0 },
                    headerTitleStyle: { color: "#ffffff" },
                  }}
                />

                <Stack.Screen name="Tabs" component={Tabs}
                  options={{
                    headerBackVisible: false,
                  }}
                />
                <Stack.Screen name="Signup" component={Signup}
                  options={{
                    headerTransparent: true,
                    headerTitle: '',
                    headerStyle: { backgroundColor: "transparent", opacity: 0 },
                    headerTitleStyle: { color: "#ffffff", },
                  }}
                />

              </Stack.Navigator>
            </NavigationContainer>

          </View>

        </CategoryProvider>
      </TaskProvider>
    </AuthProvider>

  );
}



