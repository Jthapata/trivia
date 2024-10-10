export interface User {
  email: string;
  id: string;
  games_played?: number;
  games_won?: number;
  games_lost?: number;
  total_questions?: number;
  correct_answers?: number;
  wrong_answers?: number;
  cat_general?: number;
  cat_music?: number;
  cat_videoGames?: number;
  cat_mythology?: number;
  cat_history?: number;
}
