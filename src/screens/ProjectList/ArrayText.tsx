import React from 'react';
import useArray from './useArray';
// import { useMount } from 'utils';

export interface PersonProps {
    name: string;
    age: number;
}

const ArrayTest = () => {
    const persons: PersonProps[] = [
        {name: 'jack', age: 25},
        {name: 'ma', age: 22},
    ]

    const { value, clear, removeIndex, add } = useArray(persons)

    // useMount(() => {
    //     console.log(value.notExist)
    //     add({ name: 'david' })
    //     removeIndex('123')
    // })
    return (
        <div>
            <button onClick={() => add({name: 'john', age: 22})}>add Jhon</button>
            <button onClick={() => removeIndex(0)}>removeIndex 0</button>
            <button onClick={() => clear()}>clear</button>
            {value.map((person, index) => (
                <div key={index}>
                    <span style={{color: 'red'}}>{index}</span>
                    <span>{person.name}</span>
                    <span>{person.age}</span>
                </div>
            ))}
        </div>
    )
}

export default ArrayTest