import React, {useEffect, useState} from 'react';
import {IPanel} from '../../interfaces/IPanel';
import {Div, Panel, PanelHeader, SimpleCell} from '@vkontakte/vkui';
import {Icon28ChevronLeftOutline} from '@vkontakte/icons';
import {useRouter} from '@happysanta/router';

const FTPls = ({id}: IPanel): JSX.Element => {
  const router = useRouter();
  const [ls, setLs] = useState<any>();
  const [currentPath, setCurrentPath] = useState('./')
  const getLs = async (path = './') => {
    await fetch(`http://localhost:4000/api/ftp/ls`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({path: path})
    })
      .then(async response => {
        const data = await response.json()
        console.log(data)
        setLs(data)
      });
  }
  const download = async (path: string, name: string) => {
    await fetch(`http://localhost:4000/api/ftp/download`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({path: path})
    }).then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(
          new Blob([blob]),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          name,
        );

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  }
  useEffect(() => {

    getLs()
  }, [])
  return (
    <Panel id={id} >
      <PanelHeader
        className={'results__header'}
        before={<Icon28ChevronLeftOutline onClick={() => router.popPage()} style={{color: '#B8C1CC', marginTop: 3}}/>}

      >
        FTP
      </PanelHeader>
      <Div>
        {ls && ls.map((item: any, index: number) =>
          <SimpleCell key={index} onClick={() => {
            if (item.type === 'd') {
              getLs(`${currentPath}/${item.name}`)
              setCurrentPath(prevState => prevState+`${item.name}/`)
            }
            else {
              download(`${currentPath}/${item.name}`, item.name)
            }
          }}>
            {item.name} : {item.type === 'd' ? 'Директория' : 'Файл'}
          </SimpleCell>
        )}
      </Div>
    </Panel>
  );
};

export default FTPls;