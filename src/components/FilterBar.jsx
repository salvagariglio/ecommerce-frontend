'use client';
import { useState, useRef, useEffect } from 'react';
import { FaSlidersH, FaSort, FaChevronDown, FaTimes } from 'react-icons/fa';

export default function FilterBar({
    categories = [],
    brands = [],
    priceRange = { min: 0, max: 0 },
    onFilterChange,
    onSortChange,
}) {
    const [localFilters, setLocalFilters] = useState({
        category: '',
        brand: '',
        priceMin: priceRange.min,
        priceMax: priceRange.max,
    });

    const [tempPrice, setTempPrice] = useState({
        priceMin: priceRange.min,
        priceMax: priceRange.max,
    });

    const [sort, setSort] = useState('');
    const [openPrice, setOpenPrice] = useState(false);
    const popRef = useRef(null);

    useEffect(() => {
        if (openPrice) {
            setTempPrice({
                priceMin: localFilters.priceMin,
                priceMax: localFilters.priceMax,
            });
        }
    }, [openPrice]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popRef.current && !popRef.current.contains(e.target)) {
                setOpenPrice(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const renderSelect = (label, key, options) => (
        <div className="relative">
            <select
                className="appearance-none border border-gray-300 rounded px-3 py-2 text-sm pr-8 focus:outline-none"
                value={localFilters[key]}
                onChange={e => setLocalFilters({ ...localFilters, [key]: e.target.value })}
            >
                <option value="">{label}</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            <FaChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
    );

    const handleSort = v => {
        setSort(v);
        onSortChange?.(v);
    };

    const applyPrice = () => {
        setLocalFilters({ ...localFilters, ...tempPrice });
        setOpenPrice(false);
    };

    const cancelPrice = () => {
        setOpenPrice(false);
    };

    const applyAll = () => {
        onFilterChange?.(localFilters);
    };

    return (
        <div className="relative flex flex-wrap items-center gap-2 bg-white p-4 shadow rounded mb-6">

            <FaSlidersH className="text-gray-600 text-xl" />

            {renderSelect('CATEGORY', 'category', categories)}
            {brands.length > 0 && renderSelect('BRAND', 'brand', brands)}

            <div className="relative" ref={popRef}>
                <button
                    type="button"
                    onClick={() => setOpenPrice(o => !o)}
                    className="flex items-center border border-gray-300 rounded px-3 py-2 text-sm hover:bg-gray-100"
                >
                    PRICE
                    <FaChevronDown className="ml-2 text-gray-500" />
                </button>

                {openPrice && (
                    <div className="absolute mt-2 w-72 bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-10">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="text-base font-semibold">PRICE RANGE</h4>
                            <button onClick={() => setOpenPrice(false)}>
                                <FaTimes className="text-gray-500 hover:text-gray-700" />
                            </button>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-700 mb-1">
                                <span>${tempPrice.priceMin}</span>
                                <span>${tempPrice.priceMax}</span>
                            </div>

                            <div className="relative h-3">
                                <div className="absolute inset-0 h-1 bg-gray-200 rounded" />
                                <div
                                    className="absolute h-1 bg-blue-600 rounded"
                                    style={{
                                        left: `${((tempPrice.priceMin - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%`,
                                        right: `${100 - ((tempPrice.priceMax - priceRange.min) / (priceRange.max - priceRange.min)) * 100}%`,
                                    }}
                                />
                                <input
                                    type="range"
                                    min={priceRange.min}
                                    max={priceRange.max}
                                    value={tempPrice.priceMin}
                                    onChange={e => setTempPrice({
                                        ...tempPrice,
                                        priceMin: Math.min(Number(e.target.value), tempPrice.priceMax),
                                    })}
                                    className="absolute w-full h-1 appearance-none pointer-events-auto bg-transparent"
                                />
                                <input
                                    type="range"
                                    min={priceRange.min}
                                    max={priceRange.max}
                                    value={tempPrice.priceMax}
                                    onChange={e => setTempPrice({
                                        ...tempPrice,
                                        priceMax: Math.max(Number(e.target.value), tempPrice.priceMin),
                                    })}
                                    className="absolute w-full h-1 appearance-none pointer-events-auto bg-transparent"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={cancelPrice}
                                className="px-3 py-1 text-sm text-gray-700 rounded hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={applyPrice}
                                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                            >
                                Apply price
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <button
                onClick={applyAll}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                APPLY FILTERS
            </button>

            <div className="flex-1" />

            <div className="relative">
                <select
                    className="appearance-none border border-gray-300 rounded px-3 py-2 text-sm pr-8 focus:outline-none"
                    value={sort}
                    onChange={e => handleSort(e.target.value)}
                >
                    <option value="">SORT BY</option>
                    <option value="price-asc">PRICE : lower → higher</option>
                    <option value="price-desc">PRICE : higher → lower</option>
                </select>
                <FaSort className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
        </div>
    );
}
