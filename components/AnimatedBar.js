import React, {useRef, useEffect} from 'react';
import {Animated, View} from 'react-native';

const AnimatedBar = ({value}) => {
  const width = useRef(new Animated.Value(0)).current;

  const animate = () => {
    Animated.timing(width, {
      toValue: value,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animate();
  }, [value]);

   return(
     <Animated.View style={[styles.bar, {width}]}></Animated.View>
   )
};

const styles = {
  bar: {
    backgroundColor: 'blue',
    height: 8,
  },
};

export default AnimatedBar;
