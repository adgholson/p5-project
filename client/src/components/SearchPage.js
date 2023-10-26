import React from "react";
import VideoBackground from "./VideoBackground";
import './SearchPage.css';

function SearchPage() {

  return (
    <div className="search-page">
      <VideoBackground/>
      <div className="search-container">
        <h1 className="search-form-title">search</h1>
      </div>
    </div>
  );
};

export default SearchPage;
