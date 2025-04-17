import { useState } from 'react';
import TimerDisplay from '../components/TimerDisplay';
import Controls from '../components/Controls';
import ModeSwitcher from '../components/ModeSwitcher';
import SettingsModal from '../components/SettingsModal';
import usePomodoroTimer from '../hooks/usePomodoroTimer';

export default function HomePage() {
  const {
    // Timer state
    currentMode,
    timeLeft,
    isRunning,
    pomodoroCount,
    
    // Timer controls
    startTimer,
    pauseTimer,
    resetTimer,
    skipSession,
    
    // Settings
    settings,
    updateSettings
  } = usePomodoroTimer();

  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4">
      <main className="max-w-md mx-auto flex flex-col items-center justify-center min-h-screen">
        {/* Mode Selector */}
        <ModeSwitcher 
          currentMode={currentMode} 
          onChange={(mode) => {
            resetTimer();
            // Mode change handled in usePomodoroTimer
          }} 
        />
        
        {/* Timer Display */}
        <TimerDisplay 
          currentMode={currentMode}
          timeLeft={timeLeft}
          isRunning={isRunning}
          pomodoroCount={pomodoroCount}
          settings={settings}
        />
        
        {/* Controls */}
        <Controls
          onSettingsOpen={() => setShowSettings(true)}
          onStart={startTimer}
          onPause={pauseTimer}
          onReset={resetTimer}
          onSkip={skipSession}
          isRunning={isRunning}
          currentMode={currentMode}
        />
        
        {/* Settings Modal */}
        <SettingsModal
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          onSave={updateSettings}
          initialSettings={settings}
        />
      </main>
    </div>
  );
}