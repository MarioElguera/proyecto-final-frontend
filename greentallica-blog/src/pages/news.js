// pages/news.js
import React, { useEffect, useState } from 'react';
import NewsList from '../components/NewsList/NewsList';
// import '../styles/NewsPage.css';

const mockFilters = [
    { id: 1, name: 'Football', value: 'football' },
    { id: 2, name: 'Music', value: 'music' },
    { id: 3, name: 'Movies', value: 'movies' },
    { id: 4, name: 'Travel', value: 'travel' }
];

const mockNews = [
    {
        id: 1,
        title: 'Exciting Football Match!',
        description:
            'Team A won an exciting match against Team B with a dramatic finish.',
        image: '/images/football1.jpg',
        category: 'football'
    },
    {
        id: 2,
        title: 'New Album Release',
        description:
            'Artist X releases their new album, receiving rave reviews.',
        image: '/images/music1.jpg',
        category: 'music'
    },
    {
        id: 3,
        title: 'Blockbuster Movie Premiere',
        description:
            'The highly anticipated blockbuster has hit theaters with great reviews.',
        image: '/images/movies1.jpg',
        category: 'movies'
    },
    {
        id: 4,
        title: 'Top Travel Destinations 2025',
        description:
            'Discover the best travel destinations to visit in 2025.',
        image: '/images/travel1.jpg',
        category: 'travel'
    },
    {
        id: 5,
        title: 'Exclusive Football Star Interview',
        description:
            'An exclusive interview with the season’s top football star.',
        image: '/images/football2.jpg',
        category: 'football'
    }
];

export default function NewsPage() {
    const [news, setNews] = useState([]);
    const [loadingNews, setLoadingNews] = useState(true);
    const [filters, setFilters] = useState([]);
    const [loadingFilters, setLoadingFilters] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState('all');

    useEffect(() => {
        // Simulate API calls with mock data
        setFilters(mockFilters);
        setNews(mockNews);
        setLoadingFilters(false);
        setLoadingNews(false);
    }, []);

    const filteredNews =
        selectedFilter === 'all'
            ? news
            : news.filter(
                (item) =>
                    item.category.toLowerCase() === selectedFilter
            );

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="newsPage">
                <header className="header">
                    <h1 className="title">Latest News</h1>
                </header>
                <div className="filters">
                    <button
                        onClick={() => setSelectedFilter('all')}
                        className={selectedFilter === 'all' ? 'active' : ''}
                    >
                        All
                    </button>
                    {!loadingFilters &&
                        filters.map((f) => (
                            <button
                                key={f.id}
                                onClick={() => setSelectedFilter(f.value)}
                                className={
                                    selectedFilter === f.value ? 'active' : ''
                                }
                            >
                                {f.name}
                            </button>
                        ))}
                </div>
                {loadingNews ? (
                    <div className="loading">Loading news...</div>
                ) : (
                    <NewsList news={filteredNews} />
                )}
            </div>
        </div>
    );
}


// useEffect(() => {
//     async function fetchNews() {
//         try {
//             const res = await fetch('https://api.example.com/news');
//             const data = await res.json();
//             setNews(data);
//         } catch (error) {
//             console.error('Error fetching news:', error);
//         } finally {
//             setLoadingNews(false);
//         }
//     }
//     fetchNews();
// }, []);

// useEffect(() => {
//     async function fetchFilters() {
//         try {
//             const res = await fetch('https://api.example.com/filters');
//             const data = await res.json();
//             setFilters(data);
//         } catch (error) {
//             console.error('Error fetching filters:', error);
//         } finally {
//             setLoadingFilters(false);
//         }
//     }
//     fetchFilters();
// }, []);
