import React from 'react';

interface FileInputProps {
  onChange: (file: FileList) => void;
  accept?: string;
  multiple?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({ onChange, accept, multiple }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(e.target.files);
    }
  };

  return (
    <input
      type="file"
      accept={accept}
      multiple={multiple}
      onChange={handleChange}
      className="hidden"
    />
  );
};

export default FileInput;
