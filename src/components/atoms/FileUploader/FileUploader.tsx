import React, { useCallback, useRef } from 'react';

export interface Props {
  id: string;
  accept: string;
  placeholder: string;
  filename: string;
  drag: boolean;
  drop: boolean;
  onChange(event: React.SyntheticEvent): void;
  onDragEnter(event: React.SyntheticEvent): void;
  onDragOver(event: React.SyntheticEvent): void;
  onDragLeave(event: React.SyntheticEvent): void;
  onDrop(event: React.SyntheticEvent): void;
}

export const FileUploader: React.FC<Props> = (props: Props) => {
  const {
    id,
    accept,
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
        className="text-ellipsis"
        onClick={onClickCallback}
      >
        {filename ? filename : placeholder}
      </button>
      <input
        type="file"
        ref={fileUploaderRef}
        accept={accept}
        placeholder={placeholder}
        className="visually-hidden"
        onChange={onChange}
      />
    </div>
  );
};
