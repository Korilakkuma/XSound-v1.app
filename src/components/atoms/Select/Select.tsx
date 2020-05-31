import * as React from 'react';

interface Props {
  groups?: string[];
  values: string[][];
  texts: string[][];
  width: string;
  onChange(event: React.SyntheticEvent): void;
}

const Select: React.SFC<Props> = (props: Props) => {
  const { groups, values, texts, width, onChange } = props;

  if (groups) {
    return (
      <select className="Select" onChange={onChange} style={{ width }}>
        {groups.map((group: string, i: number) => {
          return (
            <optgroup key={group} label={group}>
              {values[i].map((value: string, j: number) => {
                return <option key={value} value={value}>{texts[i][j]}</option>;
              })}
            </optgroup>
          );
        })}
      </select>
    );
  }

  return (
    <select className="Select" onChange={onChange} style={{ width }}>
      {values.map((value: string, index: number) => {
        return <option key={value} value={value}>{texts[index]}</option>;
      })}
    </select>
  );
};

export default Select;
