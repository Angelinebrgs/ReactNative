import { Text, View, FlatList, Image, Pressable} from"react-native"
import React, {useState} from "react";

export default Details = ({navigation, route}) => {
    console.log(route.params.slug);
    return (
        <View style={style.page}>
                <FlatList style={style.list} data={games} renderItem={ ({item}) => (
                    <Pressable onPress={ () => { handleClick(item.slug) } }>
                    <View style={style.listItem}>
                        <Image source={{uri:item.background_image}} style={style.listImage}></Image>
                        <Text>{item.name}</Text>    
                        <Text>Note: {item.rating}</Text>
                    </View>
                    </Pressable>
                )} keyExtractor={(item) => item.id}>
            </FlatList>
        </View>
    );
}

const style = {
    page: {
        flex: 1,
    },
    listImage: {
        width: 75,
        height: 75,
        resizeMode: 'center',
        marginRight:10
    },
}