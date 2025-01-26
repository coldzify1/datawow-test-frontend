
type IconProps = {
  direction?: 'up' | 'down'
  color?: 'black' | 'green'
}
const IconChevron = ({direction = 'down',color = 'black'}: IconProps) => {
  return (
    <div className="flex items-center justify-center w-5 h-5">
      <img 
        className={`icon-chevron ${direction}`} 
        src={color === 'black' ? "/images/icon-chevron-down.png" : "/images/icon-chevron-down-green.png"} 
      />
    </div>
  )

}
export default IconChevron;