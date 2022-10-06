import React from 'react';


export default function FilmCard(props: { img: string; name: string; href: string }): JSX.Element {
  return(
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={props.img} alt={props.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={props.href}>{props.name}</a>
      </h3>
    </article>
  );
}
