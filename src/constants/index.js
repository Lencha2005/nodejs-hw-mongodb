import path from 'node:path';

export const typeList = ["work", "home", "personal"];

export const numberRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const sortOrderList = ["asc", "desc"];

export const sortByList = ["_id", "name", "phoneNumber", "email", "isFavourite", "contactType"];

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const FIFTEEN_MIN = 15 * 60 * 1000;

export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

// export const SMTP = {
//     SMTP_HOST: 'SMTP_HOST',
//     SMTP_PORT: 'SMTP_PORT',
//     SMTP_USER: 'SMTP_USER',
//     SMTP_PASSWORD: 'SMTP_PASSWORD',
//     SMTP_FROM: 'SMTP_FROM',
//   };
