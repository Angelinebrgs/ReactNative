import { Text, ScrollView, Image, Button } from"react-native"
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from"react-redux";

export default Details = ({navigation, route}) => {
    const [game, setGame] = useState(null);
    const slug = route.params.slug;
    const bookmarks = useSelector( (state) => state.games )
    const dispatch = useDispatch();

    useEffect(() => {
        const apiKey = '616814465e4f4cd8b8ae7e8c0fdb0265';
        const url = `https://api.rawg.io/api/games/${slug}?key=${apiKey}`;
        fetch(url)
        .then( response => response.json() )
        .then( data => {
            console.log(data);
            setGame(data) } )
        .catch( () => { alert('Une erreur est survenue') } )
    },[]);

    const handlePressAdd = () => {
        dispatch({
            type: 'game/addGame', payload: {
                "slug": game.slug,
                "name": game.name,
                "background_image": game.background_image,
                "id": game.id,
            }
        });
    }

    const handlePressRemove = () => {
        dispatch({
            type: 'game/removeGame', payload: game.id,
            
        });
    }

    const isBookmarked = () => bookmarks.find( bookmark => bookmark.id == game.id )!== undefined;

    return (
        <ScrollView style={style.page}>
            <Image source={ game!=null &&  { uri : game.background_image}} style={style.listImage}></Image>
            <Text>{game!=null &&  game.name}</Text>
            <Text>{game!=null && game.description.replace(/<[^>]*>/g, "")}</Text>
            { game!=null && !isBookmarked() ? (
            <Button title='⭐ Ajouter' onPress={handlePressAdd}></Button>
            ) : (
            <Button title='⭐ Retirer'onPress={handlePressRemove}></Button>
            ) }
        </ScrollView>
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