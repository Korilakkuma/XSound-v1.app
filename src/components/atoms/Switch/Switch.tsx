import React from 'react';

export interface Props {
  id: string;
  label: string;
  checked: boolean;
  onChange(event: React.SyntheticEvent): void;
}

export const Switch: React.FC<Props> = (props: Props) => {
  const { id, label, checked, onChange } = props;

  return (
    <div className={`Switch${checked ? ' -checked' : ''}`}>
      <label htmlFor={id}>{label}<span aria-label={`${label} switch`} /></label>
      <input type="checkbox" id={id} checked={checked} className="visually-hidden" onChange={onChange} />
    </div>
  );
};
