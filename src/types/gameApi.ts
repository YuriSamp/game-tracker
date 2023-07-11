export type Game = {
  developer: string;
  freetogame_profile_url: string;
  game_url: string;
  id: number;
  plataform: string;
  publisher: string;
  release_date: string;
  short_description: string;
  thumbnail: string;
  title: string;
  genre: string;
};

export interface GameRanked extends Game {
  favorite: boolean;
  gameReview: number;
}

export interface Rating {
  favorite: boolean;
  gameReview: number;
}
