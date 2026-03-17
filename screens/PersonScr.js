import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { } from 'react/cjs/react.development';
import React, { useEffect, useState } from 'react'
import Movieslist from '../components/movieslist';
import Loader from '../components/loading';
import { fallbackPersonPoster, fetchpersonDetail, image342, fetchpersonMovie } from '../api/moviedb';



const { width, height } = Dimensions.get('window');

export default function PersonScr() {
  console.log('🔥 MovieDetails SCREEN RENDERED');
  const { params } = useRoute();
  const [isFavorite, toogleFavorite] = useState(false);
  const [PersonMovies, setPersonMovies] = useState([]);
  const [personDetail, setPersonDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (!params?.id) return;
    setLoading(true);
    getPersonDetail(params.id);
  }, [params]);

  const getPersonDetail = async id => {
    try {
      const Pdetail = await fetchpersonDetail(id);
      const movies = await fetchpersonMovie(id);

      setPersonDetail(Pdetail);
      setPersonMovies(movies?.cast || []);
    } catch (error) {
      console.error('error in person screen:', error);
    } finally {
      setLoading(false);
    }
  }


  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#171717' }} contentContainerStyle={{ paddingBottom: 20, }}>
      {/* Back Btn & Favourite Btn */}
      <SafeAreaView style={{ zIndex: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, marginTop: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: '#eab308', padding: 3, borderRadius: 10 }}>
          <Icon name="arrow-back-ios-new" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toogleFavorite(!isFavorite)}>
          <Icon name="favorite" size={30} color={isFavorite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Person Details */}
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 0 }}>
        <View style={{
          width: 288,
          height: 288,
          borderRadius: 144, // half of width/height
          backgroundColor: '#922222',
          elevation: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{ width: 288, height: 288, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderColor: '#737373', borderWidth: 2, borderRadius: 144 }}>
            {/* Person Image */}
            <Image
              source={
                personDetail?.profile_path
                  ? { uri: image342(personDetail.profile_path) }
                  : fallbackPersonPoster
              }
              style={{ width: '100%', height: '100%' }}
            />


          </View>
        </View>
      </View>

      <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 12 }}>
        <Text style={{ color: 'white', fontSize: 25, fontWeight: '600' }}>Farooq Ahmed</Text>
        <Text style={{ color: '#a3a3a3', fontSize: 14 }}>Actor | Director | Producer</Text>
      </View>

      <View style={{ marginHorizontal: 6, marginTop: 14, padding: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: '#404040', borderRadius: 100, borderWidth: 2, borderColor: '#737373' }}>
        <View style={{ flex: 1, padding: 0, alignItems: 'center', borderRightWidth: 2, borderRightColor: '#737373', }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Gender</Text>
          <Text style={{ color: '#D4D4D4', fontSize: 14 }}>Male</Text>
        </View>
        <View style={{ flex: 1, padding: 0, alignItems: 'center', borderRightWidth: 2, borderRightColor: '#737373', }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Birthday</Text>
          <Text style={{ color: '#D4D4D4', fontSize: 14 }}>1991-10-10</Text>
        </View>
        <View style={{ flex: 1, padding: 0, alignItems: 'center', borderRightWidth: 2, borderRightColor: '#737373', }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Know for</Text>
          <Text style={{ color: '#D4D4D4', fontSize: 14 }}>Acting</Text>
        </View>
        <View style={{ flex: 1, padding: 0, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Popularity</Text>
          <Text style={{ color: '#D4D4D4', fontSize: 14 }}>89.1</Text>
        </View>
      </View>

      {/* Biography Section */}
      <View style={{ marginHorizontal: 16, marginTop: 24, rowGap: 12, marginVertical: 12, marginBottom: 20 }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: '400' }}>Biography</Text>
        <Text style={{ color: '#A3A3A3', fontSize: 14, textAlign: 'justify', letterSpacing: 0.5 }}>
          Farooq Ahmed is a renowned actor and filmmaker known for his versatile roles in both independent films and blockbuster hits. Born in 1991, Farooq developed a passion for acting at a young age, leading him to pursue a career in the entertainment industry. Over the years, he has garnered critical acclaim for his performances, earning several awards and nominations. In addition to acting, Farooq has also ventured into directing and producing, showcasing his multifaceted talent in the film industry. His dedication to his craft and ability to portray complex characters have made him a beloved figure among fans worldwide.
        </Text>
      </View>

      {/* Person Movies  */}
      <Movieslist title="Known For" hideSeeAll={true} data={PersonMovies} />
    </ScrollView>
  )
}
