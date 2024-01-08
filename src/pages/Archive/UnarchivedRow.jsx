import React, { useState } from 'react'
import Modal from '../../components/Modal';
import './unarchive.css'

function UnarchivedRow({ activity, reFetch }) {
    const [isOpen, setIsOpen] = useState(false);
    const toUnarchive = async () => {
        try {
            const response = await fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${activity.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "is_archived": false
                })
            });
            if (!response.ok) {
                console.log(response);
                // const errorData = await response.json();
                // throw new Error(`Unable to archive. Server response: ${errorData.message}`);
                throw new Error('Unable to archive')
            }
            reFetch();
        } catch (error) {
            console.error(error);
        }
    }

    const onClose = () => {
        setIsOpen(false);
    }
    return (
        <tr>
            <td>
                <span className='activity-id' onClick={() => { setIsOpen(true) }}>{activity.id}</span>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <pre>{JSON.stringify(activity, null, 2)}</pre>
                </Modal>
            </td>
            <td>
                <button className='unarchive-btn' onClick={toUnarchive}>Unarchive</button>
            </td>
        </tr>
    )
}

export default UnarchivedRow