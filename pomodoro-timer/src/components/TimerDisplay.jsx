import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLeaf, FaCoffee, FaBrain, FaFire } from 'react-icons/fa';

const TimerDisplay = ({ 
  currentMode, 
  settings, 
  isRunning, 
  onComplete,
  pomodoroCount 
}) => {
  // Convert minutes to seconds for timer
  const getTimeForMode = (mode) => {
    switch(mode) {
      case 'pomodoro': return settings.pomodoroTime * 60;
      case 'shortBreak': return settings.shortBreakTime * 60;
      case 'longBreak': return settings.longBreakTime * 60;
      default: return settings.pomodoroTime * 60;
    }
  };

  const [timeLeft, setTimeLeft] = useState(getTimeForMode(currentMode));
  const [isBlinking, setIsBlinking] = useState(false);
  const circleRef = useRef(null);
  const prevModeRef = useRef(currentMode);

  // Mode-specific configurations
  const modeConfig = {
    pomodoro: {
      color: 'bg-red-500',
      icon: <FaBrain className="text-red-500" />,
      label: 'Focus Time',
      gradient: 'from-red-500 to-orange-500'
    },
    shortBreak: {
      color: 'bg-green-500',
      icon: <FaCoffee className="text-green-500" />,
      label: 'Short Break',
      gradient: 'from-green-500 to-teal-500'
    },
    longBreak: {
      color: 'bg-blue-500',
      icon: <FaLeaf className="text-blue-500" />,
      label: 'Long Break',
      gradient: 'from-blue-500 to-indigo-500'
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Calculate progress for circular progress indicator
  const calculateProgress = () => {
    const totalTime = getTimeForMode(currentMode);
    return ((totalTime - timeLeft) / totalTime) * 283;
  };

  // Handle timer logic
  useEffect(() => {
    let interval;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsBlinking(true);
      onComplete();
      setTimeout(() => setIsBlinking(false), 2000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  // Reset timer when mode changes
  useEffect(() => {
    if (prevModeRef.current !== currentMode) {
      setTimeLeft(getTimeForMode(currentMode));
      prevModeRef.current = currentMode;
    }
  }, [currentMode, settings]);

  return (
    <div className="relative flex flex-col items-center justify-center py-8">
      {/* Circular Progress Background */}
      <div className="relative w-64 h-64 mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
            className="dark:stroke-gray-600"
          />
          {/* Progress circle */}
          <circle
            ref={circleRef}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={modeConfig[currentMode].color.replace('bg-', 'stroke-')}
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset={283 - calculateProgress()}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Timer Display */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${isBlinking ? 'animate-pulse' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={timeLeft}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className={`text-5xl font-bold font-mono mb-1 bg-gradient-to-r ${modeConfig[currentMode].gradient} bg-clip-text text-transparent`}>
                {formatTime(timeLeft)}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center text-lg font-medium">
            {modeConfig[currentMode].icon}
            <span className="ml-2 text-gray-700 dark:text-gray-300">
              {modeConfig[currentMode].label}
            </span>
          </div>
        </div>
      </div>

      {/* Pomodoro Counter */}
      {currentMode === 'pomodoro' && (
        <div className="flex items-center justify-center space-x-2 mb-6">
          {[...Array(settings.pomodorosBeforeLongBreak)].map((_, i) => (
            <div 
              key={i} 
              className={`w-3 h-3 rounded-full ${i < pomodoroCount ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}`}
            />
          ))}
        </div>
      )}

      {/* Motivational Quote */}
      <div className="text-center max-w-md px-4">
        <p className="text-gray-600 dark:text-gray-400 italic">
          {currentMode === 'pomodoro' ? (
            "Focus on being productive, not busy."
          ) : (
            "Take a break. You've earned it!"
          )}
        </p>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-500 flex items-center justify-center">
          <FaFire className="mr-1 text-orange-500" />
          {pomodoroCount} session{pomodoroCount !== 1 ? 's' : ''} completed
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;