import { TODO_TYPE } from '@app/types';
import { Dispatch } from 'redux';
import firestore from '@react-native-firebase/firestore';
import { storeToDoListData } from '../slice/todo.slice';
const getTaskList = (payload: any) => {
  return async (dispatch: Dispatch) => {
    let fetchTaskList = firestore()
      .collection('todo')
      .onSnapshot(({ docs }: { docs: any }) => {
        let taskList: TODO_TYPE[] = [];
        docs.forEach((item: any) => {
          taskList.push({ ...item._data, key: item.id });
        });
        dispatch(storeToDoListData(taskList));
      });
    return () => fetchTaskList();
  };
};

const addNewTaskRequest = (payload: any) => {
  return async (dispatch: Dispatch) => {
    firestore()
      .collection('todo')
      .add(payload)
      .then(res => {
        console.log('addNewTaskRequest res>>>>>>>>>>', res);
      })
      .catch(err => {
        console.error('addNewTaskRequest errror>>>>>>>', err);
      });
  };
};
const editTaskRequest = (payload: {
  key: string;
  obj: { task?: string; isCompleted?: boolean };
}) => {
  return async (dispatch: Dispatch) => {
    firestore()
      .collection('todo')
      .doc(payload?.key)
      .update(payload?.obj)
      .then(res => {
        console.log('editTask res>>>>>>>>>>', res);
      })
      .catch(err => {
        console.error('editTask errror>>>>>>>', err);
      });
  };
};
const deleteTaskRequest = (payload: string) => {
  return async (dispatch: Dispatch) => {
    firestore()
      .collection('todo')
      .doc(payload)
      .delete()
      .then(res => {
        console.log('editTask res>>>>>>>>>>', res);
      })
      .catch(err => {
        console.error('editTask errror>>>>>>>', err);
      });
  };
};

export { getTaskList, addNewTaskRequest, editTaskRequest, deleteTaskRequest };
