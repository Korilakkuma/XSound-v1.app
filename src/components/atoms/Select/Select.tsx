import React from 'react';

export interface Props {
  id: string;
  label: string;
  values: string[];
  texts: string[];
  disabled: boolean;
  width?: string;
  defaultValue?: string;
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
    onChange
  } = props;

  return (
    <React.Fragment>
      <label htmlFor={id} className="visually-hidden">{label}</label>
      <select
        id={id}
        className="Select"
        style={width ? { width } : undefined}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {values.map((value: string, index: number) => {
          return <option key={value} value={value}>{texts[index]}</option>;
        })}
      </select>
    </React.Fragment>
  );
};
