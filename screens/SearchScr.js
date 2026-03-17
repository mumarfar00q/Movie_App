import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react/cjs/react.development';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loader from '../components/loading';
import { image185, searchMovie } from '../api/moviedb';
import { debounce } from 'lodash';
import { fallbackMoviePoster } from '../api/moviedb';
// import { Image } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const [Results, setResults] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false);

  let MovieName = 'Falling back to file-based resolution.';

  const handleSearch = async query => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovie({
        query: value,
        include_adult: 'false',
        language: 'en-US',
        page: '1'
      }).then(data => {
        setLoading(false);
        if (data?.results?.length > 0) {
          setResults(data.results);
        }
      })
    }else{
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: '#262626', flex: 1 }}>
      {/* Search Bar Container */}
      <View style={{ marginHorizontal: 16, marginBottom: 12, marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderRadius: 50, borderColor: '#737373', backgroundColor: 'transparent' }}>

        <TextInput
          onChangeText={handleTextDebounce}
          placeholder='Search Movie'
          placeholderTextColor={'lightgray'}
          style={{ paddingLeft: 24, height: 55, flex: 1, fontSize: 16, fontWeight: '500', color: 'white', letterSpacing: 0.5 }}
        />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ borderRadius: 50, margin: 4, padding: 10, backgroundColor: '#737373', marginRight: 4 }}
        >
          <Icon name="close" size={27} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Results */}
      {
        loading ? <Loader />
          :
          Results.length > 0 ?
            (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                style={{ gap: 12 }}>
                <Text style={{ color: 'white', fontWeight: 'semibold', marginLeft: 20, marginBottom: 12 }}>Results ({Results.length})</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 16, gap: 12 }}>

                  {
                    Results.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => navigation.push('MovieDetail', item)}
                          style={{ backgroundColor: '#404040', borderRadius: 8, marginBottom: 12, overflow: 'hidden' }}
                        >
                          <View style={{ flex: 1, backgroundColor: '#737373', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                              source={require('../theme/image/poster6.png')}
                              // source={{uri: image185(item.poster_path) || fallbackMoviePoster}}
                              style={{ width: width * 0.44, height: height * 0.3, resizeMode: 'cover' }}
                            />
                          </View>
                          <View style={{ padding: 6 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }} numberOfLines={1}>{MovieName.length > 22 ? MovieName.slice(0, 22) + '...' : MovieName}</Text>
                            <Text style={{ color: '#a3a3a3', fontSize: 14 }} numberOfLines={1}>2024 • Action, Adventure</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    })
                  }

                </View>
              </ScrollView>
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={require('../theme/image/no-results.png')}
                  style={{ width: '100%', height: '100%', resizeMode: 'contain', marginBottom: 150 }}
                />
              </View>
            )
      }

    </SafeAreaView >
  )
}