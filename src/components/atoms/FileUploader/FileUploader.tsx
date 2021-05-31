import React, { useCallback, useRef } from 'react';

export interface Props {
  id: string;
  accept: string;
  disabled: boolean;
  placeholder: string;
  filename: string;
  drag: boolean;
  drop: boolean;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onDragEnter(event: React.DragEvent<HTMLDivElement>): void;
  onDragOver(event: React.DragEvent<HTMLDivElement>): void;
  onDragLeave(event: React.DragEvent<HTMLDivElement>): void;
  onDrop(event: React.DragEvent<HTMLDivElement>): void;
}

export const FileUploader: React.FC<Props> = (props: Props) => {
  const {
    id,
    accept,
    disabled,
    placeholder,
    filename,
    drag,
    drop,
    onChange,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop
  } = props;

  const fileUploaderRef = useRef<HTMLInputElement>(null);

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
      <button
        type="button"
        aria-controls={id}
        disabled={disabled}
        className="text-ellipsis"
        onClick={onClickCallback}
      >
        {filename ? filename : placeholder}
      </button>
      <input
        type="file"
        ref={fileUploaderRef}
        id={id}
        accept={accept}
        disabled={disabled}
        placeholder={placeholder}
        className="visually-hidden"
        onChange={onChange}
      />
    </div>
  );
};
