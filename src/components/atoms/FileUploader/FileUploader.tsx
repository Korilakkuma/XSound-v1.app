import React, { useState, useCallback, useRef } from 'react';

export interface Props {
  id: string;
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
    id,
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

    onDragEnter(event);

    setDrag(true);
    setDrop(false);
  }, [onDragEnter]);

  const onDragOverCallback = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();

    onDragOver(event);
  }, [onDragOver]);

  const onDragLeaveCallback = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();

    onDragLeave(event);

    setDrag(false);
    setDrag(false);
  }, [onDragLeave]);

  const onDropCallback = useCallback((event: React.SyntheticEvent) => {
    event.preventDefault();

    onDrop(event);

    setDrag(false);
    setDrop(true);
  }, [onDrop]);

  return (
    <div
      className={`FileUploader${drag ? ' -drag' : ''}${drop ? ' -drop' : ''}`}
      onDragEnter={onDragEnterCallback}
      onDragOver={onDragOverCallback}
      onDragLeave={onDragLeaveCallback}
      onDrop={onDropCallback}
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
        className="visual-hidden"
        onChange={onChange}
      />
    </div>
  );
};
