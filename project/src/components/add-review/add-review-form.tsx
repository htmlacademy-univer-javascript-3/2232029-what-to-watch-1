import React, {ChangeEvent, FC, FormEvent, Fragment, useState} from 'react';
import {Review, ReviewData} from '../../types/review';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getError} from '../../store/main-reducer/main-selector';
import {useNavigate} from 'react-router-dom';
import {getFilm} from '../../store/film-reducer/film-selector';
import {setError} from '../../store/action';
import {postReview} from '../../store/api-actions';
import {getUser} from '../../store/user-reducer/user-selector';
import { now } from 'moment';

const AddReviewForm: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const film = useAppSelector(getFilm);
  const user = useAppSelector(getUser);
  const [formValue, setFormValue] = useState<ReviewData>({
    rating: 0,
    reviewText: ''
  });
  const error = useAppSelector(getError);
  const handleReviewTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue((prevValue) => ({
      ...prevValue,
      reviewText: event.target.value
    }));
  };
  const handleStarsCountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      starsCount: Number(event.target.value)
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
      navigate(`/films/${film?.id ?? 0}`);
    }
  };

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {
            Array.from(Array(10).keys()).map((cur) => (
              <Fragment key={cur}>
                <input className="rating__input" id={`star-${cur + 1}`} type="radio" name="rating" value={cur + 1} checked={formValue.rating === cur + 1} onChange={handleStarsCountChange}/>
                <label className="rating__label" htmlFor={`star-${cur + 1}`}>Rating {cur + 1}</label>
              </Fragment>
            ))
          }
        </div>
      </div>
      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={formValue.reviewText} onChange={handleReviewTextChange}/>
        <div className="add-review__submit">
          { (formValue.reviewText.length < 50 || formValue.reviewText.length >= 400 || formValue.rating === 0)
            ? <button className="add-review__btn" type="submit" disabled>Post</button>
            : <button className="add-review__btn" type="submit">Post</button>}
        </div>
        { error ? <p>{error}</p> : null}
      </div>
    </form>
  );
};

export default AddReviewForm;
