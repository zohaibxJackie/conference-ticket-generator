import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadIcon from '../assets/images/icon-upload.svg'
import { useNavigate } from 'react-router-dom';
const MAX_SIZE = 500 * 1024; // 500KB


const DragAndDrop = ({ setAvatarImage, setEmail, setUsername, setGithubUsername }) => {
    const [preview, setPreview] = useState(null);
    const [uploadError, setUploadError] = useState(false);

    const navigate = useNavigate();

    const onDrop = (acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            const { file, errors } = rejectedFiles[0];
            errors.forEach(error => {
                if (error.code === 'file-too-large') {
                    setUploadError(true);
                }
            });
        } else {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            setAvatarImage(file);
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
            'image/*': ['.jpeg', '.png'] // Fixing the syntax here
        },
        multiple: false
    });

    const handleForm = (e) => {
        e.preventDefault();
        navigate('/conference-ticket-generator/ticket');

    }

    return (
        <div className="form-wrapper">
            <h1 tabIndex="0">Your Journey to Coding Conf 2025 Starts Here!</h1>
            <p tabIndex="0">Secure your spot at next year's biggest coding conference.</p>

            <form onSubmit={handleForm} aria-labelledby="form-title">
                <label htmlFor="avatar">Upload Avatar</label>
                <div
                    {...getRootProps()}
                    className="dropzone"
                    role="button"
                    aria-label="Upload your avatar. Drag and drop or click to upload."
                    tabIndex="0"
                    onKeyDown={(e) => e.key === "Enter" && document.getElementById('avatar').click()}
                >
                    <input {...getInputProps()} id="avatar" required aria-required="true" />
                    {preview ? (
                        <div>
                            <img
                                src={preview}
                                alt="Uploaded avatar preview"
                                style={{ maxWidth: '100%', maxHeight: '70px' }}
                            />
                            <div className="dz-btns">
                                <button
                                    type="button"
                                    className="dropzone-btn"
                                    onClick={() => setPreview(null)}
                                    aria-label="Remove uploaded image"
                                >
                                    Remove Image
                                </button>
                                <button
                                    type="button"
                                    className="dropzone-btn"
                                    onClick={() => document.getElementById('avatar').click()}
                                    aria-label="Change uploaded image"
                                >
                                    Change Image
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="dropzone-img-wrapper">
                                <img src={uploadIcon} alt="Upload icon" />
                            </div>
                            <p>Drag & drop, or click to upload</p>
                        </div>
                    )}
                </div>
                {uploadError ? (
                    <p className="upload-error" role="alert">File too large. Please upload a photo under 500KB.</p>
                ) : (
                    <p className="upload-no-error">Upload your photo (JPG or PNG, max size: 500KB).</p>
                )}

                <div className="form-field">
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                        required
                        aria-required="true"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        required
                        aria-required="true"
                        aria-describedby="email-desc"
                    />
                    <p id="email-desc">Please enter a valid email address</p>
                </div>

                <div className="form-field">
                    <label htmlFor="github">Github Username</label>
                    <input
                        type="text"
                        id="github"
                        placeholder="GitHub @username"
                        onChange={(e) => setGithubUsername(e.target.value)}
                        autoComplete="off"
                        required
                        aria-required="true"
                    />
                </div>

                <input
                    type="submit"
                    value="Generate My Ticket"
                    className="form-btn"
                    aria-label="Generate your ticket"
                />
            </form>
        </div>

    );
};

export default DragAndDrop;