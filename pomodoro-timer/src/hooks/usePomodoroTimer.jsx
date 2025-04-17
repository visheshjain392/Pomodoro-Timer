import { useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

export default function usePomodoroTimer() {
  // Default settings
  const defaultSettings = {
    pomodoroTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    pomodorosBeforeLongBreak: 4,
    autoStartBreaks: true,
    autoStartPomodoros: false,
    playSound: true
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [currentMode, setCurrentMode] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(settings.pomodoroTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  // Sound effect
  const playAlarm = useCallback(() => {
    if (settings.playSound) {
      const sound = new Howl({ src: ['/sounds/alarm.mp3'] });
      sound.play();
    }
  }, [settings.playSound]);

  // Timer logic
  useEffect(() => {
    let interval;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playAlarm();
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, playAlarm]);

  const handleTimerComplete = useCallback(() => {
    setIsRunning(false);
    
    if (currentMode === 'pomodoro') {
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);
      
      // Determine next break type
      const nextMode = newCount % settings.pomodorosBeforeLongBreak === 0 
        ? 'longBreak' 
        : 'shortBreak';
      
      setCurrentMode(nextMode);
      setTimeLeft(nextMode === 'longBreak' 
        ? settings.longBreakTime * 60 
        : settings.shortBreakTime * 60);
      
      if (settings.autoStartBreaks) setIsRunning(true);
    } else {
      setCurrentMode('pomodoro');
      setTimeLeft(settings.pomodoroTime * 60);
      if (settings.autoStartPomodoros) setIsRunning(true);
    }
  }, [currentMode, pomodoroCount, settings]);

  // Public API
  return {
    // State
    currentMode,
    timeLeft,
    isRunning,
    pomodoroCount,
    settings,
    
    // Controls
    startTimer: () => setIsRunning(true),
    pauseTimer: () => setIsRunning(false),
    resetTimer: () => {
      setIsRunning(false);
      setTimeLeft(
        currentMode === 'pomodoro' ? settings.pomodoroTime * 60 :
        currentMode === 'shortBreak' ? settings.shortBreakTime * 60 :
        settings.longBreakTime * 60
      );
    },
    skipSession: () => {
      setIsRunning(false);
      handleTimerComplete();
    },
    
    // Settings
    updateSettings: (newSettings) => {
      setSettings(newSettings);
      // Reset timer with new settings
      setTimeLeft(
        currentMode === 'pomodoro' ? newSettings.pomodoroTime * 60 :
        currentMode === 'shortBreak' ? newSettings.shortBreakTime * 60 :
        newSettings.longBreakTime * 60
      );
    }
  };
}