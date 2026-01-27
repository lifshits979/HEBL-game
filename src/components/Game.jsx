import Results from './Results'
import Card from './Card'
import HP from './HP'
import Timer from './Timer'
import './Game.css'

export default function Game({isEnded,setIsEnded, restartGame, restartTheGame, isWin, cardArray, gameRegime, checkItems, pairsCount, finishedCards, chosenCards, onChosenCards, stepsCount, isWrong, setIsWrong, mistakesCount, time, setTime, timeMode, hpMode, setIsWin}){
const handleCardClick = (id, type) => {
    switch (chosenCards.length){
      case 0: onChosenCards([id, type]); break;
      case 2: onChosenCards((items) => [...items, id, type]); 
        checkItems(chosenCards[0], chosenCards[1], id, type); break;
      default: onChosenCards([]); break;
    }
  }
  const cards = cardArray.map((item) => (
    <Card
      gameRegime={gameRegime}
      item = {item}
      onCardClick={handleCardClick}
      isChosen ={chosenCards.includes(item.id)}
      isFinished ={finishedCards.includes(item.id)}
      isWrong={isWrong}
      setIsWrong={setIsWrong}
    />
  ));

  return (
    <section className="game">
      {isEnded && <Results stepsCount={stepsCount} finishedCards={finishedCards} pairsCount={pairsCount} restartGame={restartGame} restartTheGame={restartTheGame} isWin={isWin}/>}
      <div className='div-gamestats'>
      <p className='gamestats'>Отгадано: {finishedCards.length/2}</p>
      {hpMode && <HP mistakesCount={mistakesCount} pairsCount={pairsCount}/>}
      {timeMode && <Timer time={time} setTime={setTime} pairsCount={pairsCount} setIsWin={setIsWin} setIsEnded={setIsEnded} isEnded={isEnded}/>}
      <p className='gamestats'>Шагов: {stepsCount}</p>
      </div>
      <ul className="cards">
        {cards}
      </ul>
    </section>
  );
}