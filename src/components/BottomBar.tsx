import "../css/BottomBar.css"
type Props = {
    icon : JSX.Element,
    text : String,
    classStyle : String,
    handleClick: () => void
}

const BottomBar = ({icon, text, classStyle, handleClick}:Props) => {
  return (
    <div className={`btm-icon-text ${classStyle}`} onClick={handleClick}>
        <div>{icon}</div>
        <p>{text}</p>
    </div>
  )
}

export default BottomBar