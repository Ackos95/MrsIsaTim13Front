// import moment from 'moment';
import filter from 'lodash/filter';
import find from 'lodash/find';

const BARMAN_ROLE = 'ROLE_EMPLOYEE_BARMAN';
const WAITER_ROLE = 'ROLE_EMPLOYEE_WAITER';
const COOK_ROLE = 'ROLE_EMPLOYEE_COOK';


export const getBarmanSchedules = (scheduleItems) => filter(scheduleItems, (item) => find(item.employee.roles, (role) => role.name === BARMAN_ROLE));

export const getWaiterSchedules = (scheduleItems) => filter(scheduleItems, (item) => find(item.employee.roles, (role) => role.name === WAITER_ROLE));

export const getCookSchedules = (scheduleItems) => filter(scheduleItems, (item) => find(item.employee.roles, (role) => role.name === COOK_ROLE));