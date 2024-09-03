import { FC } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

const routes: RouteObject[] = [];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
