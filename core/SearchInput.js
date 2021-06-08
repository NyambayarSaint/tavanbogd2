import { useRouter } from 'next/router';
import React from 'react';
import { BsSearch } from 'react-icons/bs';

const SearchInput = ({ action, menuOpen, setMenuOpen }) => {

    const R = useRouter();
    const input = React.useRef();

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            R.push(`/p/search?q=${e.target.value}`);
            if(action) setMenuOpen(!menuOpen);
        }
    }

    const handleClickIcon = () => {
        if (input.current.value) {
            R.push(`/p/search?q=${input.current.value}`);
            if(action) setMenuOpen(!menuOpen);
        }
    }

    return (
        <>
            <input ref={input} onKeyDown={handleSearch} type="text" id="search" name="search" placeholder="Хайлт... / Search..." />
            <BsSearch onClick={handleClickIcon} size={16} />
        </>
    );
};

export default SearchInput;