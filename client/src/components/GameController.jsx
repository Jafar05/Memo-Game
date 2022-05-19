import React, {useState} from 'react';
import images from '../images'
import { shuffle } from 'lodash'

const GameController = () => {
    const [cards, setCards] = useState(shuffle([...images, ...images]))
    const [clicks, setClicks] = useState(0)
    const [won, setWon] = useState(false)
    const [activeCards, setActiveCards] = useState([])
    const [foundPairs, setFoundPairs] = useState([])

    function flipCard(index) {
        if(won) {
            setCards(shuffle([...images, ...images]))
            setFoundPairs([])
            setWon(false)
            setClicks(0)
        }


        if(activeCards.length === 0) {
            setActiveCards([index])
        }
        if(activeCards.length === 1) {
            const firstIndex = activeCards[0]
            const secondIndex = index
            if(cards[firstIndex] === cards[secondIndex]) {
                if(foundPairs.length + 2 === cards.length) {
                    setWon(true)
                }
                setFoundPairs([...foundPairs, firstIndex, secondIndex])
            }
            setActiveCards([...activeCards, index])
        }
        if(activeCards.length === 2) {
            setActiveCards([index])
        }
        setClicks(clicks + 1)
    }

    return (
        <div>
            <div className="board">
                {cards.map((card, index) => {
                    const flippedFront = activeCards.indexOf(index) !== -1 || foundPairs.indexOf(index) !== -1;
                    return (
                        <div className={"card-outer " + (flippedFront ? 'flipped' : "" )}  onClick={() => flipCard(index)}>
                            <div className="card">
                                <div className="front">
                                    <img src={card} alt=""/>
                                </div>
                                <div className="back"></div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="stats">
                {won && (
                    <>Ты выйграл игру! Поздравляю!!! <br/></>
                )}
               Click: {clicks} &nbsp; Found pairs: {foundPairs.length / 2}
            </div>
        </div>
    );
};

export default GameController;
