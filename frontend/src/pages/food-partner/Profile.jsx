import React, { useEffect, useState } from 'react'
import '../../styles/profile.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const { id } = useParams()
    const [ profile, setProfile ] = useState(null)
    const [ videos, setVideos ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)
    const [ errorMessage, setErrorMessage ] = useState('')

    useEffect(() => {
        let isCurrent = true
        setIsLoading(true)
        setErrorMessage('')

        axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                if (!isCurrent) return
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems ?? [])
            })
            .catch(error => {
                if (!isCurrent) return
                const serverMessage = error.response?.data?.message
                setErrorMessage(
                    typeof serverMessage === 'string'
                        ? serverMessage
                        : error.response
                            ? 'We could not load this food partner profile.'
                            : 'Unable to reach the server. Please try again later.',
                )
            })
            .finally(() => {
                if (isCurrent) setIsLoading(false)
            })

        return () => { isCurrent = false }
    }, [ id ])

    const initial = profile?.name?.trim().charAt(0).toUpperCase() || 'F'

    return (
        <main className="profile-page">
            <Link className="profile-back-link" to="/">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m15 18-6-6 6-6M9 12h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to explore
            </Link>

            {isLoading ? (
                <section className="profile-status" role="status">
                    <span className="profile-spinner" aria-hidden="true" />
                    <p>Loading food partner…</p>
                </section>
            ) : errorMessage ? (
                <section className="profile-status profile-status-error" role="alert">
                    <h1>Profile unavailable</h1>
                    <p>{errorMessage}</p>
                </section>
            ) : profile && (
                <>
                    <section className="profile-hero" aria-labelledby="profile-name">
                        <div className="profile-cover" aria-hidden="true">
                            <span className="profile-cover-tag">Made with care</span>
                        </div>
                        <div className="profile-hero-content">
                            <div className="profile-avatar" aria-hidden="true">{initial}</div>
                            <div className="profile-heading">
                                <span className="profile-eyebrow">Food partner</span>
                                <h1 id="profile-name">{profile.name}</h1>
                                <p className="profile-address">
                                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.7" />
                                        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.7" />
                                    </svg>
                                    {profile.address || 'Location not provided'}
                                </p>
                            </div>
                            <div className="profile-video-count" aria-label={`${videos.length} food videos`}>
                                <span>{videos.length}</span>
                                <span>{videos.length === 1 ? 'food video' : 'food videos'}</span>
                            </div>
                        </div>
                    </section>

                    <section className="profile-menu" aria-labelledby="profile-menu-title">
                        <header className="profile-menu-heading">
                            <div>
                                <span className="profile-eyebrow">A taste of what we do</span>
                                <h2 id="profile-menu-title">From our kitchen</h2>
                            </div>
                            {videos.length > 0 && (
                                <span className="profile-menu-count">{videos.length} {videos.length === 1 ? 'dish' : 'dishes'}</span>
                            )}
                        </header>

                        {videos.length > 0 ? (
                            <div className="profile-grid">
                                {videos.map((video) => (
                                    <article key={video._id} className="profile-grid-item">
                                        <video
                                            className="profile-grid-video"
                                            src={video.video}
                                            muted
                                            controls
                                            playsInline
                                            preload="metadata"
                                            aria-label={`${video.name || 'Food'} video`}
                                        />
                                        <div className="profile-video-copy">
                                            <h3>{video.name || 'Featured dish'}</h3>
                                            {video.description && <p>{video.description}</p>}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="profile-empty">
                                <span className="profile-empty-icon" aria-hidden="true">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 7.5h16M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                        <path d="m10 11 5 3-5 3v-6Z" fill="currentColor" />
                                    </svg>
                                </span>
                                <h3>The kitchen is just getting started</h3>
                                <p>Food videos from this partner will show up here.</p>
                            </div>
                        )}
                    </section>
                </>
            )}
        </main>
    )
}

export default Profile
