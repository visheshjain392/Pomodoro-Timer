import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaRedo, FaCog, FaStepForward } from 'react-icons/fa';

const Controls = ({
  onSettingsOpen = () => {},
  onStart = () => {},
  onPause = () => {},
  onReset = () => {},
  onSkip = () => {},
  isRunning = false,
  currentMode = 'pomodoro'
}) => {
  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const modeColors = {
    pomodoro: {
      translucent: 'bg-red-500/10 hover:bg-red-500/20',
      solid: 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700',
      label: 'Focus Mode'
    },
    shortBreak: {
      translucent: 'bg-green-500/10 hover:bg-green-500/20',
      solid: 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700',
      label: 'Short Break'
    },
    longBreak: {
      translucent: 'bg-blue-500/10 hover:bg-blue-500/20',
      solid: 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700',
      label: 'Long Break'
    }
  };

  const mode = modeColors[currentMode] || modeColors.pomodoro;

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center justify-center space-x-4">
        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          onClick={onReset}
          className={`p-4 rounded-full shadow-lg ${mode.translucent} text-gray-700 dark:text-gray-300`}
          aria-label="Reset timer"
        >
          <FaRedo className="text-xl" />
        </motion.button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isRunning ? 'pause' : 'play'}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={buttonVariants}
          >
            <button
              onClick={isRunning ? onPause : onStart}
              className={`p-6 rounded-full shadow-lg ${mode.solid} text-white`}
              aria-label={isRunning ? 'Pause timer' : 'Start timer'}
            >
              {isRunning ? <FaPause className="text-2xl" /> : <FaPlay className="text-2xl" />}
            </button>
          </motion.div>
        </AnimatePresence>

        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          onClick={onSkip}
          className={`p-4 rounded-full shadow-lg ${mode.translucent} text-gray-700 dark:text-gray-300`}
          aria-label="Skip to next session"
        >
          <FaStepForward className="text-xl" />
        </motion.button>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`px-4 py-1 rounded-full text-xs font-medium text-white ${mode.solid}`}
      >
        {mode.label}
      </motion.div>
    </div>
  );
};

export default Controls;