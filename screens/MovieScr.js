import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { use } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react/cjs/react.development';
import LinearGradient from 'react-native-linear-gradient';
import Cast from '../components/cast';
import Movieslist from '../components/movieslist';
import Loader from '../components/loading';
import PersonScr from './PersonScr';
import { fallbackMoviePoster, image500 } from '../api/moviedb';
import { fetchMovieDetails, fetchMovieCredits, fetchSimilarMovies } from '../api/moviedb'


const { width, height } = Dimensions.get('window');

export default function MovieScreen() {
    const { params: item } = useRoute();
    const [isFavorite, toogleFavorite] = useState(false);
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movieDetails, setMovieDetails] = useState({});

    const navigation = useNavigation();
    useEffect(() => {
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    }, [item]);

    const getMovieDetails = async id => {
        try {
            const details = await fetchMovieDetails(id);
            setMovieDetails(details);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };
    const getMovieCredits = async id => {
        console.log('MOVIE ID:', id);
        try {
            const credits = await fetchMovieCredits(id);
            setCast(credits || []);
        } catch (error) {
            console.error('Error fetching movie credits:', error);
            setCast([])
        }
    };
    const getSimilarMovies = async id => {
        try {
            const movies = await fetchSimilarMovies(id);
            setSimilarMovies(movies.results);
        } catch (error) {
            console.error('Error fetching similar movies:', error);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            style={{ flex: 1, backgroundColor: '#171717' }}
        >
            {/* back and movie poster */}
            <View style={{ width: '100%' }}>
                <SafeAreaView style={{ position: 'absolute', zIndex: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: '#eab308', padding: 3, borderRadius: 10 }}>
                        <Icon name="arrow-back-ios-new" size={25} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toogleFavorite(!isFavorite)}>
                        <Icon name="favorite" size={30} color={isFavorite ? "#eab308" : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>
                <View>
                    console.warn('item poster path:', item.poster_path);
                    <Image
                        source={{ uri: image500(item.poster_path) || fallbackMoviePoster }}
                        style={{ width: width, height: height * 0.55 }}
                    />
                    <LinearGradient
                        colors={[
                            'transparent',
                            'rgba(23, 23, 23, 0.8)',
                            'rgba(23, 23, 23, 1)',
                        ]}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: width,
                            height: height * 0.2,
                        }}
                    />
                </View>
            </View>
            {/* Movie details */}
            <View style={{ marginTop: -(height * 0.09), rowGap: 12 }}>
                {/* Title */}
                <Text style={{ width: '95%', color: 'white', fontSize: 30, fontWeight: 'bold', textAlign: 'center', letterSpacing: 0.5 }}>
                    {movieDetails.title}
                </Text>
                {/* Info */}
                <Text style={{ color: '#A3A3A3', fontSize: 16, fontWeight: 'semibold', textAlign: 'center' }}>{movieDetails.status} . {movieDetails.release_date?.split('-')[0]} . {movieDetails.runtime}m</Text>
                <Text style={{ color: '#A3A3A3', fontSize: 16, fontWeight: 'semibold', textAlign: 'center' }}>{movieDetails.genres?.map(genre => genre.name).join(', ')}</Text>

                {/* Description */}
                <Text style={{ color: '#A3A3A3', fontSize: 16, fontWeight: 'semibold', marginHorizontal: 16, lineHeight: 22 }}>
                    {movieDetails.overview}
                </Text>
            </View>

            {/* Cast Component */}
            <Cast navigation={navigation} cast={cast} />

            {/* Similar Movies */}
            <Movieslist title="Similar Movies" hideSeeAll={true} data={similarMovies} />
        </ScrollView>
    )
}