import { Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrendingMovies from "../components/trendingMovies";
import Movieslist from "../components/movieslist";
import Loader from "../components/loading";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { fetchTrendingMovies,fetchUpcomingMovies, fetchTopRatedMovies } from "../api/moviedb";

const ios = Platform.OS === 'ios';
export default function HomeScr() {
    const [trending, setTrending] = useState([]);
    const [upComing, setUpComing] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        getTrandingMovies();
        getUpComingMovies();
        getTopRatedMovies();
    }, []);

    const getTrandingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results)
            setTrending(data.results);
        setLoading(false);
    }

    const getUpComingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.results)
            setUpComing(data.results);
    }

    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data && data.results)
            setTopRated(data.results);
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#262626' }}>
            {/* Search bar */}
            <SafeAreaView style={{ marginBottom: ios ? -8 : 12 }}>
                <StatusBar style="light" />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
                    <Icon name="menu" size={28} color="white" />
                    <Text style={{ color: 'white', fontSize: 25, fontWeight: '900' }}>
                        <Text style={{ color: '#eab308' }}>M</Text>ovies
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                        <Icon name="search" size={28} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                loading ? (
                    <Loader />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}>

                        {/* Trending Movies */}
                        {trending.length > 0 && <TrendingMovies data={trending} />}

                        {/* Upcoming Movies List */}
                        <Movieslist title="Upcoming" data={upComing} />

                        {/* Top Rated Movies List */}
                        <Movieslist title="Top Rated" data={topRated} />

                    </ScrollView>
                )
            }
        </View>
    )
}