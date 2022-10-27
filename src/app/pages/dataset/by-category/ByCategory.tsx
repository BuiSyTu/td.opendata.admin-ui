import { useState } from 'react'
import { TypeModal } from 'src/setup/redux/slices/dataset'

import { PageTitle } from 'src/_metronic/layout/core'
import FormModal from '../components/FormModal'

interface ByCategoryPageProps {
    datasetId: string
    title: string
}

const ByCategoryPage: React.FC<ByCategoryPageProps> = ({ datasetId, title }) => {
    const [modalId, setModalId] = useState(datasetId)
    const [typeModal, setTypeModal] = useState<TypeModal>(TypeModal.edit)
    const [modalVisible, setModalVisible] = useState(true)

    return (
        <>
            <PageTitle breadcrumbs={[]}>{title}</PageTitle>
            <div className='card mb-5 mb-xl-12 p-10'>
                <FormModal
                    modalId={modalId}
                    setModalId={setModalId}
                    setModalVisible={setModalVisible}
                    typeModal={typeModal}
                    setTypeModal={setTypeModal}
                    modalVisible={modalVisible}
                    isModal={false}
                    viewModes={[]}
                />
            </div>
        </>
    )
}

export default ByCategoryPage
