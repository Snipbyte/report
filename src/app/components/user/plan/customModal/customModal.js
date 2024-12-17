import React, { useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const CustomModal = ({ onClose, onSelectSubcategory }) => {
    // Categories and subcategories mapping
    const categories = [
        {
            name: "Administrative / Finance",
            subcategories: ["Accounting", "Audit", "Financial Management", "Tax Consulting"]
        },
        {
            name: "Agriculture",
            subcategories: ["Crop Farming", "Livestock", "Agricultural Machinery", "Agroecology"]
        },
        {
            name: "Arts / Media / Culture",
            subcategories: ["Painting", "Music", "Cinema", "Photography", "Theater"]
        },
        {
            name: "Beauty / Wellness",
            subcategories: ["Hairdressing", "Aesthetics", "Spa", "Fitness", "Makeup"]
        },
        {
            name: "Catering",
            subcategories: ["Cooking", "Fast Food", "Catering Service", "Bakery", "Pastry"]
        },
        {
            name: "Tourism",
            subcategories: ["Accommodation", "Guides", "Tourist Transportation", "Travel Agency"]
        },
        {
            name: "Real Estate",
            subcategories: ["Renting", "Buying/Selling", "Property Management", "Rental Investment"]
        },
        {
            name: "Transport / Delivery",
            subcategories: ["Freight Transport", "Passenger Transport", "Express Delivery", "Logistics"]
        },
        {
            name: "Health",
            subcategories: ["General Medicine", "Specialists", "Pharmacy", "Nursing Care"]
        },
        {
            name: "Sports / Leisure",
            subcategories: ["Sports Equipment", "Sports Clubs", "Outdoor Activities", "Sports Events"]
        },
        {
            name: "Internet / E-commerce / Digital",
            subcategories: ["Website Development", "Online Sales", "SEO/Digital Marketing", "Mobile Applications"]
        },
        {
            name: "Event Planning",
            subcategories: ["Weddings", "Concerts", "Conferences", "Corporate Parties"]
        },
        {
            name: "Sustainable Development",
            subcategories: ["Renewable Energy", "Recycling", "Organic Farming", "Eco-Friendly Buildings"]
        },
        {
            name: "Training / Coaching",
            subcategories: ["Personal Coaching", "Online Courses", "Professional Training", "Educational Guidance"]
        },
        {
            name: "Ready-to-Wear",
            subcategories: ["Men", "Women", "Children", "Fashion Accessories"]
        },
        {
            name: "Auto / Motorcycles / Mobility",
            subcategories: ["Dealerships", "Garages", "Accessories", "Vehicle Rentals"]
        },
        {
            name: "Cleaning",
            subcategories: ["Domestic Cleaning", "Industrial Cleaning", "Office Maintenance", "Hygiene Services"]
        },
        {
            name: "Construction / Craftsmanship",
            subcategories: ["Construction", "Renovation", "Electricity", "Plumbing"]
        },
        {
            name: "Consulting",
            subcategories: ["Business Strategy", "IT Consulting", "Management", "HR/Personnel"]
        },
        {
            name: "Start-up",
            subcategories: ["Technology", "Innovation", "Fundraising", "Prototyping"]
        },
    ];


    // State to track the selected category
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-3/4 lg:w-4/5 max-h-[90vh] overflow-auto">

                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-2xl font-semibold text-headingColor">
                        {selectedCategory
                            ? `Subcategories for "${selectedCategory.name}"`
                            : "To get started, what will your business be?"}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-headingColor text-3xl">
                        &times;
                    </button>
                </div>

                {/* Back Button */}
                {selectedCategory && (
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className="flex items-center mb-4 text-headingColor hover:text-white hover:bg-btnColor duration-500 bg-gray-100 px-5 py-3"
                    >
                        <MdKeyboardArrowLeft className="mr-2 text-2xl" />
                        Back to categories
                    </button>
                )}

                {/* Categories or Subcategories */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {!selectedCategory
                        ? categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedCategory(category)}
                                className="w-full group flex justify-between items-center px-4 py-3 bg-gray-100 text-headingColor rounded-lg shadow-sm hover:bg-btnColor hover:text-white transition duration-300"
                            >
                                <span>{category.name}</span>
                                <MdKeyboardArrowRight className="text-xl font-bold group-hover:text-white" />
                            </button>
                        ))
                        : selectedCategory.subcategories.map((sub, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    onSelectSubcategory(sub); // Pass the chosen subcategory
                                    onClose(); // Close the modal
                                }}
                                className="w-full flex items-center px-4 py-3 bg-gray-100 text-headingColor rounded-lg shadow-sm hover:bg-btnColor hover:text-white transition duration-300"
                            >
                                {sub}
                            </button>
                        ))}
                </div>
            </div >
        </div >
    );
};

export default CustomModal;
