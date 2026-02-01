export default function CountChanger(){
  const range = document.querySelector('.count-changer');
  const percent = (range.value - range.min) / (range.max - range.min) * 100 + '%';
  range.style.setProperty('--value', percent);
}