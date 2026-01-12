import React, { useState, useEffect, useRef } from 'react';
import VimeoPlayer from '@vimeo/player';

const VimeoVideo = ({ videoId, backgroundColor }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const videoRef = useRef(null);
    const modalVideoRef = useRef(null);

    useEffect(() => {
        let player;
        let modalPlayer;

        if (videoRef.current && !isModalOpen) {
            player = new VimeoPlayer(videoRef.current, {
                id: videoId,
                background: true,
                muted: true
            });

            videoRef.current.addEventListener('mouseenter', () => player.play());
            videoRef.current.addEventListener('mouseleave', () => player.pause());
        }

        if (isModalOpen && modalVideoRef.current) {
            modalPlayer = new VimeoPlayer(modalVideoRef.current, {
                id: videoId,
                title: false,
                byline: false,
                portrait: false,
                controls: true,
                autoplay: true
            });

            modalPlayer.on('play', () => {
                console.log('Modal video is playing');
            });

            modalPlayer.on('error', (error) => {
                console.error('Error with modal video:', error);
            });
        }

        return () => {
            if (player) {
                player.unload();
            }
            if (modalPlayer) {
                modalPlayer.unload();
            }
        };
    }, [isModalOpen, videoId]);

    const handleOpenModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                className="project"
                style={{ backgroundColor, position: 'relative', overflow: 'hidden', width: '100%', height: '100%', cursor: 'pointer' }}
                onClick={handleOpenModal}
                ref={videoRef}
            ></div>

            {isModalOpen && (
                <div className="modal" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} ref={modalVideoRef}></div>
                </div>
            )}

            <style jsx>{`
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                }
                .modal-content {
                    background: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    max-width: 90%;
                    max-height: 90%;
                }
                .project {
                    max-width: 100%;
                    height: auto;
                }
            `}</style>
        </>
    );
};

export default VimeoVideo;
