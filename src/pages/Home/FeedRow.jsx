import React, { useState } from 'react'
import './feedRow.css'
import Modal from '../../components/Modal';
import { Card } from "../../components/ui/card";

function FeedRow({ activity, reFetch, updateActivitiesData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const toArchive = async () => {
        setIsRunning(true);
        try {
            const response = await fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${activity.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "is_archived": true
                })
            });
            if (!response.ok) {
                console.log(response);
                throw new Error('Unable to archive')
            }
            // reFetch()
            updateActivitiesData(activity.id);
        } catch (error) {
            console.error(error);
        }
        setIsRunning(false);
    }
    const onClose = () => {
        setIsOpen(false);
    }
    return (
        <div>
            {/* <div>
                <span className='activity-id' onClick={() => { setIsOpen(true) }}>{activity.id}</span>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <pre>{JSON.stringify(activity, null, 2)}</pre>
                </Modal>
            </div>
            <div>
                <button disabled={isRunning} className='archive-btn' onClick={toArchive}>{isRunning ? 'Please Wait...': 'Archive'}</button>
            </div> */}
            <Card>
                </Card>
        </div>
    )
}

export default FeedRow