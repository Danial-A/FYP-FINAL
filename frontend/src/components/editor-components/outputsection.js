import React from 'react'

function OutputSection(props) {
    var combinedCode = props.htmlCode+props.cssCode+props.jsCode
    const [key,setkey] = React.useState(0)
    setInterval(() => {
        setkey(key+1)
    }, 3000);
    return (
        <div>
            <iframe srcDoc={combinedCode} frameborder="0" ></iframe>
        </div>
    )
}

export default OutputSection
