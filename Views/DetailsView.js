import * as React from 'react';
import {View, Text, Image, ActivityIndicator, Animated} from 'react-native';

import {useAsyncStorage} from '../hooks/useAsyncStorage';
import AnimatedBar from '../components/AnimatedBar';

const DetailsView = ({route}) => {
  const {name} = route.params;
  const [detailSource, setDetailSource] = useAsyncStorage(
    `@pokeDex_details_${name}`,
  );

  if (!detailSource) return <ActivityIndicator />;
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: detailSource.sprites.front_default,
        }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
      <Text style={styles.name}>{name}</Text>
      {detailSource.stats.map((item, index) => (
        <View key={index} style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {item.stat.name.toUpperCase()}: </Text>
          <Text style={styles.statsValue}>{item.base_stat}</Text>
          <AnimatedBar value={item.base_stat} index={index} />
        </View>
        )
      )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(53, 253, 203, 0.7)',
    position: 'relative',
  },
  image: {
    width: 150,
    height: 150,
    backgroundColor: 'rgba(53, 253, 203, 0)',
    position: 'absolute',
    top: 30,
    zIndex: 20,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255,255,255,1)',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    height: '77%',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    margin: 1,

  },
  statsText: {
    marginRight: 6,
    width: '35%',
    textAlign: 'right',
  },
  statsValue: {
    fontWeight: '600',
    width: '7.5%',
  },
  name: {
    textTransform: 'uppercase',
    fontSize: 25,
    marginBottom: 20,
    marginTop: 60,
    color: 'rgb(53, 53, 253)',
    fontWeight: '700',
  }
};

export default DetailsView;
