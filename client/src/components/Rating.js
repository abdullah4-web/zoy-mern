import './Rating.css';
function Rating(props) {
  const { rating, numReviews, caption } = props;
  return (
    <div className="rating">
      <span>
        <i
          className={
            rating >= 1
              ? 'fas fa-star gold'
              : rating >= 0.5
              ? 'fas fa-star-half-alt gold'
              : 'far fa-star gold'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? 'fas fa-star gold'
              : rating >= 1.5
              ? 'fas fa-star-half-alt gold'
              : 'far fa-star gold'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? 'fas fa-star gold'
              : rating >= 2.5
              ? 'fas fa-star-half-alt gold'
              : 'far fa-star gold'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? 'fas fa-star gold'
              : rating >= 3.5
              ? 'fas fa-star-half-alt gold'
              : 'far fa-star gold'
          }
        />
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? 'fas fa-star gold'
              : rating >= 4.5
              ? 'fas fa-star-half-alt gold'
              : 'far fa-star gold'
          }
        />
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{' ' + numReviews + ' reviews'}</span>
      )}
    </div>
  );
}

export default Rating;
