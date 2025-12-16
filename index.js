import { FubonSDK } from 'fubon-neo';

const IDENTIFIER = process.env.IDENTIFIER;
const PASSWORD = process.env.PASSWORD;
const CERT_PATH = process.env.CERT_PATH;
const CERT_PASSWORD = process.env.CERT_PASSWORD;

const sdk = new FubonSDK();

const accounts = sdk.login(IDENTIFIER, PASSWORD, CERT_PATH, CERT_PASSWORD);

console.log(accounts);
