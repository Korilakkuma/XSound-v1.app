import React from 'react';

export interface Props {
  id: string;
  label: string;
  values: string[];
  texts: string[];
  width?: string;
  defaultValue?: string;
  onChange(event: React.SyntheticEvent): void;
}

export const Select: React.FC<Props> = (props: Props) => {
  const {
    id,
    label,
    values,
    texts,
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
        onChange={onChange}
        defaultValue={defaultValue}
        style={width ? { width } : undefined}
      >
        {values.map((value: string, index: number) => {
          return <option key={value} value={value}>{texts[index]}</option>;
        })}
      </select>
    </React.Fragment>
  );
};
