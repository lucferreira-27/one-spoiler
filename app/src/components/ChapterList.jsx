// ChapterList.jsx
import { Card } from '@mui/material'; // import MUI Card component
import { Spinner } from './components';
import ChapterCard from './components/ChapterCard'; // import the custom ChapterCard component
import InfiniteScroll from 'react-infinite-scroll-component'; // import the library

function ChapterList({ chapters, spoilers }) {
  // Use state hooks to store the pagination data
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  // Use effect hook to fetch more data from the APIs when the page changes
  React.useEffect(() => {
    // Fetch more chapter data from the Reddit API with pagination
    fetchChapterData(page)
      .then((data) => {
        // Append the new data to the existing chapters array
        setChapters((prevChapters) => [...prevChapters, ...data]);
        // Check if there is more data to fetch
        if (data.length === 0) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        // Use an error reporting tool or service
        reportError(error);
        // Display a user-friendly error message or fallback UI
        setError('Something went wrong while fetching chapter data.');
      });
    // Fetch more spoiler data from the Reddit API with pagination
    fetchSpoilerData(page)
      .then((data) => {
        // Append the new data to the existing spoilers object
        setSpoilers((prevSpoilers) => ({ ...prevSpoilers, ...data }));
      })
      .catch((error) => {
        // Use an error reporting tool or service
        reportError(error);
        // Display a user-friendly error message or fallback UI
        setError('Something went wrong while fetching spoiler data.');
      });
  }, [page]);

  // Use useCallback to memoize the function and pass it as prop with stable reference
  const handleLoadMore = React.useCallback(() => {
    // Increment the page number to fetch more data
    setPage((prevPage) => prevPage + 1);
  }, []);

  // Render the UI
  return (
    <InfiniteScroll // use the library component to wrap the cards
      dataLength={chapters.length} // pass the length of the data array
      next={handleLoadMore} // pass the function to load more data
      hasMore={hasMore} // pass the boolean to indicate if there is more data
      loader={<Spinner />} // pass the component to show while loading
    >
      {chapters.map((chapter) => (
        <Card // use MUI Card component instead of custom Card component
          key={chapter.id} // use a unique and stable identifier as key
          sx={{ maxWidth: 345 }} // use sx prop for inline styling
        >
          <ChapterCard // use the custom ChapterCard component to render the card content
            chapter={chapter}
            spoiler={spoilers[chapter.number]}
          />
        </Card>
      ))}
    </InfiniteScroll>
  );
}

// Use PropTypes or TypeScript to define the types and shapes of your props
ChapterList.propTypes = {
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

export default ChapterList;
