import { Colors } from '@app/themes';
import { normalize } from '@app/utils/orientation';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(15),
    height: normalize(45),
  },
  icon: {
    height: normalize(18),
    width: normalize(18), 
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  listContent: {
    padding: 16,
  },
  itemContainer: { 
    padding: normalize(15),
    marginBottom: 8,
    borderRadius: 8,
  
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: normalize(12),
    color: '#333333',
  },
  floatingButton: {
    height: normalize(50),
    width: normalize(50),
    borderRadius: normalize(30), 
    position: 'absolute',
    bottom: normalize(60),
    right: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingText: {
    fontSize: normalize(30),
    // color: Colors.white,
    includeFontPadding: false,
  },
  themeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: normalize(15),
  },
});

export default styles;
