import { config } from 'dotenv';

export default function () {
  config({
    path: '.credentials',
  });
}