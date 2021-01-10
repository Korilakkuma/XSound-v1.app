import React from 'react';

interface Props {
  values: { [group: string]: string[] };
  texts: { [group: string]: string[] };
  groups: string[];
  width?: string;
  defaultValue?: string;
  onChange(event: React.SyntheticEvent): void;
}

const GroupSelect: React.FC<Props> = (props: Props) => {
  const {
    values,
    texts,
    groups,
    width,
    defaultValue,
    onChange
  } = props;

  return (
    <select
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
  );
};

export default GroupSelect;
