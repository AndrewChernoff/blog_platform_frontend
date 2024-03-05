import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import { isAuthSelector } from '../../common/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { logOut } from '../../redux/auth/auth-slice';

export const Header = () => {
  const isAuth = useAppSelector(isAuthSelector)
  const dispatch = useAppDispatch()

  const onClickLogout = () => {
    console.warn('Are you sure you wnat to log out?')
    dispatch(logOut())
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <NavLink className={styles.logo} to="/">
            <div>BLOG</div>
          </NavLink>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <NavLink to="/posts/create">
                  <Button variant="contained">Написать статью</Button>
                </NavLink>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <Button variant="outlined">Войти</Button>
                </NavLink>
                <NavLink to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
