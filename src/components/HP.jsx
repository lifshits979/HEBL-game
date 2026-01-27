import './HP & Timer.css'
export default function HP({mistakesCount, pairsCount}){
  return (
    <div className="HP-List gamestats">
      <p>HP:</p>
      {[...Array(Math.floor(pairsCount/3)).keys()].reverse().map((i) => (
        <img key={i} className='HP' src={i >= mistakesCount ? 'img/interface/HP.png':'img/interface/usedHP.png'} alt=''/>
      ))}
    </div>
  );
}