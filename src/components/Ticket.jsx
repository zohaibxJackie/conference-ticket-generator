import React, { useEffect, useState } from 'react';
import ticketImage from '../assets/images/pattern-ticket.svg';
import githubImage from '../assets/images/icon-github.svg';
import logo from '../assets/images/logo-full.svg';
import { useNavigate } from 'react-router-dom';

const Ticket = ({ avatarImage, githubUsername, username, email }) => {
    const [avatarUrl, setAvatarUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (avatarImage === null || githubUsername === '' || username === '' || email === '') {
            navigate('/conference-ticket-generator/');
        }
        if (avatarImage) {
            const url = URL.createObjectURL(avatarImage);
            setAvatarUrl(url);

            // Clean up the URL object when the component unmounts
            return () => URL.revokeObjectURL(url);
        }
    }, [avatarImage]);

    return (
        <div className='ticket-page'>
            <h1>Congrats, <span className='gradient-text'>{username}</span><br />Your ticket is ready.</h1>
            <p>We've emailed your ticket to<br /><span className='highlighted-text'>{email}</span> and will send updates in<br />the run up to the event.</p>

            <div className='ticket-wrapper'>
                <img src={ticketImage} id='ticket-body' alt="ticket image" />
                <span id='ticket-number'>#10906</span>

                <div className='ticket-header'>
                    <img src={logo} id='ticket-logo' alt="Logo image" />
                    <p id='ticket-info'>Jan 31, 2025 / Austin, TX</p>
                </div>
                <div className='ticket-footer'>
                    {avatarUrl && <img src={avatarUrl} id='ticket-avatar' alt="Avatar image" />}
                    <div>
                        <p id='username'>{username}</p>
                        <div className='tf-info-area'>
                            <img src={githubImage} id='github-icon' alt="Github icon" />
                            <span id='github-username'>@{githubUsername}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ticket;