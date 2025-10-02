export interface GameState {
    players: Player[];
    currentPlayer: number;
    phase: 'bidding' | 'playing' | 'scoring';
    currentTrick: Card[];
    bid: number;
    tricks: number;
    scores: number[];
}

export interface Player {
    id: string;
    name: string;
    hand: Card[];
    bid: number;
    tricks: number;
}