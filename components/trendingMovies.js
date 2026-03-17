import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import React, { use } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';


const { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('MovieDetail', item);
    }
    return (
        <View style={{ marginBottom: 32, width: '100%' }}>
            {/* <Text
                style={{
                    color: 'white',
                    fontSize: 100,
                    fontFamily: 'sans-serif',
                    fontWeight: '10',
                    // marginHorizontal: 16,
                    // alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: -100,
                    // letterSpacing: -3,
                      transform: [{ scaleY: 0.5 }],
                    
                }}
            >
                Trending
            </Text> */}
            <Carousel
                style={{ width: width, justifyContent: 'center', alignItems: 'center' }}
                width={width}
                height={height * 0.52}
                data={data}
                loop
                renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}

                autoPlay={false}
                mode='parallax'
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 175,
                    parallaxAdjacentItemScale: 0.60,
                    // parallaxAdjacentItemOpacity: 0.5,
                }}
                inactiveSlideOpacity={0.10} 
                customConfig={() => ({ type: 'positive', viewCount: 3 })}
                snapEnabled={true}
                panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                }}
            />
        </View>
    );
}

const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View
                style={{
                    width: width,
                    flex: 1,
                    // marginHorizontal: 10,
                    // backgroundColor: '#404040',
                    borderRadius: 19,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Image
                    source={{ uri: image500(item.poster_path) }}
                    style={{ width: width * 0.70, height: height * 0.53, borderRadius: 24 }}
                    resizeMode='cover'
                />
            </View>
        </TouchableWithoutFeedback>
    );
};
