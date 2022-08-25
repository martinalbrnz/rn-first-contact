import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";

type Task = {
  id: number;
  taskName: string;
};
export default function App() {
  const [taskName, setTaskName] = React.useState<string>("");
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const addTask = (): void => {
    if (taskName !== "") {
      const id: number = tasks.reduce(
        (prev, curr) => (curr.id >= prev ? curr.id + 1 : prev),
        0
      );
      const newTask: Task = { id, taskName };
      setTasks([...tasks, newTask]);
    }
    setTaskName("");
  };
  const deleteTask = (id: number): void => {
    setTasks([...tasks.filter((task) => task.id !== id)]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello!</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTaskName}
        placeholder="Insert your name"
        value={taskName}
      ></TextInput>
      <Button onPress={() => addTask()} title="Add task" />
      <FlatList
      style={{marginTop: 12}}
        data={tasks}
        renderItem={({ item, index, separators }) => (
          <TouchableHighlight key={item.id} onPress={() => deleteTask(item.id)}>
            <View style={styles.listItem}>
              <Text style={styles.listText}>{item.taskName}</Text>
            </View>
          </TouchableHighlight>
        )}
      ></FlatList>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 40,
    marginBottom: 24,
    color: "#000",
  },
  input: {
    fontSize: 24,
    width: 300,
    color: "#000",
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#eee",
  },
  listItem: {
    backgroundColor: "#fff",
    padding: 8,
    margin: 4,
    width: 300,
    borderRadius: 4,
  },
  listText: {
    fontSize: 20,
  },
});
