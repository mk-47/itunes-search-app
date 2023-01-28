import React, { useState, useEffect } from 'react';


const FilterComponent = ({ originalResponse, setFilteredResponse }) => {

    const [minRange, setMinRange] = useState(0);
    const [maxRange, setMaxRange] = useState(50);
    const [genreList, setGenreList] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        let max = 0;
        const genre = new Set();
        originalResponse.forEach(element => {
            max = Math.max(max, element.trackPrice || 0);
            genre.add(element.primaryGenreName)
        });

        setGenreList([...genre]);
        setMaxRange(max);

    }, [originalResponse]);

    useEffect(() => {
        if (selectedGenre !== 'all') {
            const filteredData = originalResponse.filter((item) => item.primaryGenreName === selectedGenre);
            setFilteredResponse(filteredData);
        } else {
            setFilteredResponse(originalResponse);
        }
    }, [selectedGenre, originalResponse]);

    useEffect(() => {
        if (minRange > maxRange) {
            setMinRange(0);
            setFilteredResponse(originalResponse);
        } else {
            const filteredData = originalResponse.filter((item) => item.trackPrice >= minRange & item.trackPrice <= maxRange);
            setFilteredResponse(filteredData);
        }
    }, [minRange, maxRange, originalResponse]);

    return (
        <div className="filter-container">
            <div>
                Genre filter
                <div>
                    <select
                        className="select-box"
                        value={selectedGenre}
                        onChange={(e) => {
                            setSelectedGenre(e.target.value)
                        }}
                    >
                        <option selected value="all"> -- select a genre -- </option>
                        {genreList.map(item => <option value={item}>{item}</option>)}
                    </select>
                </div>

            </div>
            <div>
                Price filter
                <div>Min<input type="range" value={minRange} onChange={(e) => setMinRange(e.target.value)} step={0.2} />{minRange}</div>
                <div>Max<input type="range" value={maxRange} onChange={(e) => setMaxRange(e.target.value)} step={0.2} />{maxRange}</div>
            </div>

        </div>
    )
}

export default FilterComponent;