import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadIcon from '../assets/images/icon-upload.svg'
const MAX_SIZE = 500 * 1024; // 500KB

const DragAndDrop = () => {
    const [preview, setPreview] = useState(null);
    const [uploadError, setUploadError] = useState(false);

    const onDrop = (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            const { file, errors } = rejectedFiles[0];
            console.log(errors)
            console.log(`Rejected file: ${file.name}`);
            errors.forEach(error => {
                if (error.code === 'file-too-large') {
                    setUploadError(prev => !prev);
                    console.error('File is too large.');
                    console.log(uploadError)
                }
                if (error.code === 'file-invalid-type') {
                    console.error('Invalid file type.');
                }
            });
        } else {
            const file = acceptedFiles[0];
            console.log(`Accepted file: ${file.name}`);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setUploadError(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxSize: MAX_SIZE,
        accept: {
            'image/*': ['.jpeg, .png']
        },
        multiple: false
    });

    const handleForm = (e) => {
        e.preventDefault();
    }

    return (
        <div className='form-wrapper'>
            <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
            <p>Secure your spot at next year's biggest coding conference.</p>

            <form onSubmit={handleForm}>
                <label htmlFor="avatar">Upload Avatar</label>
                <div {...getRootProps()} className='dropzone'>
                    <input {...getInputProps()} id='avatar' required/>
                    {preview ? (
                        <div>
                            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '70px' }} />
                            <div className='dz-btns'>
                                <button type="button" className='dropzone-btn' onClick={() => setPreview(null)}>Remove Image</button>
                                <button type="button" className='dropzone-btn' onClick={() => document.getElementById('avatar').click()}>Change Image</button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className='dropzone-img-wrapper'><img src={uploadIcon} alt="drop zone icon" /></div>
                            <p>Drag & drop, or click to upload</p>
                        </div>
                    )}
                </div>
                {
                    uploadError
                        ?
                        <p className='upload-error'>File too large. Please upload a photo under 500KB.</p>
                        :
                        <p className='upload-no-error'>Upload your photo (JPG or PNG, max size: 500KB).</p>
                }

                <div className='form-field'>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id='name' placeholder='enter your name' required />
                </div>
                <div className='form-field'>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id='email' placeholder='enter your email' required />
                    <p>Please enter a valid email address</p>
                </div>
                <div className='form-field'>
                    <label htmlFor="github">Github Username</label>
                    <input type="text" id='github' placeholder='github @username' required />
                </div>
                <input type="submit" value="Generate My Ticket" className='form-btn' />
            </form>
        </div>
    );
};

export default DragAndDrop;