import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext'; // ✅ your theme context

const Settingheader = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.background }]}>
      <Text style={[styles.logo, { color: theme.primary }]}>SnapTube</Text>
      <View style={styles.headerIcons}>
        <Icon name="tv-outline" size={22} color={theme.text} style={styles.icon} />
        <Icon name="notifications-outline" size={22} color={theme.text} style={styles.icon} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('HomeStack', { screen: 'SettingScreen' })
          }
          activeOpacity={0.1}
        >
          <Icon name="settings-outline" size={22} color={theme.text} style={styles.icon} />
        </TouchableOpacity>
        <Icon name="person-circle-outline" size={26} color={theme.text} />
      </View>
    </View>
  );
};

export default Settingheader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  logo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  icon: {
    marginLeft: 12,
  },
});
