import React from 'react';

const FileNameInput = ({ fileName, setFileName }) => (
    <div className="file-name-input">
        <label>File Name:</label>
        <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} />
    </div>
);

export default FileNameInput;