import React from 'react'

const ContentSection = () => {
    return (
        <section class="bg-lightCard ">
            <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div class="font-light text-gray-500 sm:text-lg ">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">We've streamlined the process

                    </h2>
                    <p class="mb-4">Access your reports effortlessly through our website. Our platform is designed to provide you with a seamless experience, enabling you to quickly gather the insights you need. Whether you're managing data for a small project or handling complex analytics, our website offers the flexibility and speed to meet your demands. </p>
                    <p>Simply log in, and with just a few clicks, your reports are ready to download or share. We ensure that your reporting process is as efficient and straightforward as possible, allowing you to focus on what matters most.</p>
                </div>
                <div class="grid grid-cols-2 gap-4 mt-8">
                    <img class="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
                    <img class="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
                </div>
            </div>
        </section>
    )
}

export default ContentSection