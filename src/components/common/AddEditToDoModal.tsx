import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { normalize } from '@app/utils/orientation';
import { Colors, Icons } from '@app/themes';
import TextInput from './TextInput';
import Button from './Button';
import { TODO_TYPE } from '@app/types';
import { useAppDispatch, useAppSelector } from '@app/store';
import firestore from '@react-native-firebase/firestore';
import { showMessage } from '@app/utils/helpers/Toast';
import {
  addNewTaskRequest,
  deleteTaskRequest,
  editTaskRequest,
} from '@app/store/service/ToDoService';
import { handleAlert } from '@app/screens/protected/home/homeAllFunction';
interface AddEditToDoModal_PROPTYPE {
  isVisible: boolean;
  setIsvible: Function;
  taskDetails?: TODO_TYPE;
}
const AddEditToDoModal: FC<AddEditToDoModal_PROPTYPE> = ({
  isVisible,
  setIsvible,
  taskDetails,
}) => {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector(state => state.auth.isDarkTheme);
  const theme = isDarkTheme ? 'dark' : 'light';
  const [todo, setTodo] = useState<string>('');
  const onClose = () => {
    setTodo('');
    setIsvible(false);
  };

  useEffect(() => {
    if (isVisible && taskDetails?.task) {
      setTodo(taskDetails?.task);
    }
  }, [isVisible]);
  const addNewTask = () => {
    if (todo.trim() == '') {
      showMessage('Enter a task first');
      return;
    }
    dispatch(
      addNewTaskRequest({
        id: new Date().getTime(),
        isCompleted: false,
        task: todo.trim(),
      }),
    );
    onClose();
  };

  const handlemarkAsRead = () => {
    handleAlert('Mark As Completed', 'Are you sure?', markAsRead);
  };
  const handleDeleteTask = () => {
    handleAlert('Delete', 'Are you sure?', deleteTask);
  };

  const deleteTask = () => {
    taskDetails && dispatch(deleteTaskRequest(taskDetails?.key));
  };

  const markAsRead = () => {
    taskDetails &&
      dispatch(
        editTaskRequest({
          key: taskDetails?.key,
          obj: {
            isCompleted: true,
          },
        }),
      );
    onClose();
  };
  const editTask = () => {
    if (todo.trim() == '') {
      showMessage('Enter a task first');
      return;
    }

    taskDetails &&
      dispatch(
        editTaskRequest({
          key: taskDetails?.key,
          obj: {
            task: todo.trim(),
          },
        }),
      );
    onClose();
  };

  return (
    <Modal animationType="fade" visible={isVisible} onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: Colors.white[theme] }}>
        {/* header */}
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.headerText,
              {
                color: Colors.black[theme],
              },
            ]}
          >
            {taskDetails ? 'Edit Task' : 'Create Task'}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Image source={Icons.close} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={{ padding: normalize(15) }}>
          <TextInput
            placeholder="Write your task..."
            value={todo}
            onChangeText={setTodo}
          />
          <Button
            disabled={taskDetails?.isCompleted}
            title={
              !taskDetails?.isCompleted
                ? taskDetails
                  ? 'Edit'
                  : 'Create'
                : 'Completed'
            }
            onPress={taskDetails ? editTask : addNewTask}
            style={{ marginTop: normalize(15) }}
          />

          {taskDetails && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {!taskDetails?.isCompleted && (
                <Button
                  title={'Mark As Completed'}
                  onPress={handlemarkAsRead}
                  style={{ width: '48%' }}
                />
              )}
              <Button
                title={'Delete'}
                onPress={handleDeleteTask}
                style={{
                  backgroundColor: 'red',
                  width: taskDetails?.isCompleted ? '100%' : '48%',
                }}
                textStyle={{ color: 'white' }}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AddEditToDoModal;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(15),
    height: normalize(45),
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    height: normalize(18),
    width: normalize(18),
    tintColor: 'red',
  },
});
