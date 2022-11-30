import React from 'react';
import {Button, Group, Panel, PanelHeader, SimpleCell} from '@vkontakte/vkui';
import {useLocation, useRouter} from '@happysanta/router';
import {
    MODAL_INFO,
    PAGE_MAIN,
    PAGE_DOCUMENTS,
    PANEL_MAIN,
    VIEW_MAIN,
    PAGE_AUTH,  PAGE_USERS
} from '../../router';
import {Icon24Help} from '@vkontakte/icons';
import {useLocalStorage} from "usehooks-ts";

const Menu = () => {
  const location = useLocation();
  const router = useRouter();
  const [isAuth,] = useLocalStorage<any>('isAuth', false)
  return (
    <Panel>
    <PanelHeader
      before={
        <>
        
        <Icon24Help
          className={'app__info_icon'}
          onClick={() => router.pushModal(MODAL_INFO)}
        />
          <span className={'app__info_title'}>Главная</span>
        </>
      }
    
    >
    </PanelHeader>
    <Group>
        <SimpleCell
         selected={location.getViewActivePanel(VIEW_MAIN) === PANEL_MAIN}
         style={{width: 'auto'}}
         onClick={() => router.pushPage(PAGE_DOCUMENTS)}
        >
          Результаты
        </SimpleCell>
        {isAuth && (isAuth.role === 1) &&
            <SimpleCell
                selected={location.getViewActivePanel(VIEW_MAIN) === PANEL_MAIN}
                style={{width: 'auto' , textAlign: 'center'}}
                onClick={() => router.pushPage(PAGE_USERS)}

            >
                Пользователи
            </SimpleCell>
        }
       {/* // проверяет роль пользователя чтобы показать всех пользователей*/}
        {isAuth && isAuth.id &&
            < SimpleCell
            selected={location.getViewActivePanel(VIEW_MAIN) === PANEL_MAIN}
            style={{width: 'auto'}}
            onClick={() => router.pushPage(PAGE_USERS,{id:isAuth.id})}
            >
            Профиль
            </SimpleCell>
        }
        <SimpleCell
            selected={location.getViewActivePanel(VIEW_MAIN) === PANEL_MAIN}
            style={{width: 'auto'}}
            onClick={() => router.pushPage(PAGE_DOCUMENTS)}
        >
            Задания
        </SimpleCell>
      </Group>
      <Button  onClick={() => router.pushPage(PAGE_AUTH)} style={{backgroundColor: '#54ad32', width: '10%'}}>Выход</Button>
      </Panel>
  );
};

export default Menu;