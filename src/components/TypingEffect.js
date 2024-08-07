import { useEffect, useState } from "react"

function TypingEffect() {
    const fullText = 'Магазин найкращих кросівок'
    const [index, setIndex] = useState(1)
    const [text, setText] = useState(fullText[0])

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setText((prev) => prev + fullText[index]);
                setIndex((prev) => prev + 1);
            }, 150)
            return () => clearTimeout(timeout)
        }
    }, [index, fullText])

    return <p className="opacity-5">{text}</p>
}

export default TypingEffect