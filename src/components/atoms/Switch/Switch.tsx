import React, { useCallback, useRef } from 'react';

export interface Props {
  id: string;
  label: string;
  checked: boolean;
  onChange(event: React.SyntheticEvent): void;
}

export const Switch: React.FC<Props> = (props: Props) => {
  const { id, label, checked, onChange } = props;

  const checkboxRef = useRef<HTMLInputElement>(null);

  const onKeyDownCallback = useCallback((event: React.SyntheticEvent) => {
    const nativeEvent = event.nativeEvent as KeyboardEvent;

    if ((nativeEvent.code === 'Space') || (nativeEvent.keyCode === 13)) {
      event.preventDefault();

      if (checkboxRef.current) {
        checkboxRef.current.click();
      }
    }
  }, []);

  return (
    <div className={`Switch${checked ? ' -checked' : ''}`} onKeyDown={onKeyDownCallback}>
      <input type="checkbox" ref={checkboxRef} id={id} checked={checked} className="visually-hidden" onChange={onChange} />
      <label htmlFor={id} tabIndex={0}>{label}<span aria-label={`${label} switch`} /></label>
    </div>
  );
};
