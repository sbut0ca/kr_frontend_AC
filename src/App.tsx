import React, { useEffect, useState } from 'react';
import { BridgePlus } from '@happysanta/bridge-plus';
import { useLocation, useRouter } from '@happysanta/router';
import {
  View,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol, usePlatform, Root, Button, Panel, PanelHeader, Div, Text, FormLayout, FormItem, Input,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';


import {


  PANEL_MAIN,
  PANEL_AUTH,
  PAGE_AUTH,
  VIEW_MAIN,
  VIEW_ONBOARDING,
  PANEL_USERS, PANEL_DOCUMENTS, PAGE_DOCUMENTS
} from './router'


import Auth from './panels/auth/Auth';
import Popout from './components/popouts/PopoutMain';
import ModalMain from './components/modals/ModalMain';
import {AppearanceType} from '@vkontakte/vk-bridge';
import './App.css';
import { useLocalStorage } from 'usehooks-ts';
import Documents from "./panels/documents/Documents";
// import Users from "./panels/user/Users";
// import User from "./panels/user/User";

const App = (): JSX.Element => {
  const [appearance, setAppearance] = useState(null)
  const [isAuth,] = useLocalStorage('isAuth', false)
  const [,setIsAuth] = useLocalStorage('isAuth', false)

  const router = useRouter();
  const location = useLocation();
  const platform = usePlatform();

  const popout = Popout();
  const modal = ModalMain();

  useEffect( () => {
   
    const getTheme = async (): Promise<void> => {
      //@ts-ignore
      BridgePlus.subscribe("VKWebAppUpdateConfig", (data) => {
        // @ts-ignore
        if (data?.error_type !== "auth_error") {
          // @ts-ignore
          setAppearance(data.appearance)
        }
      });
    }
   
    const ShowOnboarding = async (): Promise<void> => {
      const onboardingIsShowed = await BridgePlus.storageGetKey("ONBOARDING_IS_SHOWED", "false");
      if (onboardingIsShowed !== "true") {
        router.replacePage(PAGE_DOCUMENTS);
      }
    }
    getTheme()

  }, [])
  
  useEffect(() => {
    if (!isAuth) {
      router.replacePage(PAGE_AUTH);
    }
  }, [isAuth])


  return (
    <ConfigProvider appearance={appearance as AppearanceType} platform={platform}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout modal={modal} popout={popout}>
            <SplitCol>
              <Root activeView={location.getViewId()}>
                <View
                  id={VIEW_MAIN}
                  history={location.getViewHistory(VIEW_MAIN)}
                  activePanel={location.getViewActivePanel(VIEW_MAIN)}
                >

                  <Auth id={PANEL_AUTH}/>


                </View>
                <View
                  id={VIEW_ONBOARDING}
                  activePanel={PANEL_DOCUMENTS}
                >

                </View>
              </Root>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}

export default App;
