import * as React from 'react';

interface Props {
  groups?: string[];
  values: string[] | { [group: string]: string[] };
  texts: string[] | { [group: string]: string[] };
  width?: string;
  onChange(event: React.SyntheticEvent): void;
  defaultValue?: string;
}

const Select: React.SFC<Props> = (props: Props) => {
  const { groups, values, texts, width, onChange, defaultValue } = props;

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
