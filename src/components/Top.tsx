import { View, Text, Image } from 'react-native'
import React from 'react'

import Location from 'react-native-vector-icons/Ionicons'
import Menu from 'react-native-vector-icons/Entypo'

export default function Top() {
    return (
        <View style={{position:'absolute' ,flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', width: "100%" ,paddingHorizontal:10,marginTop:10}}>
            <Menu name="menu" size={20} color='white' onPress={()=>{}} />
            <Image source={require('../assets/user.jpg')}
                style={{ width: 30, height: 30, borderRadius: 25 }}
            />
        </View>
    )
}