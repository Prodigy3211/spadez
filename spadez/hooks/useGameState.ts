import {useState, useEffect} from 'react';

export interface Card {
    id: string;
    suit: string;
    rank: string;
}

export interface PlayedCard extends Card{
    playerIndex: number;
}

export interface GameState {
    players: Player[];
    currentPlayer: number;
    phase: 'bidding' | 'playing' | 'scoring';
    currentTrick: PlayedCard[];
    deck: Card[];
    roundNumber: number;
    scores: number[];
    gameOver: boolean;
}

export interface Player {
    id: string;
    name: string;
    hand: Card[];
    bid: number;
    tricks: number;
    isHuman: boolean;
}


export function useGameState () {
    const [gameState, setGameState] = useState<GameState>({
        players: [],
        currentPlayer: 0,
        phase: 'bidding',
        currentTrick: [],
        deck: [],
        roundNumber: 1,
        scores: [0,0],
        gameOver: false,
    });

    //Start a game with 4 players (1 human 3 AI)
    const initializeGame = () => {
        const players: Player[] = [
            {id: 'player', name: 'You', hand: [], bid: 0, tricks: 0, isHuman: true},
            {id: 'ai1', name: 'Teet', hand: [], bid: 0, tricks: 0, isHuman: false},
            {id: 'ai2', name: 'Nova', hand: [], bid: 0, tricks: 0, isHuman: false},
            {id: 'ai3', name: 'Beans', hand: [], bid: 0, tricks: 0, isHuman: false},
        ];

        const deck = createAndShuffleDeck();
        const dealtHands = dealCards (deck);

        setGameState({
            players: players.map((player, index) => ({
                ...player,
                hand: dealtHands[index],
            })),
            currentPlayer: 0,
            phase: 'bidding',
            currentTrick: [],
            deck,
            roundNumber: 1,
            scores: [0,0],
            gameOver: false,
        });
    };

    //Create the deck then shuffle

    const createAndShuffleDeck = (): Card[] => {
        const suits = ['spade', 'heart', 'club', 'diamond'];
        const ranks = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'];
        const jokers = [
            {id: 'S-15', suit: 'spade', rank: 'BigJoker'},
            {id: 'S-14', suit: 'spade', rank: 'LittleJoker'}
        ];

        const deck : Card[] = [];

        suits.forEach(suit => {
            ranks.forEach((rank, index) => {
                deck.push({
                    id: `${suit.charAt(0).toUpperCase()}-${index + 1}`,
                    suit,
                    rank
                });
            });
        });
        
        deck.push(...jokers);

        // shuffle deck
        for (let i = deck.length - 1; i > 0 ; i--){
            const j = Math.floor(Math.random() * (i +1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    };

    //Deal Cards

    const dealCards = (deck: Card []): Card[][] => {
        const hands: Card [][] = [[], [], [],[]];

        for (let i = 0; i < 52; i++) {
            hands[i % 4].push(deck[i]);
        }
        return hands;
    };

    //Player Bidding

    const makeBid = (playerIndex: number, bid:  number) => {
        setGameState(prev => {
            const newPlayers = [...prev.players];
            newPlayers[playerIndex].bid = bid;

            //Check if all players have made a bid

            const allBidsIn = newPlayers.every(player => player.bid > 0);

            return {
                ...prev,
                players: newPlayers,
                phase: allBidsIn ? 'playing' : 'bidding',
                currentPlayer: allBidsIn ? 0 : (playerIndex + 1) % 4,
            };
        });
    };

    //play card

    const playCard = (playerIndex: number, card: Card) => {
        setGameState(prev => {
            const newPlayers = [...prev.players];
            const newCurrentTrick = [...prev.currentTrick];

            //Remove card from the player's hand
            newPlayers[playerIndex].hand = newPlayers[playerIndex].hand.filter(c => c.id !== card.id);
            
            //add card to the trick on the table
            newCurrentTrick.push({ ...card, playerIndex});

            if (newCurrentTrick.length === 4) {
                const winner = determineTrickWinner(newCurrentTrick);
                newPlayers[winner].tricks++;

                return {
                    ...prev,
                    players: newPlayers,
                    currentPlayer: winner,
                    currentTrick: [],
                    phase: newPlayers[0].hand.length === 0 ? 'scoring' : 'playing'
                };
            } else {
                return {
                    ...prev,
                    players: newPlayers,
                    currentPlayer: (playerIndex + 1) % 4,
                    currentTrick: newCurrentTrick
                };
            }
            
        });
    };

    //Who wins the trick

    const determineTrickWinner = (trick: PlayedCard[]): number => {
        return trick [0].playerIndex || 0;
    };

    //Ai bidding

    const aiBid = (playerIndex: number) => {
        const player = gameState.players[playerIndex];
        const spadeCount = player.hand.filter(card => card.suit === 'spade').length
        const highCards = player.hand.filter(card =>
        ['Ace', 'King', 'Queen']. includes(card.rank)
        ).length;
        const bid = Math.min(4, Math.floor(spadeCount / 3) + Math.floor(highCards / 2));
        makeBid(playerIndex, bid);
    };

    //Ai Playing strat
    const aiPlayCard = (playerIndex: number) => {
        const player = gameState.players[playerIndex];
        const availableCards = player.hand;

        //Easy mode - Play first card avaialble
        if (availableCards.length > 0) {
            const cardToPlay = availableCards[0];
            playCard(playerIndex, cardToPlay);
        }
    };

    return {
        gameState,
        initializeGame,
        makeBid,
        playCard,
        aiBid,
        aiPlayCard,
    };

}
