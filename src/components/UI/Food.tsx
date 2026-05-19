import React from 'react';

interface IProps {
    active: boolean;
}

const Food: React.FC<IProps> = ({active}) => {
    return (
        <div
            style={{
                width: `10px`,
                height: `10px`,
                borderRadius: `50%`,
                background: "var(--text2-console-c)",
                opacity: `${active ? 1 : 0.3}`,
            }}
        />
    );
};

export default Food;