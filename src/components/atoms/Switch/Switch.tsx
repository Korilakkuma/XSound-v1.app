import React, { useCallback, useId, useRef } from 'react';

export type Props = {
  label: string;
  checked: boolean;
  labelAsText: boolean;
  controls?: string | undefined;
  tabIndex?: number | undefined;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
};

export const Switch: React.FC<Props> = (props: Props) => {
  const { label, checked, labelAsText, controls, tabIndex = 0, onChange } = props;

  const checkboxRef = useRef<HTMLInputElement>(null);

  const id = useId();

  const onKeyDownCallback = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const nativeEvent = event.nativeEvent;

    if (nativeEvent.code === 'Space' || nativeEvent.keyCode === 13) {
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
      role='switch'
      aria-checked={checked}
      tabIndex={tabIndex}
      className={`Switch${checked ? ' -checked' : ''}${labelAsText ? ' -text' : ''}`}
      onKeyDown={onKeyDownCallback}
    >
      {controls ? (
        <input type='checkbox' ref={checkboxRef} id={id} checked={checked} aria-controls={controls} tabIndex={-1} onChange={onChange} />
      ) : (
        <input type='checkbox' ref={checkboxRef} id={id} checked={checked} tabIndex={-1} onChange={onChange} />
      )}
      <label htmlFor={id}>
        {label}
        <span role='presentation' />
      </label>
    </div>
  );
};
