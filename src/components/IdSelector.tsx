import React from 'react';
import { Raw } from 'extraTypes';
import { Select } from 'antd';

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectorProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
    value: Raw | undefined | null;
    onChange: (value?: number) => void;
    defaultOptionName?: string;
    options?: { name: string, id: number }[]
}

const IdSelector: React.FC<IdSelectorProps> = (props) => {
    const { value, onChange, options, defaultOptionName, ...restProps} = props
    return (
        <Select
            value={toNumber(value)}
            onChange={value => onChange(toNumber(value))}
            {...restProps}
        >
            {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
            {options?.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
        </Select>
    )
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)

export default IdSelector