import React from 'react'
import NotePage from './NotePage'
import { useRouteParams } from '../lib/router'
import { StorageEdit, StorageCreate } from './Storage'
import { useDb } from '../lib/db'
import AttachmentsPage from './AttachmentsPage/AttachmentsPage'
import TutorialsPage from './Tutorials/TutorialsPage'
import useRedirectHandler from '../lib/router/redirect'
import styled from '../lib/styled'

const NotFoundPageContainer = styled.div`
  padding: 15px 25px;
`

export default () => {
  const routeParams = useRouteParams()
  const db = useDb()

  useRedirectHandler()

  switch (routeParams.name) {
    case 'storages.allNotes':
    case 'storages.bookmarks':
    case 'storages.notes':
    case 'storages.trashCan':
    case 'storages.tags.show':
      return <NotePage />
    case 'storages.attachments':
      return <AttachmentsPage />
    case 'storages.create':
      return <StorageCreate />
    case 'tutorials.show':
      return <TutorialsPage pathname={routeParams.path} />
    case 'storages.edit':
      const storage = db.storageMap[routeParams.storageId]
      if (storage != null) {
        return <StorageEdit storage={storage} />
      } else {
        break
      }
  }
  return (
    <NotFoundPageContainer>
      <h1>Page not found</h1>
      <p>Check the URL or click other link in the left side navigation.</p>
    </NotFoundPageContainer>
  )
}
