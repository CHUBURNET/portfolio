import React from 'react';

interface IProps {
    value: string;
    onClick?: () => void;
    width?: string;
    height?: string;
    color?: string;
    bgColor?: string;
}

const Key: React.FC<IProps> = ({value, onClick= () => {}, width="35px", height="35px", color="#fff", bgColor="#000"}) => {
    return (
        <div
            onClick={onClick}
            style={{
                cursor: "pointer",
                width: `${width}`,
                height: `${height}`,
                backgroundColor: bgColor,
                color: color,
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
            }}
        >
            {value}
        </div>
    );
};

export default Key;