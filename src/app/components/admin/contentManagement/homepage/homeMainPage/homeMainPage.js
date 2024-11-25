import React from 'react'
import SimulationCard from '../simulationCard/simulationCard'
import ChooseSection from '../chooseSection/chooseSection'
import ServiceCard from '../serviceCard/serviceCard'
import WorkSection from '../workSection/workSection'
import CalculatorSection from '../calculatorSection/calculatorSection'
import TestimonialSection from '../testimonialSection/testimonialSection'
import BlogNews from '../blogNews/blogNews'
import ServicesContent from '../servicesContent/servicesContent'
import ClientPortal from '../clientPortal/clientPortal'
import ContactSection from '../contactSection/contactSection'


const HomeMainPage = () => {
    return (
        <div className='p-2'>
            <SimulationCard />
            <ChooseSection />
            {/* <ServiceCard /> */}
            <WorkSection />
            <CalculatorSection />
            {/* <TestimonialSection /> */}
            {/* <BlogNews /> */}
            <ServicesContent />
            <ClientPortal />
            <ContactSection />
        </div>
    )
}

export default HomeMainPage