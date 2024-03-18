import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Dimensions, ScrollView, ActivityIndicator, Image } from 'react-native';
import { API_KEY } from '../data/constant';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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

    if (!data || !data.weather || !data.weather[0]) {
        console.log("Weather condition not found:", data?.weather[0]?.main);
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No data available for this location.</Text>
            </View>
        );
    }

    let weatherImageSource;
    if (data.weather[0].main === 'Clear') {
        const currentHour = new Date().getHours();
        // If current hour is between 6 AM and 6 PM, consider it as day time
        const isDayTime = currentHour >= 6 && currentHour < 18;
        weatherImageSource = isDayTime ? require('../assets/sun.png') : require('../assets/moon.png');
    } else {
        switch (data.weather[0].main) {
            case 'Clouds':
                weatherImageSource = require('../assets/clouds.png');
                break;
            case 'Rain':
            case 'Drizzle':
                weatherImageSource = require('../assets/rain.png');
                break;
            case 'Thunderstorm':
                weatherImageSource = require('../assets/lightning.png');
                break;
            case 'Snow':
                weatherImageSource = require('../assets/snow.png');
                break;
            case 'Haze':
            case 'Smoke':
                weatherImageSource = require('../assets/mist.png');
                break;
            default:
                weatherImageSource = require('../assets/clear.jpg');
        }
    }

    return (
        <ScrollView>
            <ImageBackground
                source={require('../assets/clear.jpg')}
                style={{ width: width, height: height }}
            >
                <View style={{ width: width, height: height }}>
                    <View style={{ position: 'absolute', width: width, height: "55%", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 60, fontWeight: 'bold', textAlign: 'center', marginBottom: 80 }}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
                    </View>
                    <View style={{ position: 'absolute', width: width, height: "80%", flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center', width: '65%' }}>
                            <Image
                                source={weatherImageSource}
                                style={{ width: 100, height: 100 }}
                            />
                            <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginTop: 10 }}>
                                <Text style={{ color: 'white', fontSize: 60, fontWeight: 'bold' }}>{Math.floor(data.main.temp - 273)}</Text>
                                <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', marginTop: 10 }}>&deg;C</Text>
                            </View>
                        </View>
                        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 15 }}>{data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</Text>
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
                </View>
            </ImageBackground >
        </ScrollView>
    );
}
