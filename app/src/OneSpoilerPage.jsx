import React, { useState,useEffect,useMemo,useCallback } from 'react';
import { Header, Footer, Sidebar } from './components';
import { fetchChapterData, fetchSpoilerData } from './utils/api';
import { sortChapters, filterChapters } from './utils/hype';
import ChapterList from './components/ChapterList'; // import the custom ChapterList component

function OneSpoilerPage() {
  // Use state hooks to store the chapter and spoiler data
  const [chapters, setChapters] = useState([]);
  const [spoilers, setSpoilers] = useState([]);

  // Use state hooks to store the sorting and filtering options
  const [sortOption, setSortOption] = useState('releaseDate');
  const [filterOption, setFilterOption] = useState('all');

  // Use effect hook to fetch data from the APIs when the component mounts
  useEffect(() => {
    // Fetch the chapter data from the Reddit API
    fetchChapterData()
      .then((data) => setChapters(data))
      .catch((error) => {
        // Use an error reporting tool or service
        reportError(error);
        // Display a user-friendly error message or fallback UI
        setError('Something went wrong while fetching chapter data.');
      });
    // Fetch the spoiler data from the Reddit API
    fetchSpoilerData()
      .then((data) => setSpoilers(data))
      .catch((error) => {
        // Use an error reporting tool or service
        reportError(error);
        // Display a user-friendly error message or fallback UI
        setError('Something went wrong while fetching spoiler data.');
      });
  }, []);

  // Use memoization techniques to cache the sorted and filtered results
  const sortedChapters = useMemo(() => sortChapters(chapters, sortOption), [
    chapters,
    sortOption,
  ]);
  const filteredChapters = useMemo(
    () => filterChapters(sortedChapters, filterOption),
    [sortedChapters, filterOption]
  );

  // Use useCallback to memoize the functions and pass them as props with stable references
  const handleSortChange = useCallback((option) => {
    setSortOption(option);
  }, []);
  const handleFilterChange = useCallback((option) => {
    setFilterOption(option);
  }, []);

  // Render the UI
  return (
    <div className="container">
      <Header />
      <Sidebar
        sortOption={sortOption}
        filterOption={filterOption}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
      />
      <div className="content">
        <ChapterList // use the custom ChapterList component instead of InfiniteScroll
          chapters={filteredChapters} // pass the chapters array as prop
          spoilers={spoilers} // pass the spoilers object as prop
        />
      </div>
      <Footer />
    </div>
  );
}

// Use PropTypes or TypeScript to define the types and shapes of your props and state
OneSpoilerPage.propTypes = {
  chapters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
    })
  ).isRequired,
  spoilers: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      upvotes: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default OneSpoilerPage;
