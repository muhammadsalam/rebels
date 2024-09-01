// src/app/providers/RouterProvider.tsx
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from 'pages/home';
import { ProfilePage } from 'pages/profile';
import { TeamPage } from 'pages/team';
import { ShopPage } from 'pages/shop';
import { ShopInfoPage } from 'pages/shop-info';
import { QuestsPage } from 'pages/quests';
import { FriendsPage } from 'pages/friends';
import { FriendsInfoPage } from 'pages/friends-info';
import { AboutPage } from 'pages/about';
import { FAQPage } from 'pages/faq';
import useSound from 'use-sound';
import pageClicksAudio from '/assets/sounds/pageclicks.mp3';

export const AppRoutes: React.FC = () => {
    const location = useLocation();
    const [playPageChanged] = useSound(pageClicksAudio)

    useEffect(() => {
        playPageChanged();
    }, [location])

    return <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/info" element={<ShopInfoPage />} />
        <Route path="/quests" element={<QuestsPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/friends/info" element={<FriendsInfoPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
    </Routes>
};
