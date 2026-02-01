import {useEffect} from 'react';
import ThemeSelect from './ThemeSelector';
import './StartPage.css';
import CountChanger from './CountChanger';

export default function StartPage({onGameRegime, gameRegime, onTimeMode, timeMode, onHPMode, hpMode, gameStart, pairsCount, setPairsCount, gameTheme, setGameTheme}){
  useEffect(() => {CountChanger()})
  const pics = () => {onGameRegime('pics')}
  const ru = () => {onGameRegime('ru')}
  const eng = () => {onGameRegime('eng')}

  const toggleRedMode = () => {onHPMode(false); onTimeMode(false)};
  const toggleYellowMode = () => {onHPMode(true); onTimeMode(false)};
  const toggleGreenMode = () => {onHPMode(true); onTimeMode(true)};

  const newPairsCount = (e) => {setPairsCount(Number(e.target.value));}

  return(
    <section className="start-page">
      <h1>{`${(gameRegime==='ru') ? 'Настройки игры' : 'Settings of the game'} HEBL`}</h1>
      <div className='sp-container'>
      <div>
      <ThemeSelect value={gameTheme} onChange={setGameTheme} gameRegime={gameRegime}/>
      <div className='game-class-buttons'>
        <button className='game-class-button start-page-button' onClick={pics}><img className={`${(gameRegime==='pics') ? 'game-class-button-active':''}`} src='img/interface/int.png' alt='pics'/></button>
        <button className='game-class-button start-page-button' onClick={ru}><img className={`${(gameRegime==='ru') ? 'game-class-button-active':''}`} src='img/interface/ru.png' alt='ru'/></button>
        <button className='game-class-button start-page-button' onClick={eng}><img className={`${(gameRegime==='eng') ? 'game-class-button-active':''}`} src='img/interface/en.png' alt='en'/></button>
      </div>
      <div className='game-mode-buttons'>
        <button className='game-mode-button start-page-button' onClick={toggleRedMode}  style={{background:`${hpMode?'#f08080':'#7fffd4'}`, transition: '0.4s'}}>
          <p>{`${(gameRegime==='ru') ? 'Новые слова' : 'New words'}`}</p>
        </button>
        <button className='game-mode-button start-page-button' onClick={toggleYellowMode}  style={{background:`${hpMode&!timeMode?'#7fffd4':'#f08080'}`, transition: '0.4s'}}>
          <p>{`${(gameRegime==='ru') ? 'Запоминание' : 'Memorizing'}`}</p>
        </button>      
        <button className='game-mode-button start-page-button' onClick={toggleGreenMode}  style={{background:`${timeMode?'#7fffd4':'#f08080'}`, transition: '0.4s'}}>
          <p>{`${(gameRegime==='ru') ? 'Подтверждение' : 'Confirmation'}`}</p>
        </button>
      </div>
      <label className='count-changer-label'> 
        {`${(gameRegime==='ru') ? 'Кол-во слов' : 'Words count'}`}
        <input type="range" min="3" max="8" step="1" className="count-changer" value={pairsCount} onChange={newPairsCount}/>
        <p>{pairsCount}</p>
      </label>
      </div>
      </div>
      <button className='game-start-button' onClick={gameStart}>{`${(gameRegime==='ru') ? 'Старт' : 'Start'}`}</button>
    </section>
  )
}