import React, {useRef, useEffect} from 'react';
import {Animated, View} from 'react-native';

const AnimatedBar = ({value, index}) => {
  const expand = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(expand, {
      toValue: value,
      useNativeDriver: false,
      delay: index * 150,
      duration: 1000,
    }).start();
  }, [expand]);

  const interpolatedValue = expand.interpolate({
    inputRange: [0,255],
    outputRange: [0, 100],
  });

   return(
     <Animated.View
       style={[styles.bar, {width: interpolatedValue}]}>
     </Animated.View>
   )
};

const styles = {
  bar: {
    backgroundColor: 'blue',
    height: 8,
  },
};

export default AnimatedBar;
