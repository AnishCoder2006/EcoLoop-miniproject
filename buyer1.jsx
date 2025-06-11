import React from 'react'
import filter from './filter.jpg';
import './buyer1.css';

export const Buyer1 = () => {
    const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <div>
        <h1>
            Refurbished Products MarketPlace
        </h1>
        <input type="search" placeholder="Search..." className="search-bar" />
        <button>Search</button>
           <img
                            src={filter}
                            alt="filter"
                            className="logo"
                            onClick={() => setShowDropdown(!showDropdown)}
                        />
                        {showDropdown && (
                            <select className="dropdown">
                                <option value="option1">Brand</option>
                                <option value="option2">Location</option>
                                <option value="option3">Latest</option>
                                <option value="option4">Oldest</option>
                            </select>
                        )}
    </div>
  )
}
