import { useState } from "react"

const useArray = <T>(persons: T[]) => {
    const [value, setValue] = useState(persons)
    const add = (person: T) => {
        setValue([...value, person])
    }
    const removeIndex = (index: number) => {
        value.splice(index, 1)
        setValue([...value])
    }
    const clear = () => {
        setValue([])
    }

    return {
        value,
        add,
        removeIndex,
        clear
    }
}

export default useArray