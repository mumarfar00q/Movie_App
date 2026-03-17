import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { fallbackPersonPoster, image185, image500 } from '../api/moviedb';

// import { Image } from 'react-native-svg';


export default function Cast({ cast, navigation }) {
    // let person.original_name = "Farooq Ahmed";
    // let person.character = "As Hero Name";
    return (
        <View style={{ marginVertical: 24 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginHorizontal: 16, marginBottom: 12 }}>Top Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity key={index} style={{ marginRight: 16, alignItems: 'center', rowGap: 8 }}
                                onPress={() => navigation.navigate('PersonScr', { id: person.id })}
                            >
                                <View style={{ width: 80, height: 80, overflow: 'hidden', borderRadius: 4, alignItems: 'center', borderColor: '#737373', borderWidth: 1, borderRadius: 40 }}>
                                    {/* Person Image */}
                                    <Image
                                        source={
                                            person.profile_path
                                                ? { uri: image185(person.profile_path) }
                                                : fallbackPersonPoster
                                        }
                                        style={{ width: 80, height: 80, borderRadius: 40 }}
                                    />

                                </View>
                                <Text style={{ color: 'white', fontSize: 12, marginTop: 4 }}>
                                    {(person.character || 'Unknown').length > 10
                                        ? (person.character || 'Unknown').slice(0, 10) + '...'
                                        : (person.character || 'Unknown')}
                                </Text>

                                <Text style={{ color: '#a3a3a3', fontSize: 12 }}>
                                    {(person.original_name || 'No Name').length > 10
                                        ? (person.original_name || 'No Name').slice(0, 10) + '...'
                                        : (person.original_name || 'No Name')}
                                </Text>

                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}