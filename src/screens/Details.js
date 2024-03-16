import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { API_KEY } from '../data/constant';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// // Object mapping weather condition codes to image assets
// const weatherImages = {
//     'Clear': require('../assets/Sunny.jpg'),
//     'Clouds': require('../assets/Cloudy.jpg'),
//     'Partial Clouds': require('../assets/PartialCloudy.jpg'),
//     'Rain': require('../assets/Rainy.jpg'),
//     'Drizzle': require('../assets/Rainy.jpg'),
//     'Thunderstorm': require('../assets/Lightning.jpg'),
//     'Snow': require('../assets/Snow.jpg'),
//     'Cloudy Night': require('../assets/CloudyNight.jpg'),
// };

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

    return (
        <ScrollView>
            {data && (
                <ScrollView>
                    <ImageBackground
                        source={require('../assets/BackImage.jpeg')}
                        style={{ width: width, height: height }}
                    />
                    <View style={{ position: 'absolute', width: width, height: "55%", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 48, fontWeight: 'bold', textAlign: 'center' }}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
                    </View>
                    <View style={{ position: 'absolute', width: width, height: "80%", flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text className='text-white font-extrabold text-6xl'>{Math.floor(data.main.temp - 273)}</Text>
                            <Text className='text-white font-bold text-2xl'>&deg;C</Text>
                        </View>
                        <Text className='text-white font-bold text-xl'>{data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</Text>
                    </View>
                    <View style={{ position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 10, padding: 10, width: width - 20, top: '75%', marginHorizontal: 10 }}>
                        <Text className='text-white text-lg font-medium'>Humidity : {data.main.humidity}</Text>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.5)', margin: 2 }} />
                        <Text className='text-white text-lg font-medium'>Pressure : {data.main.pressure}</Text>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.5)', margin: 2 }} />
                        <Text className='text-white text-lg font-medium'>Wind : {data.wind.speed} m/s</Text>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.5)', margin: 2 }} />
                        <Text className='text-white text-lg font-medium'>Sunrise : {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.5)', margin: 2 }} />
                        <Text className='text-white text-lg font-medium'>Sunset : {new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </View>
                </ScrollView>
            )}
        </ScrollView>
    );
}
