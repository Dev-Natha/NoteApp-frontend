import "../css/BottomBar.css"
import { Props } from "../customCode/types"
const BottomBar = ({icon, text, classStyle, handleClick}:Props) => {
  return (
    <div className={`btm-icon-text ${classStyle}`} onClick={handleClick}>
        <div>{icon}</div>
        <p>{text}</p>
    </div>
  )
}

export default BottomBar