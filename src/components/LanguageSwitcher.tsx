import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage, t } = useTranslation();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLanguage(e.target.checked ? 'en' : 'vi');
    };

    return (
        <div className="fixed top-4 right-4 z-50 bg-gray-800 bg-opacity-80 backdrop-blur-sm p-2 rounded-lg shadow-lg">
            <label htmlFor="language-toggle" className="flex items-center cursor-pointer">
                <span className="mr-2 text-sm font-medium text-gray-300">VI</span>
                <div className="relative">
                    <input
                        type="checkbox"
                        id="language-toggle"
                        className="sr-only"
                        checked={language === 'en'}
                        onChange={handleLanguageChange}
                    />
                    <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${language === 'en' ? 'transform translate-x-full bg-cyan-400' : ''}`}></div>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-300">EN</span>
            </label>
        </div>
    );
};

export default LanguageSwitcher;