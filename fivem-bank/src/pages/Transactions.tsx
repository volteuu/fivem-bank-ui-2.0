import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Group,
  Progress,
  RingProgress,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Center,
} from '@mantine/core'
import { IconSearch, IconDownload } from '@tabler/icons-react'
import { Transaction } from '../types'
import { monthlyStats } from '../data/mockData'

interface Props {
  transactions: Transaction[]
}

const typeColor: Record<string, string> = {
  deposit: 'teal',
  withdraw: 'red',
  transfer: 'cyan',
}

function exportToCsv(rows: Transaction[]) {
  const header = ['ID', 'From', 'To', 'Amount', 'Title', 'Date']
  const lines = rows.map((r) => [r.id, r.from, r.to, r.amount, r.title, r.date].join(','))
  const csv = [header.join(','), ...lines].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'transactions.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export function Transactions({ transactions }: Props) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string>('All')

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchesFilter = filter === 'All' || t.type === filter.toLowerCase()
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        t.from.toLowerCase().includes(q) ||
        t.to.toLowerCase().includes(q) ||
        t.title.toLowerCase().includes(q) ||
        String(t.id).includes(q)
      return matchesFilter && matchesSearch
    })
  }, [transactions, search, filter])

  const total = monthlyStats.income + monthlyStats.outcome + monthlyStats.balance

  return (
    <Group align="flex-start" gap="lg" wrap="nowrap">
      <Box className="fb-card" p="lg" style={{ flex: 1 }}>
        <Group justify="space-between" mb="md">
          <Group gap={8}>
            <IconSearch size={18} />
            <Text fw={700}>Transakcje</Text>
          </Group>
          <Button leftSection={<IconDownload size={16} />} color="teal" onClick={() => exportToCsv(filtered)}>
            Eksportuj do CSV
          </Button>
        </Group>

        <Group mb="md" grow>
          <TextInput
            placeholder="Szukaj transakcji..."
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <Select
            value={filter}
            onChange={(v) => setFilter(v || 'All')}
            data={['All', 'Deposit', 'Withdraw', 'Transfer']}
            allowDeselect={false}
            style={{ maxWidth: 180 }}
          />
        </Group>

        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Od</Table.Th>
              <Table.Th>Do</Table.Th>
              <Table.Th>Kwota</Table.Th>
              <Table.Th>Tytuł</Table.Th>
              <Table.Th>Data</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filtered.map((t) => (
              <Table.Tr key={t.id}>
                <Table.Td>#{t.id}</Table.Td>
                <Table.Td>{t.from}</Table.Td>
                <Table.Td>{t.to}</Table.Td>
                <Table.Td>
                  <Text fw={700} c={t.type === 'withdraw' ? 'red.5' : t.type === 'deposit' ? 'teal.5' : 'cyan.5'}>
                    {t.type === 'withdraw' ? '-' : t.type === 'deposit' ? '+' : ''}${t.amount.toLocaleString()}
                  </Text>
                </Table.Td>
                <Table.Td>{t.title}</Table.Td>
                <Table.Td>{t.date}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Box>

      <Stack style={{ width: 320, flexShrink: 0 }} gap="lg">
        <Box className="fb-card" p="lg">
          <Text fw={700} mb="md">
            Miesięczne statystyki
          </Text>
          <Center>
            <RingProgress
              size={210}
              thickness={18}
              roundCaps
              label={
                <Center>
                  <Stack gap={0} align="center">
                    <Text fw={800} size={32}>
                      {monthlyStats.transactions}
                    </Text>
                    <Text size="xs" c="dimmed">
                      Transakcje
                    </Text>
                  </Stack>
                </Center>
              }
              sections={[
                { value: (monthlyStats.income / total) * 100, color: 'teal.5' },
                { value: (monthlyStats.outcome / total) * 100, color: 'red.5' },
                { value: (monthlyStats.balance / total) * 100, color: 'cyan.5' },
              ]}
            />
          </Center>
        </Box>

        <Box className="fb-card" p="lg">
          <Stack gap="md">
            <Box>
              <Group justify="space-between" mb={6}>
                <Text size="sm" fw={600}>
                  Twój miesięczny przychód
                </Text>
                <Text size="sm" fw={700} c="teal.5">
                  ${monthlyStats.income.toLocaleString()}
                </Text>
              </Group>
              <Progress value={70} color="teal" size="sm" />
            </Box>
            <Box>
              <Group justify="space-between" mb={6}>
                <Text size="sm" fw={600}>
                  Twój miesięczny wychód
                </Text>
                <Text size="sm" fw={700} c="red.5">
                  ${monthlyStats.outcome.toLocaleString()}
                </Text>
              </Group>
              <Progress value={45} color="red" size="sm" />
            </Box>
            <Box>
              <Group justify="space-between" mb={6}>
                <Text size="sm" fw={600}>
                  Twoje miesięczne saldo
                </Text>
                <Text size="sm" fw={700} c="cyan.5">
                  ${monthlyStats.balance.toLocaleString()}
                </Text>
              </Group>
              <Progress value={35} color="cyan" size="sm" />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Group>
  )
}
