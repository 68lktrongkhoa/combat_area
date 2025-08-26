import React, { useState, useMemo } from 'react';
import { ROBOT_API_DOCS_EN, ROBOT_API_DOCS_VI } from '../constants';
import { generateCodeFromPrompt } from '../services/geminiService';
import { useTranslation } from '../contexts/LanguageContext';

interface IdeProps {
  robotCode: string;
  setRobotCode: React.Dispatch<React.SetStateAction<string>>;
  onStartCombat: () => void;
  onBackToGarage: () => void;
  playerName?: string;
}

type Tab = 'API' | 'Console';

export const Ide: React.FC<IdeProps> = ({ robotCode, setRobotCode, onStartCombat, onBackToGarage, playerName }) => {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('API');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [consoleLog, setConsoleLog] = useState<string[]>([t('ide_console_initialized')]);
  
  const handleGenerateCode = async () => {
    if (!aiPrompt.trim()) return;
    setIsLoading(true);
    setConsoleLog(prev => [...prev, `> ${t('ide_ai_generating', { prompt: aiPrompt })}...`]);

    const handleRetry = (attempt: number) => {
      setConsoleLog(prev => [...prev, `> ${t('ide_ai_retrying', { attempt: attempt })}`]);
    };

    try {
      const generatedCode = await generateCodeFromPrompt(aiPrompt, language, handleRetry);
      setRobotCode(prevCode => `${prevCode}\n\n// ${t('ide_ai_code_comment', { prompt: aiPrompt })}\n${generatedCode}`);
      setConsoleLog(prev => [...prev, `> ${t('ide_ai_success')}`]);
      setAiPrompt('');
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : t('ide_ai_unknown_error');
      setConsoleLog(prev => [...prev, `> ${t('ide_ai_error')}: ${errorMessage}`]);
    } finally {
      setIsLoading(false);
    }
  };

  const apiDocs = useMemo(() => language === 'vi' ? ROBOT_API_DOCS_VI : ROBOT_API_DOCS_EN, [language]);

  return (
    <div className="h-screen flex flex-col p-4 bg-gray-900 text-gray-200">
      <header className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
        <div>
            <h1 className="text-3xl font-bold text-white">{playerName ? `${playerName}: ${t('ide_title')}`: t('ide_title')}</h1>
            <p className="text-gray-400">{t('ide_subtitle')}</p>
        </div>
        <div className="flex gap-4">
            <button onClick={onBackToGarage} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg">{t('ide_back_to_garage')}</button>
            <button onClick={onStartCombat} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">{t('ide_enter_arena')}</button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
        {/* Left Column: Code Editor */}
        <div className="lg:col-span-2 flex flex-col min-h-0">
          <label htmlFor="code-editor" className="text-lg font-semibold mb-2 text-cyan-400">{t('ide_editor_label')}</label>
          <textarea
            id="code-editor"
            value={robotCode}
            onChange={(e) => setRobotCode(e.target.value)}
            className="flex-1 w-full p-4 bg-gray-800 border border-gray-600 rounded-lg font-mono text-sm text-green-300 resize-none focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            placeholder={t('ide_editor_placeholder')}
          />
        </div>

        {/* Right Column: AI Assistant and Docs */}
        <div className="flex flex-col min-h-0">
          {/* AI Assistant */}
          <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold mb-2 text-cyan-400">{t('ide_ai_assistant_title')}</h3>
            <p className="text-sm text-gray-400 mb-3">{t('ide_ai_assistant_subtitle')}</p>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              rows={3}
              className="w-full p-2 bg-gray-700 border border-gray-500 rounded-md font-sans text-sm resize-none focus:ring-1 focus:ring-cyan-500 focus:outline-none"
              placeholder={t('ide_ai_assistant_placeholder')}
            />
            <button onClick={handleGenerateCode} disabled={isLoading} className="mt-2 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500">
              {isLoading ? t('ide_ai_button_loading') : t('ide_ai_button_generate')}
            </button>
          </div>

          {/* Docs/Console */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-800 border border-gray-600 rounded-lg">
            <div className="flex border-b border-gray-600">
              <button onClick={() => setActiveTab('API')} className={`flex-1 py-2 px-4 text-sm font-bold ${activeTab === 'API' ? 'bg-gray-700 text-cyan-400' : 'bg-gray-800 text-gray-400'}`}>{t('ide_tab_api')}</button>
              <button onClick={() => setActiveTab('Console')} className={`flex-1 py-2 px-4 text-sm font-bold ${activeTab === 'Console' ? 'bg-gray-700 text-cyan-400' : 'bg-gray-800 text-gray-400'}`}>{t('ide_tab_console')}</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {activeTab === 'API' && <pre className="text-xs whitespace-pre-wrap font-mono text-yellow-300">{apiDocs}</pre>}
              {activeTab === 'Console' && (
                <div className="text-xs font-mono space-y-1">
                  {consoleLog.map((log, i) => <p key={i} className="whitespace-pre-wrap">{log}</p>)}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};