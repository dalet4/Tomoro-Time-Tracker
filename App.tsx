// Force rebuild - Updated with project description field
  import React, { useState, useEffect, useCallback } from 'react';
  import { TomoroLogo } from './components/Logo.tsx';
  import { TimerDisplay } from './components/TimerDisplay.tsx';
  import { IconButton } from './components/IconButton.tsx';
  import { PlayIcon, StopIcon } from './constants.tsx';
  import { submitTimeLog } from './services/timeTrackerAPI.ts';
  import type { TimeLog } from './types.ts';

  const App: React.FC = () => {
    const [userName, setUserName] = useState<string>('');
    const [clientName, setClientName] = useState<string>('');
    const [projectDescription, setProjectDescription] = useState<string>('');
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
      const savedUserName = localStorage.getItem('tomoroUserName');
      if (savedUserName) {
        setUserName(savedUserName);
      }
    }, []);

    const handleStartTimer = () => {
      setError('');
      if (!userName.trim() || !clientName.trim() || !projectDescription.trim()) {
        setError('Please enter your name, client name, and project description to start.');
        return;
      }
      localStorage.setItem('tomoroUserName', userName.trim());
      const now = new Date();
      setStartTime(now);
      setIsTimerRunning(true);
      setStatusMessage(`Timer started for ${clientName.trim()} at ${now.toLocaleTimeString()}.`);
    };

    const handleStopTimer = useCallback(async () => {
      if (!startTime || !userName || !clientName || !projectDescription) return;

      setIsSubmitting(true);
      setStatusMessage('Submitting your entry...');
      const endTime = new Date();
      const durationMs = endTime.getTime() - startTime.getTime();
      const duration_seconds = Math.round(durationMs / 1000);

      const timeLog: TimeLog = {
        user_name: userName,
        client_name: clientName,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration_seconds: duration_seconds,
      };

      const result = await submitTimeLog(timeLog);

      if (result.success) {
        const hours = Math.floor(durationMs / 3600000);
        const minutes = Math.floor((durationMs % 3600000) / 60000);
        const durationStr = `${hours}h ${minutes}m`;
        setStatusMessage(`You've tracked ${durationStr} on ${clientName}. Submitted!`);
      } else {
        setError(`Error: ${result.message}`);
        setStatusMessage(''); // Clear loading message on error
      }

      setIsSubmitting(false);
      setIsTimerRunning(false);
      setStartTime(null);
      setClientName(''); // Reset client name for next entry
      setProjectDescription(''); // Reset project description for next entry

      setTimeout(() => {
          setStatusMessage('');
          setError('');
      }, 5000);
    }, [startTime, userName, clientName, projectDescription]);

    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 transition-all
  duration-500">
        <div className="w-full max-w-md mx-auto bg-slate-800 rounded-2xl shadow-2xl p-8 space-y-8">
          <header>
            <TomoroLogo />
            <h1 className="text-center text-2xl font-bold text-slate-200 mt-4">Time Tracker</h1>
          </header>

          <main className="space-y-6">
            {!isTimerRunning ? (
              <div className="space-y-4 animate-fade-in">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg px-4 py-3 text-white
  placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                />
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Client Name"
                  className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg px-4 py-3 text-white
  placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                />
                <input
                  type="text"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="What are you working on?"
                  className="w-full bg-slate-700 border-2 border-slate-600 rounded-lg px-4 py-3 text-white
  placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                />
                <IconButton
                  text="Start Timer"
                  icon={<PlayIcon className="w-6 h-6" />}
                  onClick={handleStartTimer}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                />
              </div>
            ) : (
              <div className="space-y-4 text-center animate-fade-in">
                <p className="text-slate-300 text-lg">
                  Tracking time for: <span className="font-bold text-orange-400">{clientName}</span>
                </p>
                <p className="text-slate-400 text-sm">
                  Working on: <span className="text-slate-200">{projectDescription}</span>
                </p>
                <TimerDisplay startTime={startTime} />
                <IconButton
                  text={isSubmitting ? 'Stopping...' : 'Stop Timer'}
                  icon={<StopIcon className="w-6 h-6" />}
                  onClick={handleStopTimer}
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white disabled:bg-red-800 disabled:cursor-not-allowed"      
                />
              </div>
            )}
          </main>

          <footer>
            <div className="h-10 text-center text-sm text-slate-400 pt-4">
               {error && <p className="text-red-400 animate-pulse">{error}</p>}
               {statusMessage && !error && <p>{statusMessage}</p>}
            </div>
          </footer>
        </div>
        <p className="mt-8 text-slate-500 text-xs">A modern solution for a modern agency.</p>
      </div>
    );
  };

  export default App;
