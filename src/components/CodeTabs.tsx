import type { KeyboardEvent } from 'react';
import { useId, useMemo, useRef, useState } from 'react';
import { CopyButton } from './CopyButton';

export type CodeSample = {
  id: string;
  label: string;
  language: string;
  code: string;
};

type CodeTabsProps = {
  samples: CodeSample[];
};

const clampIndex = (index: number, length: number) => {
  if (length <= 0) {
    return 0;
  }
  return (index + length) % length;
};

export const CodeTabs = ({ samples }: CodeTabsProps) => {
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeId, setActiveId] = useState(() => samples[0]?.id ?? '');

  const activeIndex = useMemo(() => {
    const index = samples.findIndex((sample) => sample.id === activeId);
    return index >= 0 ? index : 0;
  }, [activeId, samples]);

  const focusTab = (index: number) => {
    tabRefs.current[index]?.focus();
  };

  const activateTab = (index: number, focus: boolean) => {
    const nextIndex = clampIndex(index, samples.length);
    const next = samples[nextIndex];
    if (!next) {
      return;
    }
    setActiveId(next.id);
    if (focus) {
      focusTab(nextIndex);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'Right': {
        event.preventDefault();
        activateTab(activeIndex + 1, true);
        break;
      }
      case 'ArrowLeft':
      case 'Left': {
        event.preventDefault();
        activateTab(activeIndex - 1, true);
        break;
      }
      case 'Home': {
        event.preventDefault();
        activateTab(0, true);
        break;
      }
      case 'End': {
        event.preventDefault();
        activateTab(samples.length - 1, true);
        break;
      }
      default:
        break;
    }
  };

  if (samples.length === 0) {
    return null;
  }

  return (
    <div className="tabs">
      <div className="tabList" role="tablist" aria-label="代码示例">
        {samples.map((sample, index) => {
          const selected = index === activeIndex;
          const tabId = `${baseId}-tab-${sample.id}`;
          const panelId = `${baseId}-panel-${sample.id}`;
          return (
            <button
              key={sample.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              className="tab"
              role="tab"
              id={tabId}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              data-selected={selected}
              onClick={() => setActiveId(sample.id)}
              onKeyDown={onKeyDown}
            >
              {sample.label}
            </button>
          );
        })}
      </div>

      <div className="tabPanels">
        {samples.map((sample, index) => {
          const selected = index === activeIndex;
          const tabId = `${baseId}-tab-${sample.id}`;
          const panelId = `${baseId}-panel-${sample.id}`;
          return (
            <div
              key={sample.id}
              className="tabPanel"
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabId}
              hidden={!selected}
            >
              <div className="codeHeader">
                <div className="codeMeta">
                  <span className="codePill">{sample.language}</span>
                </div>
                <CopyButton value={sample.code} ariaLabel={`复制 ${sample.label} 代码`} />
              </div>
              <pre className="codeBlock">
                <code>{sample.code}</code>
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
};

