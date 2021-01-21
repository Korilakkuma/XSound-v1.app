import React, { useState, useCallback } from 'react';

export interface Props {
  id: string;
  label: string;
  defaultChecked: boolean;
  onChange(event: React.SyntheticEvent): void;
}

export const Switch: React.FC<Props> = (props: Props) => {
  const { id, label, defaultChecked, onChange } = props;

  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const onChangeCallback = useCallback((event: React.SyntheticEvent) => {
    onChange(event);
    setChecked((event.currentTarget as HTMLInputElement).checked);
  }, [onChange]);

  return (
    <div className={`Switch${checked ? ' -checked' : ''}`}>
      <label htmlFor={id}>{label}<span aria-label={`${label} switch`} /></label>
      <input type="checkbox" hidden id={id} checked={checked} onChange={onChangeCallback} />
    </div>
  );
};
