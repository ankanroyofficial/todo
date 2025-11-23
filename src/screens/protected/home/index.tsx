import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Switch,
} from 'react-native';
import { Colors, Icons } from '@app/themes';
import { useIsFocused } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@app/store';
import styles from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { handleAlert } from './homeAllFunction';
import { logout } from '@app/store/service/AuthService';
import { getTaskList } from '@app/store/service/ToDoService';
import ToDoCard from '@app/components/common/ToDoCard';
import { TODO_TYPE } from '@app/types';
import AddEditToDoModal from '@app/components/common/AddEditToDoModal';
import { storeTheme } from '@app/store/slice/auth.slice';
import { normalize } from '@app/utils/orientation';
const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const todoList = useAppSelector(state => state.todo.toDoList);
  const isDarkTheme = useAppSelector(state => state.auth.isDarkTheme);
  const theme = isDarkTheme ? 'dark' : 'light';
  const isFocused = useIsFocused();
  const [isAddToDoModalShow, setIsAddToDoModalShow] = useState<boolean>(false);
  const toggleSwitch = () => {
    dispatch(storeTheme(!isDarkTheme));
  };
  useEffect(() => {
    dispatch(getTaskList(''));
  }, []);
  const onPressLogout = () => {
    dispatch(logout());
  };
  // console.log('todoList ------------------->>>', todoList);
  const renderItm = ({ item, index }: { item: TODO_TYPE; index: number }) => (
    <ToDoCard todoDetails={item} todoIndex={index} />
  );
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: Colors.white[theme],
        },
      ]}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text
          style={[
            styles.headerText,
            {
              color: Colors.black[theme],
            },
          ]}
        >
          Home
        </Text>
        <TouchableOpacity
          onPress={() => {
            handleAlert(
              'Logout',
              'Are you sure you want to logout?',
              onPressLogout,
            );
          }}
        >
          <Image source={Icons.logout} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.themeContainer}>
        <Text
          style={{
            color: Colors.black[theme],
          }}
        >
          Dark Theme
        </Text>
        <Switch
          trackColor={{
            false: Colors.gray[theme],
            true: Colors.gray[theme],
          }}
          ios_backgroundColor="green"
          onValueChange={toggleSwitch}
          value={isDarkTheme}
        />
      </View>

      {/* FlatList */}
      <FlatList
        data={todoList}
        renderItem={renderItm}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
      />
      <TouchableOpacity
        onPress={() => {
          setIsAddToDoModalShow(true);
        }}
        style={[
          styles.floatingButton,
          {
            backgroundColor: Colors.black[theme],
          },
        ]}
      >
        <Text
          style={[
            styles.floatingText,
            {
              color: Colors.white[theme],
            },
          ]}
        >
          +
        </Text>
      </TouchableOpacity>

      <AddEditToDoModal
        isVisible={isAddToDoModalShow}
        setIsvible={setIsAddToDoModalShow}
      />
    </SafeAreaView>
  );
};

export default Home;
