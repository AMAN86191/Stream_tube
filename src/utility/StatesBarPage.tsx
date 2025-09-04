import React from 'react';
import { NativeModules, Platform, StatusBar, View } from 'react-native';

const { StatusBarManager } = NativeModules;

const StatesBarPage = ({
  barColar = 'dark-content',
  bgColor = '#000',
}) => {
  const [statusBarHeight, setStatusBarHeight] = React.useState(0);

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(statusBarFrameData => {
        setStatusBarHeight(statusBarFrameData.height);
      });
    } else {
      setStatusBarHeight(StatusBar.currentHeight || 0);
    }
  }, []);

  return (
    <View style={{ paddingTop: statusBarHeight }}>
      <StatusBar
        translucent
        barStyle={barColar}
        backgroundColor={bgColor}

      />
    </View>
  );
};

export default StatesBarPage;
