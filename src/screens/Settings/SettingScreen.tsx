import React, { useContext } from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { ThemeContext, useTheme } from '../../context/ThemeContext'; // adjust if needed
import StatesBarPage from '../../utility/StatesBarPage';

const SettingScreen = () => {
  // const { theme, toggleTheme } = useContext(ThemeContext);
  const { theme, toggleTheme, isDarkMode } = useTheme();

  return (
    <>
      <StatesBarPage barColar={theme.mode === 'dark' ? 'light-content' : 'dark-content'} bgColor='' />
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      <Text style={[styles.title, { color: theme.text }]}>Settings</Text>

      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.text }]}>Dark Mode</Text>
        <Switch
          value={theme.mode === 'dark'}
          onValueChange={toggleTheme}
          thumbColor={theme.mode === 'dark' ? theme.primary : '#ccc'}
          trackColor={{ false: '#999', true: theme.primary }}
        />
      </View>
    </View>
    </>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  label: {
    fontSize: 16,
  },
});
