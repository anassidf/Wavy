const Review = ({ review }) => {
  return (
    <div>
      <h2>{review.name}</h2>
      <p>{review.text}</p>
    </div>
  );
};

export default Review;
