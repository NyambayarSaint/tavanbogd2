import React from 'react';
import minimize from './miscs/minimize';

const Image = ({ src, size }) => {
    const info = minimize(src, size, true);
    if (typeof info === "string") return <img src={info} />
    return <img src={info.url} alt={info.info.alternativeText} loading="lazy" />;
};

export default Image;