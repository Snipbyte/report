import ContentManagementMainpage from '@/app/components/admin/contentManagement/contentManagementMainpage/contentManagementMainpage'
import AdminLayout from '@/app/components/layouts/adminLayout/page'
import React from 'react'

const ContentManagement = () => {
  return (
    <AdminLayout>
       <ContentManagementMainpage />
    </AdminLayout>
  )
}

export default ContentManagement