type searchProp = {
    placehold: String
}

const SearchBar = ({placehold}:searchProp) => {
  return (
    <div className="note-inp-cont">
        <div className="note-inp"><input type="text" placeholder={placehold.toString()} name="q"/></div>
    </div>
  )
}

export default SearchBar