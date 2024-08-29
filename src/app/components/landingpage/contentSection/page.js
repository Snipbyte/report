import React from 'react'

const ContentSection = () => {
    return (
        <section class="bg-lightCard">
        <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div class="font-light text-gray-500 sm:text-lg">
                <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900">
                    Testimonials
                </h2>
                <p class="mb-4">
                    IziKem played a pivotal role in helping me secure the funding I needed to successfully launch my project. Their immediate report provided me with crucial insights and detailed analysis, which ensured I was thoroughly prepared to tackle the challenges that came my way. Their attention to detail and prompt delivery were exactly what I needed during this critical phase.
                </p>
                <p>
                    The expert consultation I received from IziKem was equally invaluable. They offered guidance and support that went beyond my expectations, making the entire process smoother and more manageable. Their dedication and expertise were key factors in my success, and I truly believe I couldn’t have achieved this milestone without their unwavering support.
                </p>
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