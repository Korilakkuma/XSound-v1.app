import React, { useId } from 'react';

export type Props = {
  label: string;
  values: { [group: string]: string[] };
  texts: { [group: string]: string[] };
  groups: string[];
  width?: string | undefined;
  defaultValue?: string | undefined;
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
};

export const GroupSelect: React.FC<Props> = (props: Props) => {
  const { label, values, texts, groups, width, defaultValue, onChange } = props;

  const id = useId();

  return (
    <div className='GroupSelect' style={width ? { width } : undefined}>
      <label htmlFor={id}>{label}</label>
      <select id={id} defaultValue={defaultValue} onChange={onChange}>
        {groups.map((group: string, key: number) => {
          return (
            <optgroup key={key} label={group}>
              {values[group].map((value: string, index: number) => {
                return (
                  <option key={value} value={value}>
                    {texts[group][index]}
                  </option>
                );
              })}
            </optgroup>
          );
        })}
      </select>
    </div>
  );
};
