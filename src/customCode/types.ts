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