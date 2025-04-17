const ModeSelector = ({ currentMode, setCurrentMode }) => {
    const modes = [
      { id: 'pomodoro', label: 'Pomodoro' },
      { id: 'shortBreak', label: 'Short Break' },
      { id: 'longBreak', label: 'Long Break' }
    ];
  
    return (
      <div className="flex justify-between bg-gray-100 dark:bg-gray-600 p-1 rounded-full">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setCurrentMode(mode.id)}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              currentMode === mode.id
                ? 'bg-white dark:bg-gray-800 shadow text-indigo-600 dark:text-indigo-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>
    );
  };
  
  export default ModeSelector;