export type Review = {
  id: number;
  movieId: number;
  comment: string;
  date: string;
  rating: number;
  user: {
    id: number;
    name: 'Kate Muir';
  };
}
