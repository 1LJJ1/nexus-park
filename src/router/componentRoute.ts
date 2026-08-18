import { lazy } from 'react';
// 工作台
export const Dashboard = lazy(() => import('../views/dashboard/index'));
export const UserList = lazy(() => import('../views/lesseeUser/lesseeUserList'));

export const AddUser = lazy(() => import('../views/lesseeUser/addLesseeUser'));

export const Tenement = lazy(() => import('../views/estate/tenement'));
export const Room = lazy(() => import('../views/estate/room'));
export const Car = lazy(() => import('../views/estate/car'));
export const Repair = lazy(() => import('../views/repair'));
export const Contract = lazy(() => import('../views/finance/contract'));
export const Surrender = lazy(() => import('../views/finance/surrender'));
export const Bill = lazy(() => import('../views/finance/bill'));
export const Merchants = lazy(() => import('../views/merchants'));
export const All = lazy(() => import('../views/operation/all'));
export const Article = lazy(() => import('../views/operation/article'));
export const Comments = lazy(() => import('../views/operation/comments'));
export const Equipment = lazy(() => import('../views/equipment'));
export const Enengy = lazy(() => import('../views/energy'));
export const Settings = lazy(() => import('../views/settings'));
export const Personal = lazy(() => import('../views/personall'));
