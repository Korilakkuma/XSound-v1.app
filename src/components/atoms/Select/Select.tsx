import React from 'react';

export interface Props {
  id: string;
  label: string;
  values: string[];
  texts: string[];
  disabled: boolean;
  width?: string;
  defaultValue?: string;
  tabIndex?: number;
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
}

export const Select: React.FC<Props> = (props: Props) => {
  const {
    id,
    label,
    values,
    texts,
    disabled,
    width,
    defaultValue,
    tabIndex,
    onChange
  } = props;

  return (
    <div className="Select" style={width ? { width } : undefined}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        disabled={disabled}
        defaultValue={defaultValue}
        tabIndex={tabIndex}
        onChange={onChange}
      >
        {values.map((value: string, index: number) => {
          return <option key={value} value={value}>{texts[index]}</option>;
        })}
      </select>
    </div>
  );
};
