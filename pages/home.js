import React from"react";
import { Button,Text, FlatList, TextInput, View, Image, Pressable} from"react-native";
import {useState} from "react";

const Home = ({navigation}) => {
    const [searchText, setSearchText] = useState("Valorant");
    const [games, setGames] = useState([
        { id:1, name:"Jeux 1", rating:4.6 },
        { id:2, name:"Jeux 2", rating:3.5 },
        { id:3, name:"Jeux 3", rating:4.2 },
        { id:4, name:"Jeux 4", rating:1.5 },
        { id:5, name:"Jeux 5", rating:3.7 },
        { id:6, name:"Jeux 6", rating:5 }
    ]);
    const handleClick = slug => {
            navigation.push('Details', {slug}); 
        };
    const handleSearch = () => {
        const apiKey = '5255b41eb2b14db08d004643890cba07';
        const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURI(searchText)}`;
        fetch(url)
        .then( response => response.json() )
        .then( data => { setGames(data.results) } )
        .catch( () => { alert('Une erreur est survenue') } )
    };
    
    return (

        <View style={style.page}>
            <View style={style.searchBar}>
                <TextInput style={style.searchInput} onChangeText={setSearchText} value={searchText}></TextInput>
                <Button title="Chercher" onPress={handleSearch}></Button>
            </View>
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
};

const style = {
page : {
    flex: 1,
    },
    searchBar : {
        flexDirection: "row",
    },
    searchInput : {
        flex: 1,
        borderWidth: 1,
        borderColor: "black",
    },
    list : {
        flex: 1,
    },
    listItem : {
        backgroundcolor: '#e0e0e0',
        margin: 2,
        padding: 15,
    },
    listImage: {
        width: 75,
        height: 75,
        resizeMode: 'center',
        marginRight:10
    }
};
export default Home ;