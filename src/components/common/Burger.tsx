

type BurgerType = {
  onClick: () => void
}

const Burger = ({onClick} : BurgerType) => {
  return (
    <div className="w-10 p-2 cursor-pointer" onClick={onClick}>
      <div className="burger-line mb-[6]"></div>
      <div className="burger-line mb-[6]"></div>
      <div className="burger-line"></div>
    </div>
  )
}
export default Burger