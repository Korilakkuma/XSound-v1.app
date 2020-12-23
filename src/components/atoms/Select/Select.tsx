import * as React from 'react';

interface Props {
  values: string[] | { [group: string]: string[] };
  texts: string[] | { [group: string]: string[] };
  groups?: string[];
  width?: string;
  defaultValue?: string;
  onChange(event: React.SyntheticEvent): void;
}

const Select: React.FC<Props> = (props: Props) => {
  const { values, texts, groups, width, defaultValue, onChange } = props;

  if (groups) {
    return (
      <select
        className="Select"
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
  }

  if (Array.isArray(values)) {
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
  }

  return null;
};

export default Select;
