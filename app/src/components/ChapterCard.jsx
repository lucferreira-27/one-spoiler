// ChapterCard.jsx
import { CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'; // import MUI components

function ChapterCard({ chapter, spoiler }) {
  // Render the UI
  return (
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={chapter.cover_image}
        alt={chapter.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {chapter.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Chapter {chapter.number} - Released on {chapter.releaseDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Spoiler: {spoiler.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Posted by {spoiler.author} - {spoiler.upvotes} upvotes and{' '}
          {spoiler.comments} comments
        </Typography>
      </CardContent>
    </CardActionArea>
  );
}

// Use PropTypes or TypeScript to define the types and shapes of your props
ChapterCard.propTypes = {
  chapter: PropTypes.shape({
    id: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
  }).isRequired,
  spoiler: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    upvotes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
  }).isRequired,
};

export default ChapterCard;
