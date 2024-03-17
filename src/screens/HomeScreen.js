import React, { useState, useRef } from 'react';
import { View, SafeAreaView, Dimensions, TextInput, FlatList, Text, ImageBackground, Alert, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import Search from 'react-native-vector-icons/Ionicons';
import { cities } from '../data/cities';
import Cards from '../components/Cards';
import Top from '../components/Top';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function HomeScreen(props) {
    const [city, setCity] = useState('');
    const inputRef = useRef(null);

    const handleSearch = () => {
        if (city.trim() !== '') {
            props.navigation.navigate("Details", { name: city });
            setCity('');
            Keyboard.dismiss();
        } else {
            // Show warning if the TextInput is empty
            Alert.alert('Warning', 'Please enter a city name.');
            Keyboard.dismiss();
        }
    };

    const focusOnInput = () => {
        inputRef.current.focus();
    };

    return (
        <SafeAreaView style={{ backgroundColor: 'black', height: height }}>
            <ScrollView>
                <ImageBackground
                    source={require('../assets/FirstImage.jpg')}
                    style={{ width: width, height: height }}
                />
                {/* top */}
                <Top />

                {/* Middle */}
                <View style={{ position: 'absolute', paddingHorizontal: 10 }}>
                    <Text style={{ color: 'white', fontSize: 50, fontWeight: 'bold', marginTop: 120 }}>Welcome</Text>
                    <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>to Weathher Forecast</Text>
                    <TouchableOpacity onPress={focusOnInput} style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderWidth: 2,
                        borderColor: 'black',
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        marginTop: 200,
                        marginBottom: 10,
                        width: width - 20
                    }}>
                        <TextInput
                            ref={inputRef}
                            placeholder='Search Here...'
                            placeholderTextColor='black'
                            value={city}
                            onChangeText={(val) => setCity(val)}
                            style={{ paddingHorizontal: 5, color: 'black', fontSize: 16, fontWeight: '600' ,flex:1}}
                        />
                        <Search name="search" size={20} color='black' onPress={handleSearch} />
                    </TouchableOpacity>
                    
                </View>

                {/* bottom */}
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={cities}
                    renderItem={({ item }) => (
                        <Cards name={item.name} navigation={props.navigation} />
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    )
}
