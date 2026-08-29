export type ProfileType = 'private' | 'business'

export type AccountKind = 'personal' | 'shared'

export type PackageTier = 'basic' | 'silver' | 'gold' | 'diamond'

export type AccountRole = 'owner' | 'admin' | 'user'

export type Permission =
  | 'deposit'
  | 'withdraw'
  | 'transfer'
  | 'addUser'
  | 'removeUser'
  | 'renameAccount'
  | 'manageUsers'
  | 'payInvoice'
  | 'logs'
  | 'createCard'
  | 'removeCard'

export interface Account {
  id: string
  name: string
  displayLabel: string // e.g. "Personal Basic"
  kind: AccountKind
  tier: PackageTier
  balance: number
  owner: string
  iban: string
  role: AccountRole
  expireDate: string
  members: AccountMember[]
}

export interface AccountMember {
  id: string
  name: string
  permissions: Permission[]
}

export type TransactionType = 'deposit' | 'withdraw' | 'transfer'

export interface Transaction {
  id: number
  from: string
  to: string
  amount: number
  type: TransactionType
  title: string
  date: string
  accountId: string
}

export type LogType = 'Normal' | 'Risk' | 'Medium'

export interface AccountLog {
  id: number
  player: string
  action: string
  type: LogType
  date: string
  accountId: string
}

export interface PackageDefinition {
  tier: PackageTier
  label: string
  atmFee: string
  transferFee: string
  maxAccounts: number
  price: string
  benefits: { icon: string; text: string }[]
}
