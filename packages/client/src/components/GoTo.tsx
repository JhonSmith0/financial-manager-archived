import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function GoTo(props: { path: string }) {
    const nav = useNavigate()
    useEffect(() => {
        nav(props.path)
    }, [props.path])

    return <></>
}
