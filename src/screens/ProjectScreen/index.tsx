import React from 'react';
import { Link } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router';
import { KanbanSCreen } from '../kanban';
import { EpicSCreen } from 'screens/epic';

export const ProjectScreen = () => {
  return (
    <>
      <h1>ProjectScreen</h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanbanSCreen />}></Route>
        <Route path={'/epic'} element={<EpicSCreen />}></Route>
        <Navigate to={window.location.pathname + '/kanban'} replace={true} />
      </Routes>
    </>
  );
};
