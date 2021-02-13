import React from 'react';

export interface Props {
  id: string;
  label: string;
  values: { [group: string]: string[] };
  texts: { [group: string]: string[] };
  groups: string[];
  width?: string;
  defaultValue?: string;
  onChange(event: React.SyntheticEvent): void;
}

export const GroupSelect: React.FC<Props> = (props: Props) => {
  const {
    id,
    label,
    values,
    texts,
    groups,
    width,
    defaultValue,
    onChange
  } = props;

  return (
    <React.Fragment>
      <label htmlFor={id} className="visually-hidden">{label}</label>
      <select
        id={id}
        className="GroupSelect"
        onChange={onChange}
        defaultValue={defaultValue}
        style={width ? { width } : undefined}
      >
        {groups.map((group: string, key: number) => {
          return (
            <optgroup key={key} label={group}>
              {values[group].map((value: string, index: number) => {
                return <option key={value} value={value}>{texts[group][index]}</option>;
              })}
            </optgroup>
          );
        })}
      </select>
    </React.Fragment>
  );
};
