import { Account, AccountLog, PackageDefinition, Transaction } from '../types'

export const currentPlayer = 'George Gouda'

export const packages: PackageDefinition[] = [
  {
    tier: 'basic',
    label: 'Basic',
    atmFee: '10%',
    transferFee: '3%',
    maxAccounts: 3,
    price: 'Domyślny',
    benefits: [
      { icon: 'wallet', text: 'Do 3 kont na graczu' },
      { icon: 'cash', text: '10% prowizji w bankomatach' },
      { icon: 'send', text: '3% prowizji przy przelewach' },
      { icon: 'history', text: 'Podstawowa historia transakcji' },
    ],
  },
  {
    tier: 'silver',
    label: 'Silver',
    atmFee: '7%',
    transferFee: '2%',
    maxAccounts: 4,
    price: '$25,000',
    benefits: [
      { icon: 'wallet', text: 'Do 4 kont na graczu' },
      { icon: 'cash', text: '7% prowizji w bankomatach' },
      { icon: 'send', text: '2% prowizji przy przelewach' },
      { icon: 'creditCard', text: 'Dodatkowa karta gratis' },
      { icon: 'shield', text: 'Priorytetowe wsparcie' },
    ],
  },
  {
    tier: 'gold',
    label: 'Gold',
    atmFee: '4%',
    transferFee: '1%',
    maxAccounts: 6,
    price: '$60,000',
    benefits: [
      { icon: 'wallet', text: 'Do 6 kont na graczu' },
      { icon: 'cash', text: '4% prowizji w bankomatach' },
      { icon: 'send', text: '1% prowizji przy przelewach' },
      { icon: 'creditCard', text: '2 dodatkowe karty gratis' },
      { icon: 'chart', text: 'Rozszerzone statystyki konta' },
      { icon: 'shield', text: 'Ubezpieczenie salda do $50,000' },
    ],
  },
  {
    tier: 'diamond',
    label: 'Diamond',
    atmFee: '0%',
    transferFee: '0%',
    maxAccounts: 10,
    price: '$150,000',
    benefits: [
      { icon: 'wallet', text: 'Do 10 kont na graczu' },
      { icon: 'cash', text: '0% prowizji w bankomatach' },
      { icon: 'send', text: '0% prowizji przy przelewach' },
      { icon: 'creditCard', text: 'Nielimitowane karty dodatkowe' },
      { icon: 'crown', text: 'Osobisty doradca bankowy' },
      { icon: 'shield', text: 'Ubezpieczenie salda do $250,000' },
      { icon: 'bolt', text: 'Natychmiastowe przelewy bez limitu' },
    ],
  },
]

export const accounts: Account[] = [
  {
    id: 'acc-personal',
    name: 'Personal',
    displayLabel: 'Personal Basic',
    kind: 'personal',
    tier: 'basic',
    balance: 298337,
    owner: currentPlayer,
    iban: '6249930027',
    role: 'owner',
    expireDate: '04/05/2035',
    members: [],
  },
  {
    id: 'acc-test',
    name: 'Test2',
    displayLabel: 'Shared Basic',
    kind: 'shared',
    tier: 'basic',
    balance: 1000,
    owner: currentPlayer,
    iban: '8912082372',
    role: 'owner',
    expireDate: '12/09/2034',
    members: [
      { id: 'p1', name: 'Piotreq Scripts', permissions: ['deposit', 'withdraw', 'removeUser'] },
    ],
  },
  {
    id: 'acc-boys',
    name: 'Boys',
    displayLabel: 'Shared Basic',
    kind: 'shared',
    tier: 'basic',
    balance: 700,
    owner: currentPlayer,
    iban: '7734021198',
    role: 'admin',
    expireDate: '30/11/2034',
    members: [],
  },
]

export const transactions: Transaction[] = [
  { id: 28, from: 'George Gouda', to: 'Personal', amount: 1000, type: 'deposit', title: 'Deposit', date: '6/8/2025, 3:36:23 PM', accountId: 'acc-personal' },
  { id: 27, from: 'Personal', to: 'George Gouda', amount: 1000, type: 'withdraw', title: 'Withdraw', date: '6/8/2025, 3:36:17 PM', accountId: 'acc-personal' },
  { id: 26, from: 'George Gouda', to: 'Cwel', amount: 500, type: 'deposit', title: 'Deposit', date: '6/8/2025, 3:34:52 PM', accountId: 'acc-personal' },
  { id: 25, from: 'George Gouda', to: 'gej', amount: 100, type: 'deposit', title: 'Deposit', date: '6/7/2025, 1:40:00 PM', accountId: 'acc-personal' },
  { id: 24, from: 'gej', to: 'George Gouda', amount: 100, type: 'withdraw', title: 'Withdraw', date: '6/7/2025, 1:39:59 PM', accountId: 'acc-personal' },
  { id: 23, from: 'Cwele', to: 'LSPD', amount: 1000, type: 'transfer', title: 'Transfer', date: '6/7/2025, 1:37:45 PM', accountId: 'acc-personal' },
  { id: 22, from: 'George Gouda', to: 'Cwele', amount: 100, type: 'deposit', title: 'Deposit', date: '6/7/2025, 1:37:37 PM', accountId: 'acc-personal' },
  { id: 21, from: 'Cwele', to: 'George Gouda', amount: 100, type: 'withdraw', title: 'Withdraw', date: '6/7/2025, 1:37:32 PM', accountId: 'acc-personal' },
  { id: 20, from: 'LSPD', to: 'Cwele', amount: 1000, type: 'transfer', title: 'Transfer', date: '6/7/2025, 1:36:41 PM', accountId: 'acc-personal' },
  { id: 19, from: 'Cwele', to: 'George Gouda', amount: 100, type: 'withdraw', title: 'Withdraw', date: '6/1/2025, 9:37:48 AM', accountId: 'acc-personal' },
  { id: 18, from: 'George Gouda', to: 'Test2', amount: 1000, type: 'deposit', title: 'Deposit', date: '5/31/2025, 2:12:10 PM', accountId: 'acc-test' },
  { id: 17, from: 'Piotreq Scripts', to: 'Test2', amount: 250, type: 'deposit', title: 'Deposit', date: '5/30/2025, 11:02:44 AM', accountId: 'acc-test' },
]

export const accountLogs: AccountLog[] = [
  { id: 1, player: 'George Gouda', action: 'Player renamed account from Test account to Test2', type: 'Normal', date: '15:39 08/06/2025', accountId: 'acc-test' },
  { id: 2, player: 'George Gouda', action: 'Player added Piotreq Scripts to the account', type: 'Normal', date: '15:41 08/06/2025', accountId: 'acc-test' },
  { id: 3, player: 'Piotreq Scripts', action: 'Player withdrew $1,000 from the account', type: 'Risk', date: '16:02 08/06/2025', accountId: 'acc-test' },
  { id: 4, player: 'George Gouda', action: 'Player changed ownership of the account', type: 'Medium', date: '16:20 08/06/2025', accountId: 'acc-test' },
]

export const weeklyStats = [
  { day: 'Mon', income: 0, outcome: 0 },
  { day: 'Tue', income: 0, outcome: 0 },
  { day: 'Wed', income: 0, outcome: 0 },
  { day: 'Thu', income: 0, outcome: 0 },
  { day: 'Fri', income: 60, outcome: 40 },
  { day: 'Sat', income: 1200, outcome: 1100 },
  { day: 'Sun', income: 1500, outcome: 950 },
]

export const monthlyStats = {
  income: 11300,
  outcome: 6200,
  balance: 5100,
  transactions: 28,
}
