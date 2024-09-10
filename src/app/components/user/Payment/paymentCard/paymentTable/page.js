import Link from 'next/link'
import React from 'react'

const PaymentTable = () => {
    return (


        <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
            <table class="w-full text-sm text-left rtl:text-right text-paraColor ">
                <thead class="text-headingColor  uppercase bg-paraColor ">
                    <tr>
                        <th scope="col" class="p-4">
                            <div class="flex items-center">
                                <label for="checkbox-all" class="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Package
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Active Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Expiry Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Duration
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Detail
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b text-headingColor hover:bg-gray-100 ">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                <label for="checkbox-table-3" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Yearly
                        </th>
                        <td class="px-6 py-4">
                            7 Aug 2023
                        </td>
                        <td class="px-6 py-4">
                            7 Aug 2024
                        </td>
                        <td class="px-6 py-4">
                            1 Year
                        </td>
                        <td class="px-6 py-4">
                            <Link href="/pricingplan" class="font-medium text-blue-600 hover:underline">View Detail</Link>
                        </td>
                    </tr>
                    <tr class="bg-white border-b text-headingColor hover:bg-gray-100 ">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                <label for="checkbox-table-3" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Yearly
                        </th>
                        <td class="px-6 py-4">
                            1 Jan 2023
                        </td>
                        <td class="px-6 py-4">
                            1 Jan 2024
                        </td>
                        <td class="px-6 py-4">
                            1 Year
                        </td>
                        <td class="px-6 py-4">
                            <Link href="/pricingplan" class="font-medium text-blue-600 hover:underline">View Detail</Link>
                        </td>
                    </tr>
                    <tr class="bg-white border-b text-headingColor hover:bg-gray-100 ">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                <label for="checkbox-table-3" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Yearly
                        </th>
                        <td class="px-6 py-4">
                            22 Nov 2023
                        </td>
                        <td class="px-6 py-4">
                            22 Nov 2024
                        </td>
                        <td class="px-6 py-4">
                            1 Year
                        </td>
                        <td class="px-6 py-4">
                            <Link href="/pricingplan" class="font-medium text-blue-600 hover:underline">View Detail</Link>
                        </td>
                    </tr>
                    <tr class="bg-white border-b text-headingColor hover:bg-gray-100 ">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                <label for="checkbox-table-3" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Yearly
                        </th>
                        <td class="px-6 py-4">
                            13 Mar 2023
                        </td>
                        <td class="px-6 py-4">
                            13 Mar 2024
                        </td>
                        <td class="px-6 py-4">
                            1 Year
                        </td>
                        <td class="px-6 py-4">
                            <Link href="/pricingplan" class="font-medium text-blue-600 hover:underline">View Detail</Link>
                        </td>
                    </tr>
                    <tr class="bg-white border-b text-headingColor hover:bg-gray-100 ">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                <label for="checkbox-table-3" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Yearly
                        </th>
                        <td class="px-6 py-4">
                            8 May 2023
                        </td>
                        <td class="px-6 py-4">
                            8 May 2024
                        </td>
                        <td class="px-6 py-4">
                            1 Year
                        </td>
                        <td class="px-6 py-4">
                            <Link href="/pricingplan" class="font-medium text-blue-600 hover:underline">View Detail</Link>
                        </td>
                    </tr>
                    <tr class="bg-white text-headingColor hover:bg-gray-100 ">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-3" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                <label for="checkbox-table-3" class="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Yearly
                        </th>
                        <td class="px-6 py-4">
                            29 Oct 2023
                        </td>
                        <td class="px-6 py-4">
                            29 Oct 2024
                        </td>
                        <td class="px-6 py-4">
                            1 Year
                        </td>
                        <td class="px-6 py-4">
                            <Link href="/pricingplan" class="font-medium text-blue-600 hover:underline">View Detail</Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default PaymentTable