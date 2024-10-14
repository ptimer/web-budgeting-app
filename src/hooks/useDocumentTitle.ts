import { useEffect } from "react"

interface Props {
    title: string;
}

const useDocumentTitle = ({ title }: Props) => {
    useEffect(() => {
        document.title = title;
    }, [])
}

export default useDocumentTitle