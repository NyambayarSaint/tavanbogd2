const splitText = (text) => {
    if (!text.includes('|')) return [text];
    return text.split('|');
}

export default splitText;