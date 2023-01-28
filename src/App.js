import React, { useEffect, useState, useRef } from "react";
import Table from './components/table';
import FilterComponent from "./components/filter-component";
import millisToMinutesAndSeconds from './utils/helper-functions'
import useDebounceValue from "./utils/debounceHook";
import "./index.css";


export default function App() {
  const [value, setValue] = useState("");
  const [originalResponse, setOriginalResponse] = useState([]);
  const [filteredResponse, setFilteredResponse] = useState([]);
  const [loading, setLoading] = useState(false);


  const audioElement = useRef();
  const debounceQuery = useDebounceValue(value);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Artwork',
        accessor: 'artworkUrl100',
        // display album image
        Cell: ({ value, row }) => {
          return (
            <a href={row.original.collectionViewUrl}>
              <img
                className="artwork-image"
                height="160px"
                width="160px"
                alt="album-art"
                src={value} />
            </a>);
        },
      },
      {
        Header: 'Artist Name',
        accessor: 'artistName',
        Cell: ({ value }) => (
          <div
            className="center"
            style={{ "width": "260px" }}>
            {value}
          </div>)
      },
      {
        Header: 'Track Name',
        accessor: 'trackName',
        Cell: ({ value }) => (
          <div
            className="center"
            style={{ "width": "260px" }}>
            {value}
          </div>
        ),
      },
      {
        Header: 'Track Details',
        accessor: 'primaryGenreName',
        // display album details
        Cell: ({ value, row }) => (
          <div className="center">
            <div>{value}</div>
            <div>{millisToMinutesAndSeconds(row.original.trackTimeMillis)}</div>
            <div>{new Date(row.original.releaseDate).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}</div>
          </div>
        ),
      },
      {
        Header: 'Preview',
        accessor: 'previewUrl',
        // to display audio player with controls
        Cell: ({ value }) => (
          <audio ref={audioElement} controls>
            <source src={value}></source>
          </audio>)
      },
      {
        Header: 'Price',
        accessor: 'trackPrice',
        Cell: ({ value, row }) => (
          <div
            className="center"
            style={{ "width": "100px" }}>
            {value} {row.original.currency}
          </div>),
      }
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      if (debounceQuery.length > 0) {
        setLoading(true);

        const response = await fetch(
          `https://itunes.apple.com/search?term=${debounceQuery}`
        );
        const json = await response.json();
        setOriginalResponse(json.results);
        setFilteredResponse(json.results);
        setLoading(false);

      }
    };
    fetchData();
  }, [debounceQuery]);


  return (
    <div className="App">
      <div className="header">iTunes Search Engine</div>
      <div className="input-icons">
        <i class="fa fa-search icon" aria-hidden="true"></i>
        <input
          className="input-box"
          placeholder="Search Artist, Album or Song"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {
        filteredResponse.length ?
          <div className="container">
            <FilterComponent originalResponse={originalResponse} setFilteredResponse={setFilteredResponse} />
            {
              loading ? <div className="loading-container">Loading....</div> :
                <div className="table-container">
                  <Table
                    columns={columns}
                    data={filteredResponse}
                  />
                </div>
            }
          </div> :
          <React.Fragment />
      }
    </div>
  );
}