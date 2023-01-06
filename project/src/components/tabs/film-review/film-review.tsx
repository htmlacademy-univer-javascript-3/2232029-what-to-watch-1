import {FC} from 'react';
import {Review} from '../../../types/review';
import FilmReview from '../../film-review/film-review';

type Props = {
  reviews: Review[];
}

const FilmReviewsTab: FC<Props> = (props) => {
  const { reviews } = props;

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review) => <FilmReview key={review.id} review={review} />)}
      </div>
    </div>
  );
};

export default FilmReviewsTab;
