import { useState, useEffect } from 'react';
import { FaTimes, FaCheck, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const Settings = ({ isOpen, onClose, onSave, initialSettings }) => {
  const [settings, setSettings] = useState(initialSettings);
  const [isModified, setIsModified] = useState(false);

  // Reset form when modal opens/closes or initial settings change
  useEffect(() => {
    setSettings(initialSettings);
    setIsModified(false);
  }, [initialSettings, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: Math.max(1, Math.min(60, parseInt(value) || 1)) // Ensure value is between 1-60
    }));
    setIsModified(true);
  };

  const handleToggle = (name) => {
    setSettings(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
    setIsModified(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 dark:bg-indigo-700 p-4 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Timer Settings</h2>
            <button 
              onClick={onClose}
              className="text-white hover:text-indigo-200 transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Time Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 border-b pb-2">
              Time Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pomodoro */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pomodoro (min)
                </label>
                <input
                  type="number"
                  name="pomodoroTime"
                  min="1"
                  max="60"
                  value={settings.pomodoroTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Short Break */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Short Break (min)
                </label>
                <input
                  type="number"
                  name="shortBreakTime"
                  min="1"
                  max="15"
                  value={settings.shortBreakTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Long Break */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Long Break (min)
                </label>
                <input
                  type="number"
                  name="longBreakTime"
                  min="1"
                  max="30"
                  value={settings.longBreakTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Pomodoros Before Long Break */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sessions Before Long Break
                </label>
                <input
                  type="number"
                  name="pomodorosBeforeLongBreak"
                  min="1"
                  max="10"
                  value={settings.pomodorosBeforeLongBreak}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Behavior Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 border-b pb-2">
              Behavior
            </h3>

            {/* Auto Start Pomodoros */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Auto Start Pomodoros
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Automatically start focus sessions
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('autoStartPomodoros')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.autoStartPomodoros ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.autoStartPomodoros ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>

            {/* Auto Start Breaks */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Auto Start Breaks
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Automatically start break sessions
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('autoStartBreaks')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.autoStartBreaks ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.autoStartBreaks ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </div>

          {/* Sound Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 border-b pb-2">
              Sound & Notifications
            </h3>

            {/* Play Sound */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Timer Sound
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Play sound when timer completes
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle('playSound')}
                className="text-indigo-600 dark:text-indigo-400"
              >
                {settings.playSound ? (
                  <FaVolumeUp size={20} />
                ) : (
                  <FaVolumeMute size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isModified}
              className={`px-4 py-2 rounded-lg text-white transition-colors ${isModified ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-400 cursor-not-allowed'}`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;