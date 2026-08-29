import { useState } from 'react'
import { Box } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { LoadingPage } from './components/LoadingPage'
import { Sidebar } from './components/Sidebar'
import { Dashboard } from './pages/Dashboard'
import { Transactions } from './pages/Transactions'
import { Accounts } from './pages/Accounts'
import { AccountTypes } from './pages/AccountTypes'
import { Invoices } from './pages/Invoices'
import { Loans } from './pages/Loans'
import { Account, AccountLog, AccountMember, ProfileType, Transaction, PackageTier } from './types'
import {
  accounts as initialAccounts,
  accountLogs as initialLogs,
  transactions as initialTransactions,
  currentPlayer,
  packages,
} from './data/mockData'

export type Page = 'dashboard' | 'transactions' | 'invoices' | 'accounts' | 'accountTypes' | 'loans'

export default function App() {
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [page, setPage] = useState<Page>('dashboard')
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [logs, setLogs] = useState<AccountLog[]>(initialLogs)
  const [selectedId, setSelectedId] = useState(initialAccounts[0].id)
  const [nextTxId, setNextTxId] = useState(29)
  const [nextLogId, setNextLogId] = useState(100)

  if (!profile) {
    return <LoadingPage onSelect={setProfile} />
  }

  const account = accounts.find((a) => a.id === selectedId) ?? accounts[0]
  const accountTransactions = transactions.filter((t) => t.accountId === account.id)

  const pushLog = (accountId: string, action: string, type: AccountLog['type']) => {
    setLogs((prev) => [{ id: nextLogId, player: currentPlayer, action, type, date: new Date().toLocaleString('pl-PL'), accountId }, ...prev])
    setNextLogId((v) => v + 1)
  }

  const addTransaction = (type: Transaction['type'], amount: number, target: string) => {
    const tx: Transaction = {
      id: nextTxId,
      from: type === 'withdraw' ? account.name : currentPlayer,
      to: type === 'withdraw' ? currentPlayer : target || account.name,
      amount,
      type,
      title: type === 'deposit' ? 'Deposit' : type === 'withdraw' ? 'Withdraw' : 'Transfer',
      date: new Date().toLocaleString('en-US'),
      accountId: account.id,
    }
    setTransactions((prev) => [tx, ...prev])
    setNextTxId((v) => v + 1)
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === account.id ? { ...a, balance: type === 'withdraw' ? a.balance - amount : a.balance + amount } : a
      )
    )
    notifications.show({
      title: type === 'deposit' ? 'Wpłata zaksięgowana' : type === 'withdraw' ? 'Wypłata zrealizowana' : 'Przelew wysłany',
      message: `$${amount.toLocaleString()}`,
      color: type === 'withdraw' ? 'red' : 'teal',
    })
  }

  const handleCreateAccount = (name: string, kind: Account['kind'], tier: Account['tier']) => {
    const id = `acc-${Date.now()}`
    const newAcc: Account = {
      id,
      name,
      displayLabel: `${kind === 'personal' ? 'Personal' : 'Shared'} ${tier.charAt(0).toUpperCase() + tier.slice(1)}`,
      kind,
      tier,
      balance: 0,
      owner: currentPlayer,
      iban: Math.floor(1000000000 + Math.random() * 8999999999).toString(),
      role: 'owner',
      expireDate: '01/01/2036',
      members: [],
    }
    setAccounts((prev) => [...prev, newAcc])
    setSelectedId(id)
    notifications.show({ title: 'Konto utworzone', message: `Utworzono konto "${name}"`, color: 'teal' })
  }

  const handleRename = (id: string, name: string) => {
    setAccounts((prev) => prev.map((a) => (a.id === id ? { ...a, name } : a)))
    pushLog(id, `Player renamed the account to ${name}`, 'Normal')
  }

  const handleChangeOwner = (id: string, owner: string) => {
    setAccounts((prev) => prev.map((a) => (a.id === id ? { ...a, owner } : a)))
    pushLog(id, `Player changed ownership of the account to ${owner}`, 'Medium')
  }

  const handleDelete = (id: string) => {
    setAccounts((prev) => {
      const remaining = prev.filter((a) => a.id !== id)
      if (selectedId === id && remaining.length) setSelectedId(remaining[0].id)
      return remaining
    })
    notifications.show({ title: 'Konto usunięte', message: 'Konto zostało usunięte.', color: 'red' })
  }

  const handleAddMember = (id: string, member: AccountMember) => {
    setAccounts((prev) => prev.map((a) => (a.id === id ? { ...a, members: [...a.members, member] } : a)))
    pushLog(id, `Player added ${member.name} to the account`, 'Normal')
  }

  const handleRemoveMember = (id: string, memberId: string) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, members: a.members.filter((m) => m.id !== memberId) } : a))
    )
    pushLog(id, `Player removed a user from the account`, 'Risk')
  }

  const handleUpgrade = (tier: PackageTier) => {
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === account.id
          ? { ...a, tier, displayLabel: `${a.kind === 'personal' ? 'Personal' : 'Shared'} ${tier.charAt(0).toUpperCase() + tier.slice(1)}` }
          : a
      )
    )
    const pkg = packages.find((p) => p.tier === tier)
    notifications.show({ title: 'Pakiet ulepszony', message: `Aktywowano pakiet ${pkg?.label}`, color: 'cyan' })
  }

  return (
    <Box style={{ display: 'flex', height: '100vh', width: '100vw', background: 'var(--bg1)' }}>
      <Sidebar page={page} onNavigate={setPage} playerName={currentPlayer} onExit={() => setProfile(null)} />
      <Box className="app-shell-scroll" p="xl" style={{ flex: 1 }}>
        <Box key={page} className="fb-fade-in">
          {page === 'dashboard' && (
            <Dashboard
              account={account}
              transactions={accountTransactions}
              onDeposit={(amount, target) => addTransaction('deposit', amount, target)}
              onWithdraw={(amount, target) => addTransaction('withdraw', amount, target)}
              onTransfer={(amount, target) => addTransaction('transfer', amount, target)}
              onViewAll={() => setPage('transactions')}
            />
          )}
          {page === 'transactions' && <Transactions transactions={accountTransactions} />}
          {page === 'invoices' && <Invoices />}
          {page === 'accounts' && (
            <Accounts
              accounts={accounts}
              logs={logs}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onCreateAccount={handleCreateAccount}
              onRenameAccount={handleRename}
              onChangeOwner={handleChangeOwner}
              onDeleteAccount={handleDelete}
              onAddMember={handleAddMember}
              onRemoveMember={handleRemoveMember}
            />
          )}
          {page === 'accountTypes' && <AccountTypes currentTier={account.tier} onUpgrade={handleUpgrade} />}
          {page === 'loans' && <Loans />}
        </Box>
      </Box>
    </Box>
  )
}
