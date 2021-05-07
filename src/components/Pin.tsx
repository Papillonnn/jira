import React from 'react';
import { Rate } from 'antd';

interface PinPorps extends React.ComponentProps<typeof Rate> {
    checked: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

const Pin: React.FC<PinPorps> = (props) => {
    const { checked, onCheckedChange, ...restProps} = props
    return (
        <Rate
            count={1}
            value={checked ? 1 : 0}
            onChange={value => onCheckedChange?.(!!value)}
            {...restProps}
        />
    )
}

export default Pin