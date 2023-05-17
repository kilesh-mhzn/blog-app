import React, { useRef } from "react"
import JoditEditor from "jodit-react"
const TextEditor = ({setContent, config}) => {
    const editor = useRef(null)


    return(
        <JoditEditor ref={editor} onChange={(content)=>setContent(content)} config={config}/>

    )

}
export default TextEditor