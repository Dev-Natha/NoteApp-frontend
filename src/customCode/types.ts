export type noteData = {
    id: Number,
    title: String,
    body: String,
    created: String,
    updated: String
  }

export type Props = {
    icon : JSX.Element,
    text : String,
    classStyle : String,
    handleClick: () => void
}

export type noteProps = {
  notes : noteData[]

}

export type singleNoteData = {
  title : string | undefined
  body: string | undefined
}

export type fetchNoteProps = {
  fetchData: () => void
}