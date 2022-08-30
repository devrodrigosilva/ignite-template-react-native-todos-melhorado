import React, {useState, useRef, useEffect} from "react";
import {StyleSheet, View, TouchableOpacity, Text, Image, TextInput} from 'react-native' 
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import cancelIcon from '../assets/icons/trash/cancel.png'
import editIcon from '../assets/icons/trash/edit.png'

import { Task } from './TasksList'

interface TaskItemProps{
  id: number,
  task: Task,
  toggleTaskDone: (id: number) => void,
  removeTask: (id:number) => void,
  editTask: (id: number, taskNewTitle: string) => void
}

export function TaskItem({id, task, toggleTaskDone, removeTask, editTask}: TaskItemProps){
  const [isEditing, setIsEditing] = useState(false)
  const [edited, setEdited] = useState(task.title)

  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing(){
    setIsEditing(true)
  }

  function handleCancelEditing(){
    setEdited(task.title)
    setIsEditing(false)
  }

  function handleSubmitEditing(){
    editTask(task.id, edited)
    setIsEditing(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return(
    <>
      <View>
        <TouchableOpacity
          testID={`button-${id}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${id}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            value={edited}
            onChangeText={setEdited}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        { isEditing ? 
            <TouchableOpacity
              onPress={handleCancelEditing}
            >
              <Icon name="x" size={24} color="#b2b2b2"/>
            </TouchableOpacity>
          :
            <TouchableOpacity
              onPress={() => handleStartEditing()}
            >
                <Image source={editIcon} />
            </TouchableOpacity>
        }

        <View style={{width: 1, height: 24, backgroundColor: 'rgba(196, 196, 196, 1)', marginHorizontal : 18}}/>

        <TouchableOpacity
            disabled={isEditing}
            onPress={() => removeTask(task.id)}
          >
            <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  }
})