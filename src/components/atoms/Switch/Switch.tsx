import React, { useCallback, useRef } from 'react';

export interface Props {
  id: string;
  label: string;
  checked: boolean;
  controls?: string;
  onChange(event: React.SyntheticEvent): void;
}

export const Switch: React.FC<Props> = (props: Props) => {
  const { id, label, checked, controls, onChange } = props;

  const checkboxRef = useRef<HTMLInputElement>(null);

  const onKeyDownCallback = useCallback((event: React.SyntheticEvent) => {
    const nativeEvent = event.nativeEvent as KeyboardEvent;

    if ((nativeEvent.code === 'Space') || (nativeEvent.keyCode === 13)) {
      event.preventDefault();

      const node = checkboxRef.current;

      if (node === null) {
        return;
      }

      node.click();
    }
  }, []);

  return (
    <div
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      className={`Switch${checked ? ' -checked' : ''}`}
      onKeyDown={onKeyDownCallback}
    >
      {controls ? <input type="checkbox" ref={checkboxRef} id={id} checked={checked} aria-controls={controls} aria-expanded={checked} className="visually-hidden" onChange={onChange} /> : <input type="checkbox" ref={checkboxRef} id={id} checked={checked} className="visually-hidden" onChange={onChange} />}
      <label htmlFor={id}>{label}<span aria-label={`${label} switch`} /></label>
    </div>
  );
};
