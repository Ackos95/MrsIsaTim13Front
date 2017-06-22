const m_names = {
  en: ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'],
  sr: ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
    'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar']
};

/** http://www.webdevelopersnotes.com/formatting-time-using-javascript **/
export const millisecondsToDate = (milliseconds, locale) => {

  let d = new Date(milliseconds);
  let curr_date = d.getDate();
  let curr_month = d.getMonth();
  let curr_year = d.getFullYear();
  let curr_hour = d.getHours();
  let curr_min = d.getMinutes();

  curr_hour += '';
  curr_min += '';

  if (curr_hour.length === 1)
    curr_hour = '0' + curr_hour;
  if (curr_min.length === 1)
    curr_min = '0' + curr_min;

  return [
    curr_date + '-' + m_names[locale][curr_month] + '-' + curr_year,
    curr_hour + ':' + curr_min];
};

export const descriptionFromEmployee = (employee, reon) => {
  if (employee === null || employee === undefined)
    return 'null or undefined';

  // split daje niz: [ ROLE, EMPLOYEE, %%% ULOGA %%% ] , pa uzmemo treci clan --> [2];
  const roleName = employee.roles[0].name.split('_')[2].toLowerCase(); // barman, cook, waiter

  let reonInfo = '';
  if (roleName === "barman" && reon !== null  && reon !== undefined)
    reonInfo = '\nReon: ' + reon.toLowerCase().replace('_', ' ');

  return employee.firstName + ' ' + employee.lastName +
      '\nRole: ' + roleName + reonInfo +
    '\nShirt size: ' + employee.shirtSize + '\nShoe size: ' +
    employee.shoeSize + '\nusername: ' + employee.userName;
};