import { useState } from 'react';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import ModeSelector from './components/ModeSelector';
import Settings from './components/Settings.jsx';

function App() {
  // Initial settings state
  const [settings, setSettings] = useState({
    pomodoroTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    pomodorosBeforeLongBreak: 4,
    autoStartBreaks: true,
    autoStartPomodoros: false,
    playSound: true
  });

  const [currentMode, setCurrentMode] = useState('pomodoro');
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center justify-center p-4">
      {/* Main container */}
      <div className="w-full max-w-md bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-6 space-y-6">
        {/* Mode selector */}
        <ModeSelector currentMode={currentMode} setCurrentMode={setCurrentMode} />
        
        {/* Timer display */}
        <TimerDisplay 
          currentMode={currentMode}
          settings={settings}
        />
        
        {/* Controls */}
        <Controls 
          onSettingsOpen={() => setShowSettings(true)}
        />
      </div>

      {/* Settings modal */}
      <Settings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={(newSettings) => {
          setSettings(newSettings);
          // You might want to reset timer here
        }}
        initialSettings={settings}
      />
    </div>
  );
}

export default App;