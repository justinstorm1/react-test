import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, Pressable, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PanGestureHandler, GestureHandlerRootView, State } from "react-native-gesture-handler";

const DOT_SIZE = 22;

const PRESETS = [
  {
    id: "1",
    name: "Sunset",
    colors: ["#FF5F6D", "#FFC371"],
    start: { x: 0.1, y: 0.2 },
    end: { x: 0.9, y: 0.8 },
  },
  {
    id: "2",
    name: "Ocean",
    colors: ["#2193b0", "#6dd5ed"],
    start: { x: 0.5, y: 0 },
    end: { x: 0.5, y: 1 },
  },
];

export default function GradientEditorScreen() {
  const [colors, setColors] = useState(["#FF5F6D", "#FFC371"]);
  const [start, setStart] = useState({ x: 0.1, y: 0.2 });
  const [end, setEnd] = useState({ x: 0.9, y: 0.8 });
  const [size, setSize] = useState({ width: 0, height: 0 });

  const clamp = (v: number) => Math.max(0, Math.min(1, v));

  // These animate the visual dots
  const startAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const endAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // We need refs to store where the dot was BEFORE we started dragging
  const startOffset = useRef({ x: 0, y: 0 });
  const endOffset = useRef({ x: 0, y: 0 });

  // Sync Animated Values when state changes (e.g. preset clicked)
  useEffect(() => {
    if (size.width && size.height) {
      startAnim.setValue({ x: start.x * size.width, y: start.y * size.height });
      endAnim.setValue({ x: end.x * size.width, y: end.y * size.height });
    }
  }, [start, end, size]);

  const onLayout = (e: any) => {
    const { width, height } = e.nativeEvent.layout;
    setSize({ width, height });
  };

  /**
   * Handles the gesture logic.
   * @param currentPoint The current normalized state {x, y} (e.g., start or end)
   * @param offsetRef The ref to store the starting pixel position
   * @param anim The Animated.ValueXY to update visuals
   * @param setPoint The state setter
   */
  const onGestureEvent = (currentPoint: any, offsetRef: any, anim: Animated.ValueXY, setPoint: any) => 
    ({ nativeEvent }: any) => {
      if (!size.width || !size.height) return;

      // 1. Capture the starting position when the drag BEGINS
      if (nativeEvent.state === State.BEGAN) {
        offsetRef.current = { 
          x: currentPoint.x * size.width, 
          y: currentPoint.y * size.height 
        };
      }

      // 2. While ACTIVE, add translation to the start offset
      if (nativeEvent.state === State.ACTIVE) {
        const rawX = offsetRef.current.x + nativeEvent.translationX;
        const rawY = offsetRef.current.y + nativeEvent.translationY;

        // 3. Normalize (0 to 1) and Clamp
        const x = clamp(rawX / size.width);
        const y = clamp(rawY / size.height);

        // 4. Update State and Animation
        setPoint({ x, y });
        anim.setValue({ x: x * size.width, y: y * size.height });
      }
    };

  const dotStyle = (anim: Animated.ValueXY) => ({
    transform: [
      { translateX: Animated.subtract(anim.x, DOT_SIZE / 2) },
      { translateY: Animated.subtract(anim.y, DOT_SIZE / 2) },
    ],
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Gradient Preview */}
        <View style={styles.previewContainer} onLayout={onLayout}>
          <LinearGradient colors={colors as any} start={start} end={end} style={StyleSheet.absoluteFill} />

          {size.width > 0 && (
            <>
              <PanGestureHandler
                onHandlerStateChange={onGestureEvent(start, startOffset, startAnim, setStart)}
                onGestureEvent={onGestureEvent(start, startOffset, startAnim, setStart)}
              >
                <Animated.View style={[styles.dot, dotStyle(startAnim)]} />
              </PanGestureHandler>

              <PanGestureHandler
                onHandlerStateChange={onGestureEvent(end, endOffset, endAnim, setEnd)}
                onGestureEvent={onGestureEvent(end, endOffset, endAnim, setEnd)}
              >
                <Animated.View style={[styles.dot, dotStyle(endAnim)]} />
              </PanGestureHandler>
            </>
          )}
        </View>

        {/* Color Inputs */}
        <View style={styles.controls}>
          <Text style={styles.label}>Color 1</Text>
          <TextInput
            value={colors[0]}
            onChangeText={(t) => setColors([t, colors[1]])}
            style={styles.input}
          />
          <Text style={styles.label}>Color 2</Text>
          <TextInput
            value={colors[1]}
            onChangeText={(t) => setColors([colors[0], t])}
            style={styles.input}
          />
        </View>

        {/* Presets */}
        <FlatList
          data={PRESETS}
          horizontal
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={styles.presetCard}
              onPress={() => {
                setColors(item.colors);
                setStart(item.start);
                setEnd(item.end);
                // Note: The useEffect above will handle snapping the dots
              }}
            >
              <LinearGradient colors={item.colors as any} start={item.start} end={item.end} style={styles.presetGradient} />
              <Text style={styles.presetText}>{item.name}</Text>
            </Pressable>
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111" },
  previewContainer: { height: 300, position: "relative" },
  dot: { 
    width: DOT_SIZE, 
    height: DOT_SIZE, 
    borderRadius: DOT_SIZE / 2, 
    backgroundColor: "#fff", 
    position: "absolute", 
    borderWidth: 2, 
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5
  },
  controls: { padding: 16 },
  label: { color: "#fff", marginBottom: 4 },
  input: { backgroundColor: "#222", color: "#fff", padding: 10, borderRadius: 8, marginBottom: 12 },
  list: { paddingHorizontal: 16, gap: 12 },
  presetCard: { width: 120, height: 80, borderRadius: 12, overflow: "hidden" },
  presetGradient: { flex: 1 },
  presetText: { position: "absolute", bottom: 6, left: 6, color: "#fff", fontSize: 12, fontWeight: "bold", textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10 },
});