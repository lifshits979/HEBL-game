import './Card.css'
export default function Card({gameRegime, item, onCardClick, isChosen, isFinished, isWrong, setIsWrong}) {
  const {id, url, ru, en, heb, type} = item;
  const content = type === 'notHeb' ? 
    (gameRegime==='pics'? <picture> <sourse srcset={url} type="image/webp" alt={en}/> </picture>:
    (gameRegime==='ru'?<span>{ru}</span>:<span>{en}</span>)) : <span>{heb}</span>;
  const handleClick = () => {if (!isFinished&&!isChosen) 
    {onCardClick(id, type)}; setTimeout(() => setIsWrong(array => array.filter(cardId => cardId !== id)), 1000)}
  const className =`card ${isChosen? 'chosen-card':''} ${isFinished? 'finished-card' :''} ${isWrong.includes(id)?'wrong-choice':''}
        ${type === 'notHeb' ? 'non-heb' : 'heb'}`
  return (
    <li className={className} onClick={handleClick}>
        {content}
     </li>
  )
}