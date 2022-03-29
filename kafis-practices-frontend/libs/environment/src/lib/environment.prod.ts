const BASE_URL = 'http://localhost:5000/api';

export const environment = {
  APP_URL: 'http://localhost:4200',
  ADMIN_URL: 'http://localhost:4210',
  production: true,
  API: {
    auth: `${BASE_URL}/auth`,
    student: `${BASE_URL}/student`,
    teacher: `${BASE_URL}/teacher`,
    organization: `${BASE_URL}/organization`,
    file: `${BASE_URL}/file`,
    practiceDates: `${BASE_URL}/practicedates`,
    admin: `${BASE_URL}/admin`,
  },
};
