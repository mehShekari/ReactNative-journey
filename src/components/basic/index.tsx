import { useState } from "react"
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition
} from "react-native-reanimated";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const Task = ({ task, removeTask }: { task: Task; removeTask: (taskId: number) => void }) => {
  return (
    <Animated.View
      key={task.id}
      style={taskStyles.taskContainer}
      entering={FadeInDown.springify().damping(50)}
      exiting={FadeOutUp}
      layout={LinearTransition}
    >
      <Text style={taskStyles.taskTitle}>{task.title}</Text>
      <Text style={taskStyles.taskDescription}>{task.description}</Text>
      <Pressable
        onPress={() => removeTask(task.id)}
        style={taskStyles.removeButton}
        android_ripple={{
          borderless: false,
          color: "crimson",
          foreground: true,
          alpha: 0.5
        }}
      >
        <Text style={taskStyles.removeButtonText}>Remove</Text>
      </Pressable>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formInput, setFormInput] = useState<{ title: string; description: string }>({ title: '', description: '' });

  const addTask = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: `Task ${formInput.title}`,
      description: `Description for task ${tasks.length + 1}`,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    cleanForm();
  }


  const cleanForm = () => {
    setFormInput({ title: '', description: '' });
  }

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  }

  return (
    <View role='article' style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.entryInput}
          placeholder='enter your fucking goal'
          value={formInput.title}
          onChangeText={(text) => setFormInput({ ...formInput, title: text })}
        />
        <Pressable onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        <Text role='heading'>list of tasks</Text>
        <FlatList
          data={tasks}
          renderItem={({ item }) => <Task removeTask={removeTask} key={item.id} task={item} />}
          keyExtractor={({ id }) => id.toString()}
          alwaysBounceVertical={false}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    width: '100%',
    display: 'flex',
    paddingHorizontal: 16,
    paddingTop: 50,
    flex: 1,
  },

  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },

  entryInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
  },

  listContainer: {
    flex: 1
  },

  addButton: {
    backgroundColor: '#2e5746',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});


const taskStyles = StyleSheet.create({
  taskContainer: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#e4e4e4',
    borderRadius: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    marginTop: 8,
    backgroundColor: '#ff4d4d',
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});