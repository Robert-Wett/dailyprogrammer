const takeTurn = (hand, moves) => {
    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];
        if (card === '1') {
            moves += `${i}`;
            hand[i] = '.';
            hand = flipNeighborCards(hand, i);
        }
    }
    return { hand, moves };
}

const flipNeighborCards = (hand, idx) => {
    // 0 is all the way at the left already
    if (idx && hand[idx-1] !== '.') {
        let card = hand[idx-1];
        if (card !== '.') {
            hand[idx-1] = card === '1' ? '0' : '1';
        }
    }

    if (hand.length - 1 > idx && hand[idx+1] !== '.') {
        let card = hand[idx+1];
        if (card !== '.') {
            hand[idx+1] = card === '1' ? '0' : '1';
        }
    }

    return hand;
}

const checkHand = handStr => {
    let hand = handStr.split(''),
        moves = '';

    for (let i = 0; i < 1000000; i++) {
        ({ hand, moves } = takeTurn(hand, moves));
        if (!hand.filter(card => card !== '.').length) {
            return moves.split('').join(', ');
        }
    }

    return 'Not possible';
}

console.log(checkHand('0100110'));
console.log(checkHand('01001100111'));
console.log(checkHand('100001100101000'));
console.log(checkHand('010111111111100100101000100110111000101111001001011011000011000'));