import React, { useState, useEffect, useCallback } from 'react';
import { Slider } from '../../atoms/Slider';
import { Spinner } from '../../atoms/Spinner';

export interface Props {
  label: string;
  id: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  width?: string;
  tabIndex?: number;
  onChange(event: React.SyntheticEvent): void;
}

export const ParameterController: React.FC<Props> = (props: Props) => {
  const {
    label,
    id,
    min,
    max,
    step,
    defaultValue,
    width,
    tabIndex,
    onChange
  } = props;

  const [value, setValue] = useState<number>(defaultValue);

  const onChangeCallback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    setValue(event.currentTarget.valueAsNumber);
  }, [onChange]);

  useEffect(() => {
    if (id === 'audio-fieldset-current-time') {
      setValue(defaultValue);
    }
  }, [id, defaultValue]);

  return (
    <dl className="ParameterController" style={width ? { width } : { width: 'auto' }}>
      <dt>
        <label htmlFor={id}>{label}</label>
        <Spinner
          id={id}
          value={value}
          min={min}
          max={max}
          step={step}
          tabIndex={tabIndex}
          onChange={onChangeCallback}
        />
      </dt>
      <dd>
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          tabIndex={tabIndex}
          onChange={onChangeCallback}
        />
      </dd>
    </dl>
  );
};