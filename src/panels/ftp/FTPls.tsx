import React, {useEffect, useState} from 'react';
import {IPanel} from '../../interfaces/IPanel';
import {Button, Div, Panel, PanelHeader, SimpleCell, Text, FormItem, File} from '@vkontakte/vkui';
import {Icon24Document, Icon28ChevronLeftOutline} from '@vkontakte/icons';
import {useRouter} from '@happysanta/router';

const FTPls = ({id}: IPanel): JSX.Element => {
  const router = useRouter();
  const [ls, setLs] = useState<any>();
  const uploadFile = async (e:any) => {
      const fd = new FormData()
      fd.append('file', e.target.files[0])
      fd.append('path', currentPath)
   await fetch(`https://krbackendAC.sbut0ca.repl.co/api/ftp/upload`, {
          method: 'post',
              mode: 'cors',
               body: fd
      }).then( () => {
          getLs(currentPath)
   })
  }
    const [file, setFile] = useState();
  const [currentPath, setCurrentPath] = useState('./')
  const getLs = async (path = './') => {
    await fetch(`https://krbackendAC.sbut0ca.repl.co/api/ftp/ls`, {
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
    await fetch(`http://krbackendAC.sbut0ca.repl.co/api/ftp/download`, {
      method: 'post',
      mode: 'no-cors',
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





          <FormItem top="Загрузите документы">
              <File onChange = {uploadFile}
                  before={<Icon24Document role="presentation" />}
                  size="l"
                  mode="secondary"
              />
          </FormItem>

          <h1>Реестр документов</h1>
          <Button onClick={() =>{
              getLs()
              setCurrentPath(`./`)

          }}>

              Вернуться в корень
          </Button>
        {ls && ls.map((item: any, index: number) =>
          <SimpleCell after={
              <Button>
                  Удалить
              </Button>
          } onClick={() => {
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
