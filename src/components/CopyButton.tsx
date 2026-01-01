import { useEffect, useState } from 'react';

type CopyState = 'idle' | 'copied' | 'failed';

type CopyButtonProps = {
  value: string;
  label?: string;
  ariaLabel?: string;
  className?: string;
};

const copyToClipboard = async (value: string) => {
  if (typeof navigator === 'undefined') {
    throw new Error('Clipboard API unavailable');
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(textarea);

  if (!ok) {
    throw new Error('Copy failed');
  }
};

export const CopyButton = ({ value, label = '复制', ariaLabel, className }: CopyButtonProps) => {
  const [state, setState] = useState<CopyState>('idle');

  useEffect(() => {
    if (state === 'idle') {
      return;
    }

    const timer = window.setTimeout(() => setState('idle'), 1400);
    return () => window.clearTimeout(timer);
  }, [state]);

  const buttonText = state === 'copied' ? '已复制' : state === 'failed' ? '复制失败' : label;

  return (
    <button
      type="button"
      className={['copyButton', className].filter(Boolean).join(' ')}
      data-state={state}
      onClick={async () => {
        try {
          await copyToClipboard(value);
          setState('copied');
        } catch {
          setState('failed');
        }
      }}
      aria-label={ariaLabel ?? label}
    >
      {buttonText}
    </button>
  );
};

