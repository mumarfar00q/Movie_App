import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185, image500 } from '../api/moviedb';

const { width, height } = Dimensions.get('window');

export default function Movieslist({ title, data, hideSeeAll }) {

    const navigation = useNavigation();

    return (
        <View style={{ marginBottom: 32, rowGap: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16 }}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '400' }}>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={{ color: '#eab308', fontSize: 16, fontWeight: '400' }}>See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            {/* Movie items will go here */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
                {
                    data.map((item, index) => (
                        <TouchableWithoutFeedback key={index} onPress={() => navigation.push('MovieDetail', item)}>
                            <View style={{ marginRight: 16, rowGap: 8 }}>
                                <Image
                                    // source={require('../theme/image/poster3.png')}
                                    source={
                                        item?.poster_path
                                        ? { uri: image185(item.poster_path) }
                                        : fallbackMoviePoster
                                    }
                                    style={{ width: width * 0.33, height: height * 0.22, borderRadius: 8, backgroundColor: '#404040' }}
                                />
                                <Text style={{ color: 'white', width: 120 }}>{item.title.length > 15 ? item.title.slice(0, 15) + '...' : item.title}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))
                }
            </ScrollView>
        </View>
    )
}