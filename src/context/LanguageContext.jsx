import React, { createContext, useContext, useState, useEffect } from 'react';

// Patch Node removeChild & insertBefore to prevent React crashes with Google Translate DOM modifications
if (typeof window !== 'undefined' && typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) {
      if (console && console.warn) {
        console.warn('React DOM patch: Child to remove is not direct child', child, this);
      }
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (console && console.warn) {
        console.warn('React DOM patch: Reference node is not child of this parent', referenceNode, this);
      }
      return newNode;
    }
    return originalInsertBefore.apply(this, arguments);
  };
}

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
];

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem('ilf_language');
    if (saved && ['en', 'mr', 'hi'].includes(saved)) {
      return saved;
    }
    // Check if google trans cookie exists
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/i);
    if (match && ['en', 'mr', 'hi'].includes(match[1])) {
      return match[1];
    }
    return 'en';
  });

  // Helper to set googtrans cookie for current host and parent domain
  const setGoogTransCookie = (code) => {
    const val = `/en/${code}`;
    const host = window.location.hostname;
    document.cookie = `googtrans=${val}; path=/; max-age=31536000`;
    document.cookie = `googtrans=${val}; path=/; domain=${host}; max-age=31536000`;

    if (host.includes('.')) {
      const parts = host.split('.');
      if (parts.length >= 2) {
        const rootDomain = '.' + parts.slice(-2).join('.');
        document.cookie = `googtrans=${val}; path=/; domain=${rootDomain}; max-age=31536000`;
      }
    }
  };

  // Helper to clear googtrans cookie when returning to English
  const clearGoogTransCookie = () => {
    const host = window.location.hostname;
    const expired = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = expired;
    document.cookie = `${expired} domain=${host};`;
    if (host.includes('.')) {
      const parts = host.split('.');
      if (parts.length >= 2) {
        const rootDomain = '.' + parts.slice(-2).join('.');
        document.cookie = `${expired} domain=${rootDomain};`;
      }
    }
  };

  // Trigger Google Translate engine
  const applyGoogleTranslate = (langCode) => {
    if (langCode === 'en') {
      clearGoogTransCookie();
      setGoogTransCookie('en');
    } else {
      setGoogTransCookie(langCode);
    }

    // Try finding the Google combo element
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = langCode === 'en' ? '' : langCode;
      combo.dispatchEvent(new Event('change'));
    } else {
      // If combo is not yet injected, ensure page reloads to apply cookie
      setTimeout(() => {
        const lateCombo = document.querySelector('.goog-te-combo');
        if (lateCombo) {
          lateCombo.value = langCode === 'en' ? '' : langCode;
          lateCombo.dispatchEvent(new Event('change'));
        } else {
          window.location.reload();
        }
      }, 300);
    }
  };

  const changeLanguage = (newLangCode) => {
    if (!['en', 'mr', 'hi'].includes(newLangCode)) return;
    
    const prevLang = currentLang;
    setCurrentLang(newLangCode);
    localStorage.setItem('ilf_language', newLangCode);

    if (newLangCode === 'en') {
      clearGoogTransCookie();
      setGoogTransCookie('en');
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = '';
        combo.dispatchEvent(new Event('change'));
      }
      // If switching back to English from another language, reload cleans up any leftover font wrappers
      if (prevLang !== 'en') {
        setTimeout(() => {
          window.location.reload();
        }, 150);
      }
    } else {
      setGoogTransCookie(newLangCode);
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        combo.value = newLangCode;
        combo.dispatchEvent(new Event('change'));
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 150);
      }
    }
  };

  // Sync on initial mount if saved language is not English
  useEffect(() => {
    const saved = localStorage.getItem('ilf_language') || 'en';
    if (saved !== 'en') {
      setGoogTransCookie(saved);
      // Wait for Google Translate script to initialize
      const timer = setTimeout(() => {
        const combo = document.querySelector('.goog-te-combo');
        if (combo && combo.value !== saved) {
          combo.value = saved;
          combo.dispatchEvent(new Event('change'));
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const activeLangObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        activeLangObj,
        languages: LANGUAGES,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
