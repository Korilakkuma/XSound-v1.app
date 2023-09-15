import React, { useCallback, useId, useRef } from 'react';

export type Props = {
  accept: string;
  disabled: boolean;
  placeholder: string;
  filename: string;
  drag: boolean;
  drop: boolean;
  tabIndex?: number | undefined;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onDragEnter(event: React.DragEvent<HTMLDivElement>): void;
  onDragOver(event: React.DragEvent<HTMLDivElement>): void;
  onDragLeave(event: React.DragEvent<HTMLDivElement>): void;
  onDrop(event: React.DragEvent<HTMLDivElement>): void;
};

export const FileUploader: React.FC<Props> = (props: Props) => {
  const { accept, disabled, placeholder, filename, drag, drop, tabIndex, onChange, onDragEnter, onDragOver, onDragLeave, onDrop } = props;

  const fileUploaderRef = useRef<HTMLInputElement>(null);

  const id = useId();

  const onClickCallback = useCallback(() => {
    const node = fileUploaderRef.current;

    if (node === null) {
      return;
    }

    node.value = '';
    node.click();
  }, []);

  return (
    <div
      className={`FileUploader${drag ? ' -drag' : ''}${drop ? ' -drop' : ''}`}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <button type='button' aria-controls={id} disabled={disabled} tabIndex={tabIndex} onClick={onClickCallback}>
        {filename ? filename : placeholder}
      </button>
      <input type='file' ref={fileUploaderRef} id={id} accept={accept} disabled={disabled} placeholder={placeholder} tabIndex={-1} onChange={onChange} />
    </div>
  );
};
