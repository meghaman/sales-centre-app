import { useEffect, useRef, useState } from 'react';
import styles from './InstallPrompt.module.css';

const DISMISS_KEY = 'sales-centre-pwa-install-dismissed';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export function InstallPrompt() {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY) === 'true') {
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      deferredPrompt.current = event as BeforeInstallPromptEvent;
      setVisible(true);
    };

    const handleAppInstalled = () => {
      deferredPrompt.current = null;
      setVisible(false);
      localStorage.setItem(DISMISS_KEY, 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    const promptEvent = deferredPrompt.current;
    if (!promptEvent) {
      return;
    }

    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    deferredPrompt.current = null;
    setVisible(false);

    if (choice.outcome === 'accepted') {
      localStorage.setItem(DISMISS_KEY, 'true');
    }
  };

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, 'true');
  };

  if (!visible) {
    return null;
  }

  return (
    <aside className={styles.installBanner} aria-label="Install app">
      <p className={styles.message}>Install Sales Centre on this tablet for kiosk use.</p>
      <div className={styles.actions}>
        <button type="button" className={styles.installButton} onClick={handleInstall}>
          Add to Home Screen
        </button>
        <button
          type="button"
          className={styles.dismissButton}
          aria-label="Dismiss install prompt"
          onClick={handleDismiss}
        >
          ×
        </button>
      </div>
    </aside>
  );
}
