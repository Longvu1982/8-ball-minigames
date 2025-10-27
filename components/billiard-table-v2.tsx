import { GameConfig } from "@/lib/game-data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const COLS = 21;
const ROWS = 11;

const nearPocketPossitions: [number, number][] = [
  [1, 1], //top left
  [11, 1], //top middle
  [21, 1], //top right
  [21, 11], //bottom right
  [11, 11], //bottom middle
  [1, 11], //bottom left
];

const gamesWithRandomPosition = [
  "three-balls-runout",
  "bank-shot",
  "cue-ball-control",
  "cue-bank-shot",
];

const GridBillardTable = ({ game }: { game: GameConfig }) => {
  const [positions, setPossitions] = useState<[number, number][]>([]);

  console.log(positions);

  const generateRandomPosition = () => {
    const col = Math.floor(Math.random() * COLS) + 1;
    const row = Math.floor(Math.random() * ROWS) + 1;
    return [col, row] as [number, number];
  };

  const generateRandomNearPocketPosition = () => {
    return nearPocketPossitions[
      Math.floor(Math.random() * nearPocketPossitions.length)
    ];
  };

  const generatePositionList = () => {
    const result: [number, number][] = [];
    while (result.length < 3) {
      const newPos = generateRandomPosition();
      if (!result.some((pos) => pos[0] === newPos[0] && pos[1] === newPos[1])) {
        result.push(newPos);
      }
    }
    return result;
  };

  const onRandomize = () => {
    switch (game.id) {
      case "three-balls-runout":
      case "bank-shot":
        setPossitions(generatePositionList());
        break;
      case "cue-ball-control":
      case "cue-bank-shot":
        while (true) {
          const newPos = generateRandomNearPocketPosition();
          if (
            !positions.some(
              (pos) => pos[0] === newPos[0] && pos[1] === newPos[1]
            )
          ) {
            setPossitions([newPos, generateRandomPosition()]);
            break;
          }
        }
      case "straight-shot":
      case "through-shot":
        break;
    }
  };

  const renderBalls = () => {
    switch (game.id) {
      case "three-balls-runout":
        return (
          <>
            <Ball label="1" className="bg-yellow-400" position={positions[0]} />
            <Ball label="2" className="bg-blue-600" position={positions[1]} />
            <Ball label="3" className="bg-red-600" position={positions[2]} />
          </>
        );
      case "bank-shot":
      case "cue-bank-shot":
        return (
          <>
            <Ball label="1" className="bg-yellow-400" position={positions[0]} />
          </>
        );
      case "cue-ball-control":
        return (
          <>
            <Ball label="1" className="bg-yellow-400" position={positions[0]} />
            <div
              className="col-span-4 row-span-4 col-start-1 row-start-2 p-[10px] opacity-60"
              style={{
                gridColumnStart:
                  positions[1][0] > COLS - 3 ? COLS - 3 : positions[1][0],
                gridRowStart:
                  positions[1][1] > ROWS - 3 ? ROWS - 3 : positions[1][1],
              }}
            >
              <div className="bg-red-400 rounded-md w-full h-full"></div>
            </div>
          </>
        );

      case "straight-shot":
        return (
          <>
            <Ball label="1" className="bg-yellow-400" position={[11, 6]} />
            <Ball
              label="-"
              className="bg-white text-red-600"
              position={[6, 9]}
            />
          </>
        );
      case "through-shot":
        return (
          <>
            <Ball label="1" className="bg-yellow-400" position={[18, 5]} />
            <Ball label="2" className="bg-blue-600" position={[18, 7]} />
            <Ball
              label="-"
              className="bg-white text-red-600"
              position={[3, 6]}
            />
          </>
        );
    }
  };

  return (
    <div>
      {gamesWithRandomPosition.includes(game.id) && (
        <button
          onClick={() => {
            onRandomize();
          }}
          className="px-4 py-3 cursor-pointer bg-primary text-primary-foreground font-semibold transition-opacity hover:opacity-80 mx-auto block mb-4"
        >
          Randomize Positions
        </button>
      )}
      <div className="relative">
        <Image
          src="/table-top-upscale.jpg"
          width={1000}
          height={1000}
          alt="table"
          className="w-full h-auto rounded-lg"
        />
        <div className="absolute top-[11.2%] left-[6.3%] right-[6%] bottom-[11.3%] bg-red-200/0 grid grid-cols-21 grid-rows-11">
          {((positions.length > 0 &&
            gamesWithRandomPosition.includes(game.id)) ||
            !gamesWithRandomPosition.includes(game.id)) &&
            renderBalls()}
        </div>
      </div>
    </div>
  );
};

const Ball = ({
  position,
  className,
  label,
}: {
  position: [number, number];
  //tailwind color
  className: string;
  label: string;
}) => {
  const [col, row] = position;
  return (
    <div className="p-[23%]" style={{ gridColumn: col, gridRow: row }}>
      <div
        className={cn(
          `rounded-full aspect-square flex items-center justify-center shadow-md shadow-black/50 inset-shadow-sm inset-shadow-white`,
          className
        )}
      >
        <div className="w-1/2 h-1/2 flex items-center justify-center bg-white rounded-full">
          <span className="text-black text-xs font-bold">{label}</span>
        </div>
      </div>
    </div>
  );
};

export default GridBillardTable;
