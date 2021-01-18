import React from 'react';

export interface Props {
  values: string[];
  texts: string[];
  width?: string;
  defaultValue?: string;
  onChange(event: React.SyntheticEvent): void;
}

export const Select: React.FC<Props> = (props: Props) => {
  const {
    values,
    texts,
    width,
    defaultValue,
    onChange
  } = props;

  return (
    <select
      className="Select"
      onChange={onChange}
      defaultValue={defaultValue}
      style={width ? { width } : undefined}
    >
      {values.map((value: string, index: number) => {
        return <option key={value} value={value}>{texts[index]}</option>;
      })}
    </select>
  );
};
