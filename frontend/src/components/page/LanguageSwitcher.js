
import React from 'react';
import { useLanguage } from '../../language_context_provider';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button
        className={`btn btn-sm ${language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button
        className={`btn btn-sm ${language === 'pl' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => changeLanguage('pl')}
        style={{ marginLeft: '5px' }}
      >
        PL
      </button>
    </div>
  );
};

export default LanguageSwitcher;
