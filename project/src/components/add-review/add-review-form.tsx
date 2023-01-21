import React, {ChangeEvent, FC, FormEvent, Fragment, useState} from 'react';
import {Review, ReviewData} from '../../types/review';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getError} from '../../store/main-reducer/main-selector';
import {getFilm} from '../../store/film-reducer/film-selector';
import {redirectToRoute, setError} from '../../store/action';
import {postReview} from '../../store/api-actions';
import {getUser} from '../../store/user-reducer/user-selector';
import { now } from 'moment';
import NotFoundPage from '../../pages/not-found/not-found-page';

const MAX_STARS_COUNT = 10;
const MAX_COMMENT_LEN = 400;
const MIN_COMMENT_LEN = 50;

const AddReviewForm: FC = () => {
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const user = useAppSelector(getUser);
  const [formValue, setFormValue] = useState<ReviewData>({
    rating: 0,
    reviewText: ''
  });
  const error = useAppSelector(getError);

  if (!film) {
    return <NotFoundPage/>;
  }

  const handleReviewTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue((prevValue) => ({
      ...prevValue,
      reviewText: event.target.value
    }));
  };
  const handleStarsCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      rating: Number(event.target.value)
    }));
  };

  const onSubmit = (review: ReviewData) => {
    try {
      const newReview : Review = {
        comment: review.reviewText,
        rating: review.rating,
        filmId: film?.id ?? 0,
        id: film?.id ?? 0,
        user: { id: user?.id ?? 0, name: user?.name ?? ''},
        date: now().toString()
      };
      dispatch(postReview(newReview));
      dispatch(setError(null));
    } catch {
      dispatch(setError('Can\'t post a form'));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formValue.reviewText && formValue.rating) {
      onSubmit(formValue);
      const redirectUrl = `/films/${film?.id}`;
      dispatch(redirectToRoute(redirectUrl));
    }
  };

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {
            Array.from(Array(MAX_STARS_COUNT).keys()).map((star) => (
              <Fragment key={star}>
                <input
                  className="rating__input"
                  id={`star-${star + 1}`}
                  type="radio"
                  name="rating"
                  value={star + 1}
                  checked={formValue.rating === star + 1}
                  onChange={handleStarsCountChange}
                />
                <label className="rating__label" htmlFor={`star-${star + 1}`}>Rating {star + 1}</label>
              </Fragment>
            ))
          }
        </div>
      </div>
      <div className="add-review__text">
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Отзыв должен быть от 50 до 400 символов"
          value={formValue.reviewText}
          onChange={handleReviewTextChange}
        />
        <div className="add-review__submit">
          { (formValue.reviewText.length < MIN_COMMENT_LEN || formValue.reviewText.length >= MAX_COMMENT_LEN || formValue.rating === 0)
            ? <button className="add-review__btn" type="submit" disabled>Post</button>
            : <button className="add-review__btn" type="submit">Post</button>}
        </div>
        { error ? <p>{error}</p> : null}
      </div>
    </form>
  );
};

export default AddReviewForm;
