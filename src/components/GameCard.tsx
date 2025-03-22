
import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

interface GameCardProps {
  id: string;
  title: string;
  host: string;
  players: number;
  maxPlayers: number;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  status: "waiting" | "in-progress" | "completed";
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  host,
  players,
  maxPlayers,
  category,
  difficulty,
  status,
}) => {
  const statusColors = {
    waiting: "bg-green-100 text-green-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    completed: "bg-gray-100 text-gray-800",
  };

  const difficultyColors = {
    easy: "bg-blue-100 text-blue-800",
    medium: "bg-purple-100 text-purple-800",
    hard: "bg-red-100 text-red-800",
  };

  const isJoinable = status === "waiting" && players < maxPlayers;

  return (
    <div className="card-hover bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-lg">{title}</h3>
          <span
            className={`${
              statusColors[status]
            } text-xs font-medium px-2.5 py-0.5 rounded-full`}
          >
            {status.replace("-", " ")}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="mr-2">Hosted by {host}</span>
          <span className="mx-2">•</span>
          <span>{players}/{maxPlayers} players</span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {category}
          </span>
          <span className={`${difficultyColors[difficulty]} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
            {difficulty}
          </span>
        </div>
        
        <div className="mt-4">
          {isJoinable ? (
            <Link to={`/game/${id}`} className="w-full">
              <Button className="w-full">Join Game</Button>
            </Link>
          ) : (
            <Button
              className="w-full"
              variant={status === "in-progress" ? "outline" : "ghost"}
              disabled={status === "completed"}
            >
              {status === "in-progress" ? "Spectate" : "Game Ended"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
