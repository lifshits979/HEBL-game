import {useState, useEffect} from 'react';
import './App.css';
import Game from './components/Game'
import StartPage from './components/StartPage'

function App({cardArray, shuffle}){
  const [gameState, setGameState] = useState('StartPage');
  const [gameRegime, setGameRegime] = useState('pics');
  const [gameTheme, setGameTheme] = useState('no-theme')

  const [pairsCount, setPairsCount] = useState(6)
  const [finishedCards, setFinishedCards] = useState([])
  const [chosenCards, setChosenCards] = useState([])
  const [isWrong, setIsWrong] = useState([])
  const [stepsCount, setStepsCount] = useState(0)
  const [mistakesCount, setMistakesCount] = useState(0)
  const [time, setTime] = useState(NaN);

  const [isEnded, setIsEnded] = useState(false)
  const [isWin, setIsWin] = useState(false)

  const getTheme = (cards, theme) => {
    if (theme === 'no-theme') return cards;
    return cards.filter(card => card.theme === theme);
  };

  const getPairedCards = (cards) => {
    const notHebX = new Map(
      cards.filter(card => card.type === 'notHeb').map(card => [card.id, card]));

    return cards.filter(card => card.type === 'heb').map(card => {
      const clisedId = card.id.slice(0, -1); 
      const pair = notHebX.get(clisedId);
      return (pair ? [card, pair] : null);
    })
    .filter(Boolean);
  };

  const getRandomPairedCards = (cards, count) => {
    const pairs = getPairedCards(cards);
    const selectedPairs = shuffle(pairs).slice(0, count);
    return shuffle(selectedPairs.flat());
  };

  const [gameCards, setGameCards] = useState(['smthng']);
  const gameStart = () => {
    const themedCards = getTheme(cardArray, gameTheme); 
    const cards = getRandomPairedCards(themedCards, pairsCount);  
    setGameCards(cards); 
    setGameState('Game')
  }

  useEffect(() => {
    if (finishedCards.length === gameCards.length){setIsWin(true); setTimeout(() => {setIsEnded(true)}, 1000)}
    if (mistakesCount>=(Math.floor(pairsCount/3)) && hpMode){setIsWin(false); setTimeout(() => {setIsEnded(true)}, 1000)}
  }, [mistakesCount, finishedCards]);
    
  const checkItems = (firstItem, firstItemType, secondItem, secondItemType) => {
    if (firstItemType!==secondItemType){
      setStepsCount(stepsCount => stepsCount+1)
      if (firstItem+'h' === secondItem || firstItem === secondItem+'h'){
        setFinishedCards((items) => [...items, firstItem, secondItem]);
        } else {setIsWrong([firstItem, secondItem]); setMistakesCount(mistakesCount => mistakesCount+1);}
      setTimeout(() => {setChosenCards([]); }, 500); 
    } 
    else{setChosenCards([secondItem, secondItemType])}
  }

  const restart = () => {
    setFinishedCards([]);
    setChosenCards([]);
    setStepsCount(0);
    setMistakesCount(0);
    setIsWrong([]);
    setTime(pairsCount*5);
    setIsEnded(false)
  }

  const restartTheGame = () => {
    restart();
    setGameState('Game');
  }

  const restartGame = () => {
    restart();
    setGameState('StartPage');
  };

  const [timeMode, setTimeMode] = useState(false)
  const [hpMode, setHPMode] = useState(false)

  const currentState = () => {
    switch(gameState){
      case 'Game': return(<Game isEnded={isEnded} setIsEnded={setIsEnded} cardArray={gameCards} gameRegime={gameRegime} checkItems={checkItems} stepsCount={stepsCount} mistakesCount={mistakesCount}
                          time={time} setTime={setTime} finishedCards={finishedCards} chosenCards={chosenCards} onChosenCards={setChosenCards} isWrong={isWrong} setIsWrong={setIsWrong}
                          timeMode={timeMode} hpMode={hpMode} pairsCount={pairsCount} setIsWin={setIsWin} restartGame={restartGame} restartTheGame={restartTheGame} isWin={isWin}/>)
      case 'StartPage': return(<StartPage onGameRegime={setGameRegime} gameRegime={gameRegime} onTimeMode={setTimeMode} timeMode={timeMode} 
                                onHPMode={setHPMode} hpMode={hpMode} pairsCount={pairsCount} setPairsCount={setPairsCount} gameStart={gameStart}
                                gameTheme={gameTheme} setGameTheme={setGameTheme}/>)
      default: return(null)
    }
  }
  return (
    <section className={`x-${gameState}`}>
      {currentState()}
    </section>
  )
}
export default App;


function fitText(el, min = 10) {
  let size = parseFloat(getComputedStyle(el).fontSize);
  while (el.scrollWidth > el.clientWidth && size > min) {
    size -= 1;
    el.style.fontSize = size + 'px';
  }
}
document.querySelectorAll('.card span').forEach(fitText);


