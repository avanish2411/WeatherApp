import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { cities } from '../data/cities'



export default function Cards({ name,navigation }) {
    return (
        <TouchableOpacity className='px-2 py-1 mr-2 mt-2 border rounded-lg border-white' onPress={()=>navigation.navigate("Details",{name})}>
            <Text className='text-white text-sm'>{name}</Text>
        </TouchableOpacity>
    )
}