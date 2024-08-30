import React from 'react'

const ContentSection = () => {
    return (
        <section className="bg-lightCard">
        <div className="gap-16 items-center py-10 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2  lg:px-6">
            <div className="font-light text-justify sm:text-lg">
                <h2 className="mb-8 text-3xl lg:text-6xl tracking-tight font-extrabold text-headingColor">
                    Testimonials
                </h2>
                <p className="mb-4 text-paraColor">
                Thanks to IziKemp, I secured a crucial loan for my business expansion. The personalizedrecommendations and expert assistance made all the difference!
                </p>
                <p className='text-paraColor font-bold mb-6'>— Alex M., Successful Entrepreneur</p>
                <p className="mb-4 text-paraColor">
                I always hesitated to seek funding, but with IziKemp, the process became clear and structured. Receiving an immediate and accurate report truly reassured me!
                </p>
                <p className='text-paraColor font-bold mb-6'>— Marie T., Business Creator</p>
            </div>
            <div class="grid grid-cols-2 gap-4 mt-8 lg:mt-0">
                <img class="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
                <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
            </div>
        </div>
    </section>
    
    )
}

export default ContentSection