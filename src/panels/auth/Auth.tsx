import React, { useState } from 'react';
import { Button, Div, Panel, PanelHeader, Text, FormLayout, FormItem, Input } from "@vkontakte/vkui";
import { IPanel } from 'interfaces/IPanel';
import { useRouter } from "@happysanta/router";
import {
    MODAL_AUTH_DECLINE,
    MODAL_AUTH_SUCCESS, PAGE_DOCUMENTS,
    PAGE_MAIN
} from './../../router'
import { useLocalStorage } from 'usehooks-ts';

const Auth = ({id}: IPanel): JSX.Element => {

  const router = useRouter()
  const [,setIsAuth] = useLocalStorage('isAuth', false)

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  //Авторизация
  const auth = async () => {
    const data = await fetch(`http://localhost:4000/auth`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({Login: login, Password: password})
    })
      // Если все данные верны
    if (data.ok) {
      const res = await data.json();
      setIsAuth(res);
      router.replacePage(PAGE_DOCUMENTS);
      router.pushModal(MODAL_AUTH_SUCCESS);
    }
    else {
      router.pushModal(MODAL_AUTH_DECLINE); 
    }
  };


  return (
    <Panel id={id}>
      <PanelHeader>
        Вход
      </PanelHeader>
      <Div>
        <Text style = {{marginLeft: '31%'}}>
          Чтобы начать работу войдите в систему
        </Text>
        <FormLayout >
          <FormItem
              style = {{width: '30%', marginLeft: '30%'}}
                top="Логин"
                status={login ? "valid" : "error"}
                bottom={
                  !login && "Введите логин"
                }
              >
                <Input
                  type="text"
                  name="login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                />
              </FormItem>

              <FormItem
                  style = {{width: '30%', marginLeft: '30%'}}
                  top="Пароль">
                <Input

                  type="password" 
                  placeholder="Введите пароль" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormItem>
              <FormItem>
                <Button size="l"  stretched onClick={auth} disabled={login.length === 0 && password.length === 0} style={{backgroundColor: '#54ad32', width: '31%', marginLeft: '30.5%'}}>
                  Войти
                </Button>
              </FormItem>
        </FormLayout>
      </Div>
    </Panel>
  );
};

export default Auth;