import React from 'react'

const HistoryTable = () => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white ">
                <thead>
                    <tr className="bg-lightCard text-headingColor text-sm uppercase">
                        <th className="text-left py-3 px-4">Report ID</th>
                        <th className="text-left py-3 px-4">Title</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-paraColor text-sm">
                    <tr className="border-b">
                        <td className="py-3 px-4">001</td>
                        <td className="py-3 px-4">Monthly Report</td>
                        <td className="py-3 px-4">2024-09-10</td>
                        <td className="py-3 px-4 text-green-500">Completed</td>
                        <td className="py-3 px-4">
                            <button className="text-blue-500 hover:underline">View</button>
                        </td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-3 px-4">002</td>
                        <td className="py-3 px-4">Annual Report</td>
                        <td className="py-3 px-4">2024-08-30</td>
                        <td className="py-3 px-4 text-yellow-500">Pending</td>
                        <td className="py-3 px-4">
                            <button className="text-blue-500 hover:underline">View</button>
                        </td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-3 px-4">003</td>
                        <td className="py-3 px-4">Sales Report</td>
                        <td className="py-3 px-4">2024-07-20</td>
                        <td className="py-3 px-4 text-red-500">Failed</td>
                        <td className="py-3 px-4">
                            <button className="text-blue-500 hover:underline">View</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default HistoryTable