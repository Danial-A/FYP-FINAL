import React from 'react'

function OutputSection(props) {
    var combinedCode = props.htmlCode+props.cssCode+props.jsCode
    const [key,setkey] = React.useState(0)
    setInterval(() => {
        setkey(key+1)
    }, 3000);
    return (
        <>
            <iframe srcDoc={combinedCode} frameborder="0" width = "100%" height = "100%"></iframe>
        </>
    )
}

export default OutputSection
