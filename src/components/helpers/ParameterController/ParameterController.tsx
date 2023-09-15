import React, { useCallback, useEffect, useId, useState } from 'react';

import { Slider } from '/src/components/atoms/Slider';
import { Spinner } from '/src/components/atoms/Spinner';

export type Props = {
  label: string;
  autoupdate: boolean;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  width?: string | undefined;
  tabIndex?: number | undefined;
  onChange(event: React.SyntheticEvent): void;
};

export const ParameterController: React.FC<Props> = (props: Props) => {
  const { label, autoupdate, min, max, step, defaultValue, width, tabIndex, onChange } = props;

  const [value, setValue] = useState<number>(defaultValue);

  const onChangeCallback = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event);
      setValue(event.currentTarget.valueAsNumber);
    },
    [onChange]
  );

  const id = useId();

  useEffect(() => {
    if (autoupdate) {
      setValue(defaultValue);
    }
  }, [autoupdate, defaultValue]);

  return (
    <dl className='ParameterController' style={width ? { width } : { width: 'auto' }}>
      <dt>
        <label htmlFor={id}>{label}</label>
        <Spinner id={id} value={value} min={min} max={max} step={step} tabIndex={tabIndex} onChange={onChangeCallback} />
      </dt>
      <dd>
        <Slider label={label} value={value} min={min} max={max} step={step} tabIndex={tabIndex} onChange={onChangeCallback} />
      </dd>
    </dl>
  );
};
