import { router, Stack } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const backgrounds = [
  {
    id: "1",
    name: "Sunset",
    colors: ["#FF5F6D", "#FFC371"],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  {
    id: "2",
    name: "Ocean",
    colors: ["#2193b0", "#6dd5ed"],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  {
    id: "3",
    name: "Purple Night",
    colors: ["#41295a", "#2F0743"],
    start: { x: 1, y: 0 },
    end: { x: 0, y: 1 },
  },
  {
    id: "4",
    name: "Lime",
    colors: ["#56ab2f", "#a8e063"],
    start: { x: 0, y: 1 },
    end: { x: 1, y: 0 },
  },
  {
    id: "5",
    name: "Mono Dark",
    colors: ["#232526", "#414345"],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
];


export default function Index() {
  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: 'Home',
          headerTransparent: true,
          headerSearchBarOptions: {
            hideNavigationBar: true,
            shouldShowHintSearchIcon: false,
            placeholder: 'Search',
            placement: 'integratedButton'
          },
          headerLeft: () => (
            <Pressable className="w-[35] aspect-[1] justify-center items-center" onPress={() => router.push('/editor')}>

            </Pressable>
          )
        }}
      />
      <FlatList 
        data={backgrounds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable className="flex-1 aspect-[9/16] rounded-2xl overflow-hidden">
            <LinearGradient
              style={{ flex: 1 }}
              colors={item.colors as any}
              start={item.start}
              end={item.end}
              
            ></LinearGradient>
          </Pressable>
        )}
        numColumns={2}
        contentContainerClassName="px-5 gap-4"
        columnWrapperClassName="gap-4"
      />
    </>
  );
}
