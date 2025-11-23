import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useState } from 'react';
import { normalize } from '@app/utils/orientation';
import { TODO_TYPE } from '@app/types';
import { Colors, Icons } from '@app/themes';
import AddEditToDoModal from './AddEditToDoModal';
import { useAppSelector } from '@app/store';

interface ToDoCard_TYPE {
  todoDetails: TODO_TYPE;
  todoIndex: number;
}

const ToDoCard: FC<ToDoCard_TYPE> = ({ todoDetails, todoIndex }) => {
  const isDarkTheme = useAppSelector(state => state.auth.isDarkTheme);
  const theme = isDarkTheme ? 'dark' : 'light';
  const [isEditToDoModalShow, setIsEditToDoModalShow] =
    useState<boolean>(false);
  // console.log(todoDetails);
  return (
    <View
      key={todoIndex}
      style={[
        styles.itemContainer,
        {
          backgroundColor: Colors.cardColor[theme],
          // shadowColor: Colors.black[theme],
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.itemText,
            {
              color: Colors.black[theme],
            },
          ]}
        >
          {todoDetails?.task}
        </Text>
      </View>

      {todoDetails?.isCompleted && (
        <View style={[styles.dots]}>
          <Image source={Icons.check} style={styles.dotsIcon} />
        </View>
      )}

      <TouchableOpacity
        onPress={() => {
          console.log(todoDetails);
          setIsEditToDoModalShow(true);
        }}
        style={styles.dots}
      >
        <Image source={Icons.dots} style={styles.dotsIcon} />
      </TouchableOpacity>

      <AddEditToDoModal
        isVisible={isEditToDoModalShow}
        setIsvible={setIsEditToDoModalShow}
        taskDetails={todoDetails}
      />
    </View>
  );
};

export default ToDoCard;

const styles = StyleSheet.create({
  dots: {
    height: normalize(15),
    width: normalize(15),
  },
  dotsIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  itemContainer: {
    padding: normalize(13),
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: normalize(12),
    fontWeight: '500',
  },
});
