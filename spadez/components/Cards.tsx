//Defining All 54 Cards

import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native";

const deckData = [

]

const cards =  [
{id:"S-15", suit:"spade", rank:"BigJoker"},{id:"S-14", suit:"spade",rank:"LittleJoker"},
{id:"S-13", suit:"spade", rank:"Ace"},{id:"S-12", suit:"spade", rank:"King"},
{id:"S-11", suit:"spade", rank:"Queen"},{id:"S-10", suit:"spade",rank:"Jack"},
{id:"S-9", suit:"spade", rank:"Ten"},{id:"S-8", suit:"spade",rank:"Nine"},
{id:"S-7", suit:"spade", rank:"Eight"},{id:"S-6", suit:"spade",rank:"Seven"},
{id:"S-5", suit:"spade", rank:"Six"},{id:"S-4", suit:"spade",rank:"Five"},
{id:"S-3", suit:"spade", rank:"Four"},{id:"S-2", suit:"spade",rank:"Three"},
{id:"S-1", suit:"spade", rank:"Two"},{id:"H-13", suit:"heart",rank:"Ace"},
{id:"H-12", suit:"heart", rank:"King"},{id:"H-11", suit:"heart",rank:"Queen"},
{id:"H-10", suit:"heart", rank:"Jack"},{id:"H-9", suit:"heart",rank:"Ten"},
{id:"H-8", suit:"heart", rank:"Nine"},{id:"H-7", suit:"heart",rank:"Eight"},
{id:"H-6", suit:"heart", rank:"Seven"},{id:"H-5", suit:"heart",rank:"Six"},
{id:"H-4", suit:"heart", rank:"Five"},{id:"H-3", suit:"heart",rank:"Four"},
{id:"H-2", suit:"heart", rank:"Three"},{id:"H-1", suit:"heart",rank:"Two"},
{id:"C-13", suit:"club", rank:"Ace"},{id:"C-12", suit:"club",rank:"King"},
{id:"C-11", suit:"club", rank:"Queen"},{id:"C-10", suit:"club",rank:"Jack"},
{id:"C-9", suit:"club", rank:"Ten"},{id:"C-8", suit:"club",rank:"Nine"},
{id:"C-7", suit:"club", rank:"Eight"},{id:"C-6", suit:"club",rank:"Seven"},
{id:"C-5", suit:"club", rank:"Six"},{id:"C-4", suit:"club",rank:"Five"},
{id:"C-3", suit:"club", rank:"Four"},{id:"C-2", suit:"club",rank:"Three"},
{id:"C-1", suit:"club", rank:"Two"},{id:"D-13", suit:"diamond",rank:"Ace"},
{id:"D-12", suit:"diamond", rank:"King"},{id:"D-11", suit:"diamond",rank:"Queen"},
{id:"D-10", suit:"diamond", rank:"Jack"},{id:"D-9", suit:"diamond",rank:"Ten"},
{id:"D-8", suit:"diamond", rank:"Nine"},{id:"D-7", suit:"diamond",rank:"Eight"},
{id:"D-6", suit:"diamond", rank:"Seven"},{id:"D-5", suit:"diamond",rank:"Six"},
{id:"D-4", suit:"diamond", rank:"Five"},{id:"D-3", suit:"diamond",rank:"Four"},
{id:"D-2", suit:"diamond", rank:"Three"},{id:"D-1", suit:"diamond",rank:"Two"},
]

interface CardProps {
    suit: string;
    rank: string;
    id: string;

}

const Card: React.FC<CardProps> = ({suit, rank}) => {
    const cardColor = (suit === 'heart' || suit === 'diamond') ? 'red' : 'black';
    
    return (
        <View style = {[ styles.cardContainer, {borderColor: cardColor}]}>
            <Text style = {[styles.cardText, {color: cardColor} ]}>{rank}</Text>
            <Text style = {[styles.cardText, {color: cardColor} ]}>{suit}</Text>
        </View>

    )
};


//This function should handle Rendering each card
export default function RenderPlayerCards (CardProps) {
const [playerHand, setPlayerHand] = useState([]);


    function shuffleDeck(cards:any){
        for(let i = cards.length - 1; i > 0; i--){
            const j = Math.floor(Math.random()* (i+1));
            [cards[i],cards[j] = [cards[j],cards[i]]];
        }
        return [cards];
    }
    return(
        shuffleDeck(cards),
    <View>
        {[CardProps]}
    </View>
    );
   
}


const styles = StyleSheet.create({
    cardContainer: {
        width: 80,
        height: 120,
        backgroundColor:'#fff',
        borderRadius: 8,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height:2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    cardText: {
        fontSize: 20,
        fontWeight: 'bold', 
    },
});

 


