"use client";
import React, { useState } from 'react';
import HomeMainPage from '../homepage/homeMainPage/homeMainPage';
import LandingMainPage from '../landingPage/landingMainPage/landingMainPage';
import AboutMainPage from '../about/aboutMainPage/aboutMainPage';
import ContactMainPage from '../contact/contactMainPage/contactMainPage';
import BlogMainPage from '../blog/blogMainPage/blogMainPage';

const ContentManagementMainpage = () => {
    const [activeTab, setActiveTab] = useState('Landing Page');

    // Function to render the active tab component
    const renderActiveTab = () => {
        switch (activeTab) {
            case 'Landing Page':
                return <LandingMainPage/>;
            case 'Home':
                return <HomeMainPage />;
            case 'About':
                return <AboutMainPage/>;
            default:
                return <LandingMainPage />;
        }
    };

    return (
        <div className="flex flex-col items-center my-6">
            {/* Tab navigation */}
            <div className="flex items-center justify-center gap-10 overflow-auto mb-6">
                {['Landing Page', 'Home', 'About', ].map((tab) => (
                    <p
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`cursor-pointer ${activeTab === tab ? 'text-white bg-desColor rounded-md p-2 font-bold' : ''}`}
                    >
                        {tab}
                    </p>
                ))}
            </div>

            {/* Render the active tab component */}
            <div className="w-full">
                {renderActiveTab()}
            </div>
        </div>
    );
};

export default ContentManagementMainpage;
