import React, { useCallback, useRef } from 'react';

export interface Props {
  id: string;
  label: string;
  checked: boolean;
  controls?: string;
  tabIndex?: number;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export const Switch: React.FC<Props> = (props: Props) => {
  const { id, label, checked, controls, tabIndex = 0, onChange } = props;

  const checkboxRef = useRef<HTMLInputElement>(null);

  const onKeyDownCallback = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const nativeEvent = event.nativeEvent;

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
      tabIndex={tabIndex}
      className={`Switch${checked ? ' -checked' : ''}`}
      onKeyDown={onKeyDownCallback}
    >
      {controls ? <input type="checkbox" ref={checkboxRef} id={id} checked={checked} aria-controls={controls} tabIndex={-1} className="visually-hidden" onChange={onChange} /> : <input type="checkbox" ref={checkboxRef} id={id} checked={checked} tabIndex={-1} className="visually-hidden" onChange={onChange} />}
      <label htmlFor={id}>{label}<span role="presentation" /></label>
    </div>
  );
};
