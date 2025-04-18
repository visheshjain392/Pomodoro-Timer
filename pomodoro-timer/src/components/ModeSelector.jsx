import { motion } from 'framer-motion';
import { FaClock, FaCoffee, FaUmbrellaBeach } from 'react-icons/fa';

const ModeSelector = ({ currentMode, onChange }) => {
  const modes = [
    {
      id: 'pomodoro',
      label: 'Focus',
      icon: <FaClock />,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-100 dark:hover:bg-red-900/30'
    },
    {
      id: 'shortBreak',
      label: 'Short Break',
      icon: <FaCoffee />,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-100 dark:hover:bg-green-900/30'
    },
    {
      id: 'longBreak',
      label: 'Long Break',
      icon: <FaUmbrellaBeach />,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-100 dark:hover:bg-blue-900/30'
    }
  ];

  return (
    <div className="flex justify-between bg-gray-100/50 dark:bg-gray-700/50 p-1 rounded-full backdrop-blur-sm border border-gray-200 dark:border-gray-600">
      {modes.map((mode) => {
        const isActive = currentMode === mode.id;

        return (
          <motion.button
            key={mode.id}
            onClick={() => {
              if (!isActive && typeof onChange === 'function') {
                onChange(mode.id);
              }
            }}            
            aria-label={`Switch to ${mode.label}`}
            title={`Switch to ${mode.label}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex flex-col items-center justify-center flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive
                ? `${mode.color} text-white shadow-lg`
                : `text-gray-700 dark:text-gray-300 ${mode.hoverColor}`
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="modeIndicator"
                className="absolute inset-0 rounded-full border-2 border-white/30"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <div className="flex items-center gap-2 z-10">
              <span className="text-lg">{mode.icon}</span>
              <span>{mode.label}</span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default ModeSelector;
