
import {Div, Panel, PanelHeader, Text} from '@vkontakte/vkui';
import React, {useEffect, useState} from 'react';

import {IPanel} from '../../interfaces/IPanel';
import {useParams, useRouter} from '@happysanta/router';

import {Icon28ChevronLeftOutline} from "@vkontakte/icons";
import {DocumentsAttributes} from "../../interfaces/DocumentsAttributes";



const Documents = ({id}: IPanel): JSX.Element => {
    const [documents, setDocuments] = useState<DocumentsAttributes[]>();
    const router = useRouter();
    const getDocuments = async () => {
        await fetch(`http://krbackendAC.sbut0ca.repl.co/api/documents`, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async response => {
                const data = await response.json()
                console.log(data)
                setDocuments(data)
            });
    }


    useEffect(() => {
        getDocuments()
    }, [])

    return (
        <Panel id={id} >
            <PanelHeader
                className={'results__header'}
                before={<Icon28ChevronLeftOutline onClick={() => router.popPage()} style={{color: '#B8C1CC', marginTop: 3}}/>}

            >
                Результаты
            </PanelHeader>
            {documents && documents.map(document =>
                <Div className={'results__data'}>
                    <Text>{`${document.DocumentName} ${document.DocumentCode} ${document.DocumentType}`}</Text>

                </Div>
            )}
        </Panel>
    );
};

export default Documents;

