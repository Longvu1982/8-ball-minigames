export type GameDifficulty = "easy" | "medium" | "hard";

export interface GameConfig {
  id: string;
  name: string;
  difficulty: GameDifficulty;
  description: string;
  rules: string[];
  ballPositions: "random" | "fixed";
  videoUrl: string;
}

export const GAMES: GameConfig[] = [
  {
    id: "three-balls-runout",
    name: "3 Balls Runout",
    difficulty: "hard",
    description:
      "Pocket balls 1, 2, and 3 in sequence. Place the cue ball strategically and execute a perfect run.",
    videoUrl: "/videos/game_1_3_random_balls.mp4",
    rules: [
      "Balls 1, 2, 3 are placed randomly on the table",
      "You can place the cue ball anywhere",
      "Hit ball 1 first, then ball 2, then ball 3",
      "All balls must be pocketed in any pocket",
      "Complete the sequence without missing",
    ],
    ballPositions: "random",
  },
  {
    id: "cue-ball-control",
    name: "Cue Ball Control",
    difficulty: "hard",
    description:
      "Pocket the target ball and land the cue ball in the designated zone. Master precision and control.",
    videoUrl: "/videos/game_2_cue_control.mp4",
    rules: [
      "Target ball (1) is placed randomly near a pocket",
      "A target zone is randomly assigned on the table",
      "Place the cue ball anywhere",
      "Pocket the target ball",
      "Cue ball must stop in the target zone after impact",
    ],
    ballPositions: "random",
  },
  {
    id: "bank-shot",
    name: "Bank Shot",
    difficulty: "medium",
    description:
      "Bank the target ball off the rail and pocket it. Learn angle and speed control.",
    videoUrl: "/videos/game_3_bank.mp4",
    rules: [
      "Target ball is placed randomly on the table",
      "Place the cue ball anywhere",
      "Hit the target ball so it bounces off a rail",
      "Pocket the target ball after the bank shot",
      "Must use at least one rail",
    ],
    ballPositions: "random",
  },
  {
    id: "cue-bank-shot",
    name: "Cue Bank Shot",
    difficulty: "medium",
    description:
      "Bank the cue ball off the rail to hit and pocket the target. Advanced rail play.",
    videoUrl: "/videos/game_4_cue_bank.mp4",
    rules: [
      "Target ball is placed randomly near a pocket",
      "Place the cue ball anywhere",
      "Hit the cue ball to the rail first",
      "Cue ball bounces off rail and hits target ball",
      "Target ball must be pocketed",
    ],
    ballPositions: "random",
  },
  {
    id: "straight-shot",
    name: "Straight Shot",
    difficulty: "easy",
    description:
      "Execute a perfect straight shot with stun. The simplest but most fundamental technique.",
    videoUrl: "/videos/game_5_straight.mp4",
    rules: [
      "Target ball is placed in the middle of the table",
      "Cue ball is at the second pivot from long rail, first pivot from short rail",
      "Create a straight line: cue → target → corner pocket",
      "Use a stun shot (hit center of cue ball)",
      "Pocket the target ball",
    ],
    ballPositions: "fixed",
  },
  {
    id: "through-shot",
    name: "Through Shot",
    difficulty: "easy",
    description:
      "Navigate through two balls and return without contact. The ultimate precision challenge.",
    videoUrl: "/videos/game_6_through.mp4",
    rules: [
      "Two balls placed at second pivot from long rail, 15cm apart",
      "Cue ball at first pivot from long rail, opposite end",
      "Strike cue ball through the two balls",
      "Cue ball bounces off rails",
      "Cue ball must return without hitting the two balls",
    ],
    ballPositions: "fixed",
  },
];

export const DIFFICULTY_COLORS: Record<GameDifficulty, string> = {
  easy: "bg-green-500",
  medium: "bg-yellow-500",
  hard: "bg-red-500",
};

export const DIFFICULTY_TEXT: Record<GameDifficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};
