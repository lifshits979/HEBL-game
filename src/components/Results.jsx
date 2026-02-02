import './Results.css'
export default function Results({stepsCount, restartGame, restartTheGame, isWin, finishedCards, pairsCount}){
    const victoryScreen = 
      <section className='results'>
        <h1>Поздравляем!</h1> <p> Вы закончили уровень из {pairsCount} слов за {stepsCount} шагов!</p>
        <button className='results-button' onClick={restartGame}>Вернуться в меню</button>
      </section>  
    const defeatScreen = 
      <section className='results'>
        <h1>Почти! </h1>
        <p>Отгадано {finishedCards.length/2} слов из {pairsCount}. Попытаться снова?</p>
        <button className='results-button' onClick={restartTheGame}>Перезапуск игры</button>
        <button  className='results-button' onClick={restartGame}>Вернуться в меню</button>
      </section>
    const ResultsContent = () => {
      switch (isWin){
        case true: return (<div>{victoryScreen}</div>)
        case false: return (<div>{defeatScreen}</div>)
      default: return(null)
      }
    }
    return(
      <div className='x-Results'>
        {ResultsContent()}
      </div>
    )
  }