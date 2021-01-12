import React, { useState, useCallback, useRef } from 'react';

export interface Props {
  label: string;
  accept: string;
  placeholder: string;
  filename: string;
  onChange(event: React.SyntheticEvent): void;
  onDragEnter(event: React.SyntheticEvent): void;
  onDragOver(event: React.SyntheticEvent): void;
  onDragLeave(event: React.SyntheticEvent): void;
  onDrop(event: React.SyntheticEvent): void;
}

export const FileUploader: React.FC<Props> = (props: Props) => {
  const {
    label,
    accept,
    placeholder,
    filename,
    onChange,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop
  } = props;

  const fileUploaderRef = useRef<HTMLInputElement>(null);

  const [drag, setDrag] = useState<boolean>(false);
  const [drop, setDrop] = useState<boolean>(false);

  const onClickCallback = useCallback(() => {
    const node = fileUploaderRef.current;

    if (node === null) {
      return;
    }

    node.value = '';
    node.click();
  }, []);

  const onDragEnterCallback = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();

    setDrag(true);
    setDrop(false);

    onDragEnter(event);
  }, [onDragEnter]);

  const onDragOverCallback = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();

    onDragOver(event);
  }, [onDragOver]);

  const onDragLeaveCallback = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();

    setDrag(false);
    setDrag(false);

    onDragLeave(event);
  }, [onDragLeave]);

  const onDropCallback = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();

    setDrag(false);
    setDrop(true);

    onDrop(event);
  }, [onDrop]);

  return (
    <div
      className={`FileUploader${drag ? ' -drag' : ''}${drop ? ' -drop' : ''}`}
      onDragEnter={onDragEnterCallback}
      onDragOver={onDragOverCallback}
      onDragLeave={onDragLeaveCallback}
      onDrop={onDropCallback}
    >
      <button type="button" className="text-ellipsis" aria-label={label} onClick={onClickCallback}>{filename ? filename : placeholder}</button>
      <input type="file" ref={fileUploaderRef} hidden accept={accept} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};
