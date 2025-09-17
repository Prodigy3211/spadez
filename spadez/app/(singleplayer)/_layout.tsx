import {Tabs} from 'expo-router';


export default function TabLayout() {
  

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: 'Explore',
        }}
      />
    </Tabs>
  )
}