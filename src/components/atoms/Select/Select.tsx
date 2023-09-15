import React, { useId } from 'react';

export type Props = {
  label: string;
  values: string[];
  texts: string[];
  disabled: boolean;
  width?: string | undefined;
  defaultValue?: string | undefined;
  tabIndex?: number | undefined;
  onChange(event: React.ChangeEvent<HTMLSelectElement>): void;
};

export const Select: React.FC<Props> = (props: Props) => {
  const { label, values, texts, disabled, width, defaultValue, tabIndex, onChange } = props;

  const id = useId();

  return (
    <div className='Select' style={width ? { width } : undefined}>
      <label htmlFor={id}>{label}</label>
      <select id={id} disabled={disabled} defaultValue={defaultValue} tabIndex={tabIndex} onChange={onChange}>
        {values.map((value: string, index: number) => {
          return (
            <option key={value} value={value}>
              {texts[index]}
            </option>
          );
        })}
      </select>
    </div>
  );
};
