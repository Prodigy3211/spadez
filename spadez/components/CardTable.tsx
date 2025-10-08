import RenderPlayerCards from "./Cards";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useGameState } from "@/hooks/useGameState";
import React, { useEffect } from "react";

export default function CardTable (){
    const {gameState, initializeGame, makeBid, playCard, aiBid, aiPlayCard} = useGameState();

    //Initialize the game

    React.useEffect(() => {
        initializeGame();
    }, []);

    //Handle Bidding

    const handlePlayerBid = (bid: number) => {
        makeBid(0, bid);

        //AI bids

        setTimeout(() => aiBid(1), 500);
        setTimeout(() => aiBid(2), 1000);
        setTimeout(() => aiBid(3), 1500);
    };

    const handlePlayerPlayCard = (card: any) => {
        playCard(0, card);
        //ai plays
        setTimeout(() => aiPlayCard(1), 500);
        setTimeout(() => aiPlayCard(2), 1000);
        setTimeout(() => aiPlayCard(3), 1500);
    }

    const getPlayerStyle = (playerIndex: number) => {
        const positionStyles = [styles.bottomPlayer, styles.leftPlayer, styles.topPlayer, styles.rightPlayer];
        return positionStyles[playerIndex];
    };
    
    
    

    return (
        <View style = {styles.table}>
            {[1,2,3].map(playerIndex => {
                const player = gameState.players[playerIndex];

                return(
                    <View key = {playerIndex} style = {[styles.playerArea, getPlayerStyle(playerIndex)]}>
                        <Text style = {styles.playerName}>{player?.name}</Text>
                        <Text style = {styles.playerInfo}>
                            Bid: {player?.bid || '?'} | Tricks: {player?.tricks || 0}
                        </Text>
                        <View style = {styles.aiHand}>
                            {player?.hand?.slice(0,3).map((_, index)=>(
                                <View key = {index} style = {styles.aiCard} />
                            ))}
                            {player?.hand && player.hand.length > 3 && (
                                <Text style = {styles.cardCount}>+{player.hand.length - 3}</Text>
                            )}
                        </View>
                    </View>
                );
            })}

            {/* Center of the Table */}
            <View style = {styles.centerArea}>
               <Text style = {styles.phaseText}>
                Phase: {gameState.phase.toUpperCase()}
               </Text>
               {gameState.currentTrick.length > 0 && (
                <View style = {styles.trickArea}>
                    {gameState.currentTrick.map((playedCard, index) => (
                        <View key = {index} style = {styles.trickCard} >
                            <Text style = {styles.trickCardText}>{playedCard.rank}</Text>
                            <Text style = {styles.trickCardText}>{playedCard.suit}</Text>
                        </View>
                    ))}
                </View>
               )}
            </View>

            {/* Human Player */}
            <View style = {styles.bottomPlayer}>
                <Text style = {styles.playerName}>You or {gameState.players[0]?.name}</Text>
                <Text style = {styles.playerInfo}>
                    Bid: {gameState.players[0]?.bid || '?'} | Tricks: {gameState.players[0]?.tricks || 0}
                </Text>

                {gameState.phase === 'bidding' && gameState.players[0]?.bid === 0 && (
                    <View style = {styles.biddingArea}>
                        <Text style = {styles.bidPrompt}>Make your bid (0-13):</Text>
                        <View style = {styles.bidButtons}>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(bid => (
                                <TouchableOpacity
                                    key = {bid}
                                    style = {styles.bidButton}
                                    onPress = {() => handlePlayerBid(bid)}
                                >
                                    <Text style = {styles.bidButtonText}>{bid}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {gameState.phase === 'playing' && gameState.currentPlayer === 0 && (
                    <RenderPlayerCards
                        cards = {gameState.players[0]?.hand || []}
                        onCardPlay = {handlePlayerPlayCard}
                    />
                )}
               
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    table: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    playerArea: {
        position: 'absolute',
        alignItems: 'center',
    },
    topPlayer: {
        top: 20,
    },
    leftPlayer: {
        left: 20,
    },
    rightPlayer: {
        right: 20,
    },
    bottomPlayer: {
        bottom: 20,
        alignItems: 'center',
    },
    playerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    playerInfo: {
        fontSize: 12,
        color: 'white',
        marginTop: 5,
    },
    aiHand: {
        flexDirection: 'row',
        marginTop: 10,
    },
    aiCard: {
        width: 40,
        height: 60,
        backgroundColor: '#333',
        borderRadius: 4,
        margin: 2,
        borderWidth: 1,
        borderColor: '#666',
    },
    cardCount: {
        color: 'white',
        fontSize: 12,
        marginLeft: 5,
        alignSelf: 'center',
    },
    centerArea: {
        alignItems: 'center',
    },
    phaseText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    trickArea: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    trickCard: {
        width: 50,
        height: 75,
        backgroundColor: 'white',
        borderRadius: 6,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#333',
    },
    trickCardText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    biddingArea: {
        alignItems: 'center',
        marginTop: 20,
    },
    bidPrompt: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
    },
    bidButtons: {
        flexDirection: 'row',
    },
    bidButton: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderWidth: 2,
        borderColor: '#333',
    },
    bidButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});