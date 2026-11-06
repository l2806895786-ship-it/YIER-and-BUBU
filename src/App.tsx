/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { CharacterShowcasePage } from './pages/CharacterShowcasePage';
import { StartPage } from './pages/StartPage';
import { HomePage } from './pages/HomePage';
import { GameLobbyPage } from './pages/GameLobbyPage';
import { MemoryGame } from './pages/games/MemoryGame';
import { CatchHeartsGame } from './pages/games/CatchHeartsGame';
import { QuizGame } from './pages/games/QuizGame';
import { HeartCollectorGame } from './pages/games/HeartCollectorGame';
import { CatchBearGame } from './pages/games/CatchBearGame';
import { CouplePuzzleGame } from './pages/games/CouplePuzzleGame';
import { SweetCakeGame } from './pages/games/SweetCakeGame';
import { DrawTogetherGame } from './pages/games/DrawTogetherGame';
import { DressUpPage } from './pages/DressUpPage';
import { RoomPage } from './pages/RoomPage';
import { AlbumPage } from './pages/AlbumPage';
import { TopBar } from './components/common/TopBar';
import { BottomNav } from './components/common/BottomNav';
import { DailyTasksModal } from './pages/DailyTasksModal';
import { AchievementsModal } from './pages/AchievementsModal';
import { SettingsModal } from './pages/SettingsModal';
import { RewardToastContainer } from './components/common/RewardToast';

const GameShell: React.FC = () => {
  const { page, setPage } = useGame();

  const [tasksOpen, setTasksOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // If on Character Showcase Page, show dedicated inspection suite
  if (page === 'showcase') {
    return (
      <>
        <CharacterShowcasePage />
        <RewardToastContainer />
      </>
    );
  }

  // If on Start Page, show dedicated Title Screen
  if (page === 'start') {
    return (
      <>
        <StartPage />
        <RewardToastContainer />
      </>
    );
  }

  // Active mini-games hide bottom nav for low-occlusion playfield
  const isMiniGameActive =
    page === 'memory' ||
    page === 'catch' ||
    page === 'quiz' ||
    page === 'collector' ||
    page === 'catch_bear' ||
    page === 'puzzle' ||
    page === 'cake' ||
    page === 'draw';

  return (
    <div className="min-h-screen w-full bg-[#FAF2E9] text-[#4B2925] flex flex-col justify-between overflow-x-hidden">
      {/* Top Status Bar (Heart coins, Affection level, shortcuts) */}
      <TopBar
        onOpenTasks={() => setTasksOpen(true)}
        onOpenAchievements={() => setAchievementsOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        {page === 'home' && (
          <HomePage
            onOpenTasks={() => setTasksOpen(true)}
            onOpenAchievements={() => setAchievementsOpen(true)}
            onOpenSettings={() => setSettingsOpen(true)}
          />
        )}
        {page === 'games' && <GameLobbyPage />}
        {page === 'memory' && <MemoryGame />}
        {page === 'catch' && <CatchHeartsGame />}
        {page === 'quiz' && <QuizGame />}
        {page === 'collector' && <HeartCollectorGame />}
        {page === 'catch_bear' && <CatchBearGame />}
        {page === 'puzzle' && <CouplePuzzleGame />}
        {page === 'cake' && <SweetCakeGame />}
        {page === 'draw' && <DrawTogetherGame />}
        {page === 'dressup' && <DressUpPage />}
        {page === 'room' && <RoomPage />}
        {page === 'album' && <AlbumPage />}
      </main>

      {/* Bottom Navigation (Only visible on main menu tabs) */}
      {!isMiniGameActive && (
        <BottomNav
          currentPage={page}
          onNavigate={(targetPage) => setPage(targetPage)}
        />
      )}

      {/* Global Modals */}
      <DailyTasksModal
        isOpen={tasksOpen}
        onClose={() => setTasksOpen(false)}
      />
      <AchievementsModal
        isOpen={achievementsOpen}
        onClose={() => setAchievementsOpen(false)}
      />
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Toast Notification Layer */}
      <RewardToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameShell />
    </GameProvider>
  );
}
