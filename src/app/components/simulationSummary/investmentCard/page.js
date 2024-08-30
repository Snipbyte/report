import React from 'react'

const InvestmentCard = () => {
    return (
        <div className='bg-lightCard border-2 p-4 w-full h-full' >
            <p className='text-btnColor font-bold text-3xl mt-14 mb-8'>Which investment to choose?</p>
            <div className='flex items-center justify-between border-b border-blue-500 pb-5'>
                <div className='text-headingColor text-md font-bold'>
                    <p className='mb-1'>Investment(s)</p>
                    <p>Considered</p>
                </div>
                <div className='text-md'>
                    <div className='flex items-center mb-1 gap-1'>
                        <input id='scpi' type='checkbox' />
                        <label for="scpi">SCPI</label>
                    </div>
                    <div className='flex items-center gap-1'>
                        <input id='life' type='checkbox' />
                        <label for="life">Life insurance</label>
                    </div>
                </div>
                <div className='text-md'>
                    <div className='flex items-center mb-1 gap-1'>
                        <input id='real' type='checkbox' />
                        <label for="real">Real Estate Direct</label>
                    </div>
                    <div className='flex items-center gap-1'>
                        <input id='other' type='checkbox' />
                        <label for="other">Others</label>
                    </div>
                </div>
            </div>
            <div className='flex text-headingColor items-center justify-between mt-6 mb-2'>
                <label for="name">Name</label>
                <div>
                    <select id='name' className="text-headingColor  bg-transparent border-2 p-2.5 outline-none">
                        <option value="01">Mr.</option>
                        <option value="02">Ms</option>
                        <option value="02">Miss</option>
                    </select>
                    <input id='name' className='bg-transparent border-2 p-2 outline-none' type='text' />
                </div>
            </div>
            <div className='flex text-headingColor items-center justify-between mb-2 '>
                <label for="email">Email</label>
                <input id='email' className='bg-transparent border-2 p-2 outline-none w-72' type='text' />
            </div>
            <div className='flex text-headingColor items-center justify-between mb-2 '>
                <label for="password">Password</label>
                <input id='password' className='bg-transparent border-2 p-2 outline-none w-72' type='text' />
            </div>
            <div className='flex text-headingColor items-center justify-between mb-4 '>
                <label for="city">City</label>
                <input id='city' className='bg-transparent border-2 p-2 outline-none w-72' type='text' placeholder='City, Postal Code ...' />
            </div>
            <div className='flex text-headingColor items-center justify-between mb-2 '>
                <label for="comment">Comment</label>
                <textarea id='comment' rows={2} className='bg-transparent border-2 p-2 outline-none w-72' />
            </div>
            <div className='flex  justify-end'>
                <button className='w-72 text-lg p-2 duration-700 bg-btnColor text-white hover:bg-hoverBtnColor text-center rounded-md mt-4'>Request for full study</button>
            </div>
            <p className='text-headingColor text-md w-full text-end mt-2'>Confidential and without obligation</p>
        </div>
    )
}

export default InvestmentCard