import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { API_KEY } from '../data/constant';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const weatherImages = {
    'Clear': require('../assets/sunny.jpg'),
    'Clouds': require('../assets/cloudy.jpg'),
    'Rain': require('../assets/rainny.jpg'),
    'Drizzle': require('../assets/rainny.jpg'),
    'Thunderstorm': require('../assets/thundering.jpg'),
    'Snow': require('../assets/snowfall.jpg'),
    'Haze': require('../assets/haze.jpg'), // corrected key name
};

export default function Details(props) {
    const { name } = props.route.params;
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // State to manage loading state

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`)
            .then(res => res.json())
            .then(res => {
                setData(res);
                setIsLoading(false); // Set loading state to false when data is fetched
            })
            .catch(err => console.log(err));
    }, [name]);

    if (isLoading) {
        // Show loading indicator while data is being fetched
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={40} color="blue" />
            </View>
        );
    }

    if (!data || !data.weather || !data.weather[0] || !weatherImages[data.weather[0].main]) {
        console.log("Weather condition not found:", data?.weather[0]?.main);
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No data available for this location.</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <ImageBackground
                source={weatherImages[data.weather[0].main]}
                style={{ width: width, height: height }}
            >
                <View style={{ position: 'absolute', width: width, height: "55%", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 48, fontWeight: 'bold', textAlign: 'center' }}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
                </View>
                <View style={{ position: 'absolute', width: width, height: "80%", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>{Math.floor(data.main.temp - 273)}</Text>
                        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>&deg;C</Text>
                    </View>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</Text>
                </View>
                <View style={{ position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 10, padding: 20, width: width - 20, bottom: '3%', marginHorizontal: 10 }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Humidity : {data.main.humidity}</Text>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.5)', margin: 2 }} />
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Pressure : {data.main.pressure}</Text>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.5)', margin: 2 }} />
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Wind : {data.wind.speed} m/s</Text>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.5)', margin: 2 }} />
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Sunrise : {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.5)', margin: 2 }} />
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Sunset : {new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>
            </ImageBackground>
        </ScrollView>
    );
}
