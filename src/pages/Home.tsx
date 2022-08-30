import React, { useState } from 'react';
import { StyleSheet, View, Alert, TextInput} from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(tasks.find(({title}) => title === newTaskTitle))
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome",
        [{ text: "OK"}]
      )
    else{
      const newTask: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks([...tasks, newTask])
    }
  }

  function handleEditTask(id: number, taskNewTitle: string){
    setTasks(oldState => oldState.map(task => {
      if(task.id === id){
        task.title = taskNewTitle
        return task
      }
      return task
    }))
  }
  
  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.map(task => {
      if(task.id === id){
        task.done = !task.done
        return task
      }
      return task
    }))
  }
  
  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?", [
        { text: "NÃO"},
        { text: "SIM", onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id )) }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})