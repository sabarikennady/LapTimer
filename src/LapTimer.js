import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

const LapTimer = () => {
  const [time, setTime] = useState(0); 
  const [laps, setLaps] = useState([]);
  const [running, setRunning] = useState(false);
  const {width} = useWindowDimensions();

  const timerRef = useRef(null);

  const startTimer = () => {
    setRunning(true);
    timerRef.current = setInterval(() => {
      setTime((prev) => prev + 10); 
    }, 10);
  };

  const stopTimer = () => {
    setRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    setTime(0);
    setLaps([]);
    stopTimer();
  };

  const recordLap = () => {
    setLaps((prev) => [time, ...prev]);
  };

  const formatTime = (ms)=> {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes }:${seconds < 10 ? "0" : ""}${seconds}.${
      milliseconds < 10 ? "0" : ""
    }${milliseconds} `;
  };

  
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#f5f5f5",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    timerBackground:{
      borderRadius: width/4,
      borderWidth: 2,
      borderColor: "#424242",
      width: width/2,
      height: width/2,
      justifyContent:"center",
      alignItems:"center",
      marginVertical:20,
    },
    timer: {
      fontSize: 48,
      fontWeight: "bold",
      marginBottom: 20,
    },
    buttonsContainer:{
        width:"100%",
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom: 20,
    },
    button: {
      marginHorizontal: 10,
      padding: 15,
      borderRadius: 5,
      alignItems: "center",
    },
    startButton: {
      backgroundColor: "#4CAF50",
    },
    stopButton: {
      backgroundColor: "#F44336",
    },
    lapButton: {
      backgroundColor: "#2196F3",
    },
    resetButton: {
      backgroundColor: "#9E9E9E",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    lapRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: "#ddd",
      width: "100%",
    },
    lapText: {
      fontSize: 16,
      fontWeight: "bold",
    },
    lapTime: {
      fontSize: 16,
      color: "#555",
    },
    noLaps: {
      marginTop: 20,
      fontSize: 16,
      color: "#999",
    },
  });
  
  return (
    <View style={styles.container}>
        <View style={styles.timerBackground}>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, running ? styles.stopButton : styles.startButton]}
          onPress={running ? stopTimer : startTimer}
        >
          <Text style={styles.buttonText}>{running ? "Stop" : "Start"}</Text>
        </TouchableOpacity>

        {!running ?
            <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={resetTimer}
            disabled={running || time === 0}
            >
            <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
        : 
            <TouchableOpacity
            style={[styles.button, styles.lapButton]}
            onPress={recordLap}
            disabled={!running}
            >
            <Text style={styles.buttonText}>Lap</Text>
            </TouchableOpacity>
        }
      </View>

      <FlatList
        data={laps}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.lapRow}>
            <Text style={styles.lapText}>Lap {laps.length - index}</Text>
            <Text style={styles.lapTime}>{formatTime(item)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noLaps}>No laps recorded</Text>}
      />
    </View>
  );
};

export default LapTimer;
