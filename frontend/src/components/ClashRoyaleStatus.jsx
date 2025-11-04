import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

const PLAYER_TAG = "RJPRJ8LR0";
const FRIEND_LINK = "https://link.clashroyale.com/invite/friend/en?tag=RJPRJ8LR0&token=jjdeftm9&platform=android";

function parseBattleTime(battleTime) {
  const match = battleTime.match(
    /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})\.(\d{3})Z$/
  );
  if (!match) return null;
  const [
    ,
    year,
    month,
    day,
    hour,
    minute,
    second,
    ms
  ] = match;
  return new Date(
    `${year}-${month}-${day}T${hour}:${minute}:${second}.${ms}Z`
  );
}

function getGameResult(game, myTag) {
  const myTeam = game.team?.find((p) => p.tag === `#${myTag}` || p.tag === myTag);
  const oppTeam = game.opponent?.[0];
  if (!myTeam || !oppTeam) return null;
  if (myTeam.crowns > oppTeam.crowns) return "win";
  if (myTeam.crowns < oppTeam.crowns) return "loss";
  return "draw";
}

function getOpponentName(game) {
  return game.opponent?.[0]?.name || "Unknown";
}

function getGameType(game) {
  return game.type === "friendly" ? "Friendly" : "PVP";
}

export default function ClashRoyaleStatus({ battlelog }) {
  const [status, setStatus] = useState("offline");
  const [lastPlayedTime, setLastPlayedTime] = useState(null);
  const [recentGames, setRecentGames] = useState([]);

  useEffect(() => {
    if (battlelog && battlelog.length > 0) {
      setRecentGames(battlelog.slice(0, 5));
      const lastBattle = battlelog[0];
      const lastBattleTime = parseBattleTime(lastBattle.battleTime);
      const now = new Date();
      const diffMinutes = (now - lastBattleTime) / (1000 * 60);

      setLastPlayedTime(lastBattleTime);

      if (diffMinutes <= 5) {
        setStatus("online");
      } else {
        setStatus("offline");
      }
    }
  }, [battlelog]);

  const formatTimeIST = (date) => {
    if (!date) return "";
    const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    // Day with ordinal suffix
    const day = istDate.getDate();
    const daySuffix =
      day % 10 === 1 && day !== 11 ? "st" :
      day % 10 === 2 && day !== 12 ? "nd" :
      day % 10 === 3 && day !== 13 ? "rd" : "th";

    // Month short name
    const month = istDate.toLocaleString("en-US", { month: "short" });

    // Year
    const year = istDate.getFullYear();

    // Time in 12-hour format
    let hours = istDate.getHours();
    const minutes = istDate.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;

    return `${day}${daySuffix} ${month}, ${year} at ${hours}:${minutes} ${ampm}`;
  };

  // Detect mobile device
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <motion.div
      className="w-full max-w-[98vw] md:max-w-2xl mx-auto px-4 md:px-0 mb-10 mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="mx-0 md:mx-2 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 rounded-xl border border-[#232323] bg-[#16181c]/80 backdrop-blur-md shadow-lg"
        style={{
          background: `linear-gradient(135deg, 
            #1a1a1d 0%, 
            #18181b 15%, 
            #16161a 50%, 
            #141418 85%, 
            #121216 100%
          )`,
          boxShadow: `
            0 4px 6px -1px rgba(0, 0, 0, 0.3),
            0 2px 4px -1px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
        }}
      >
        {/* Left Section - Image, Ticks, Last Played */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
              <div className="w-14 h-14 bg-foreground rounded-md flex items-center justify-center shadow-lg overflow-hidden">
                <img
                  src="/clashroyale.svg"
                  alt="Clash Royale"
                  className="w-14 h-14 object-contain rounded-md"
                  draggable={false}
                />
              </div>
            {/* Status Icons (most recent on right) */}
            <div className="ml-3 flex flex-col items-start">
              <div className="flex items-center gap-1">
                {[...recentGames].reverse().map((game, idx) => {
                  const result = getGameResult(game, PLAYER_TAG);
                  const opponentName = getOpponentName(game);
                  const gameType = getGameType(game);

                  return (
                    <Tooltip
                      key={idx}
                      open={isMobile ? openIdx === idx : undefined}
                      onOpenChange={isMobile ? (open) => setOpenIdx(open ? idx : null) : undefined}
                    >
                      <TooltipTrigger asChild>
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer
                            ${result === "win"
                              ? "bg-green-900/60 border border-green-700"
                              : result === "loss"
                              ? "bg-red-900/60 border border-red-700"
                              : "bg-gray-800/60 border border-gray-700"
                            }
                          `}
                          tabIndex={0}
                          onClick={
                            isMobile
                              ? () => setOpenIdx(openIdx === idx ? null : idx)
                              : undefined
                          }
                        >
                          {result === "win" ? (
                            <svg viewBox="0 0 20 20" className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 10l4 4 6-7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : result === "loss" ? (
                            <svg viewBox="0 0 20 20" className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M6 6l8 8M14 6l-8 8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : (
                            <svg viewBox="0 0 20 20" className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 10h10" strokeLinecap="round" />
                            </svg>
                          )}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-[#18181b]/90 backdrop-blur-md border border-[#232323] rounded-sm px-3 py-1 text-xs text-gray-200 shadow-xl"
                      >
                        {`${gameType} against ${opponentName}`}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
                {status === "online" && (
                  <motion.div
                    className="ml-2 w-3 h-3 bg-green-500 rounded-full border-2 border-[#16181c]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </div>
              <span className="text-gray-400 text-xs mt-2">
                {status === "online"
                  ? (
                    <>
                      <span className="text-green-400 font-semibold">Playing now...</span>
                    </>
                  )
                  : `Last played ${formatTimeIST(lastPlayedTime)}`
                }
              </span>
            </div>
          </div>
        </div>
        {/* Right Section - Add Friend Button */}
        <motion.a
          href={FRIEND_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="
            w-full sm:w-auto px-5 py-2 rounded-lg text-white text-sm font-medium
            border border-[#232323]
            shadow-md
            bg-gradient-to-br from-[#1a1a1d] via-[#18181b] to-[#121216]
            hover:from-[#232323] hover:via-[#222225] hover:to-[#18181b]
            transition
            active:scale-95
            focus:outline-none focus:ring-2 focus:ring-[#f5f5f7] focus:ring-offset-2
            flex items-center gap-2 justify-center
          "
          style={{
            background: `linear-gradient(135deg, 
              #1a1a1d 0%, 
              #18181b 15%, 
              #16161a 50%, 
              #141418 85%, 
              #121216 100%
            )`,
            boxShadow: `
              0 2px 6px -1px rgba(0, 0, 0, 0.25),
              0 1px 2px -1px rgba(0, 0, 0, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.07)
            `,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          Add Me :)
        </motion.a>
      </div>
    </motion.div>
  );
}