const Cell = ({filled,onClick,isDisabled})=>{
    return <button type="button" disabled={isDisabled} onClick={onClick} className={filled?"cell cell-activated":"cell"}/>
}

export default Cell