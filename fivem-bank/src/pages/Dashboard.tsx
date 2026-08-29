import { useState } from 'react'
import {
  Box,
  Button,
  Group,
  NumberInput,
  Stack,
  Text,
  TextInput,
  Title,
  SegmentedControl,
} from '@mantine/core'
import { BarChart } from '@mantine/charts'
import { IconArrowUpRight, IconArrowDownRight, IconClock } from '@tabler/icons-react'
import { Account, Transaction, TransactionType } from '../types'
import { weeklyStats } from '../data/mockData'

interface Props {
  account: Account
  transactions: Transaction[]
  onDeposit: (amount: number, target: string) => void
  onWithdraw: (amount: number, target: string) => void
  onTransfer: (amount: number, target: string) => void
  onViewAll: () => void
}

const quickAmounts = [100, 500, 1000, 5000, 10000, 20000, 50000]

export function Dashboard({ account, transactions, onDeposit, onWithdraw, onTransfer, onViewAll }: Props) {
  const [action, setAction] = useState<TransactionType>('deposit')
  const [amount, setAmount] = useState<number | ''>(1000)
  const [target, setTarget] = useState('')

  const handleConfirm = () => {
    if (!amount || Number(amount) <= 0) return
    if (action === 'deposit') onDeposit(Number(amount), target)
    if (action === 'withdraw') onWithdraw(Number(amount), target)
    if (action === 'transfer') onTransfer(Number(amount), target)
  }

  const recent = transactions.slice(0, 5)

  return (
    <Group align="flex-start" gap="lg" wrap="nowrap" style={{ alignItems: 'stretch' }}>
      <Stack style={{ flex: 1 }} gap="lg">
        <Box className="fb-card" p="lg">
          <Group justify="space-between" mb="md">
            <Text fw={700}>Tygodniowe statystyki</Text>
          </Group>
          <BarChart
            h={280}
            data={weeklyStats}
            dataKey="day"
            withLegend
            series={[
              { name: 'income', color: 'teal.5', label: 'Przychody' },
              { name: 'outcome', color: 'red.5', label: 'Wychody' },
            ]}
            tickLine="y"
            gridAxis="y"
          />
        </Box>

        <Box className="fb-card" p="lg">
          <Group justify="space-between" mb="md">
            <Text fw={700}>Szybkie akcje</Text>
            <SegmentedControl
              value={action}
              onChange={(v) => setAction(v as TransactionType)}
              data={[
                { label: 'Wypłata', value: 'withdraw' },
                { label: 'Wpłata', value: 'deposit' },
                { label: 'Przelew', value: 'transfer' },
              ]}
              color={action === 'withdraw' ? 'red' : action === 'deposit' ? 'teal' : 'cyan'}
            />
          </Group>

          <Group gap={8} mb="md">
            {quickAmounts.map((q) => (
              <Button
                key={q}
                variant="default"
                size="xs"
                onClick={() => setAmount(q)}
              >
                ${q.toLocaleString()}
              </Button>
            ))}
          </Group>

          <Stack gap="sm">
            <NumberInput
              label="Kwota"
              value={amount}
              onChange={(v) => setAmount(v as number)}
              thousandSeparator=","
              prefix="$"
              min={1}
            />
            <TextInput
              label="Player ID / IBAN"
              placeholder="Wpisz player ID / IBAN..."
              value={target}
              onChange={(e) => setTarget(e.currentTarget.value)}
            />
            <Button
              fullWidth
              color={action === 'withdraw' ? 'red' : action === 'deposit' ? 'teal' : 'cyan'}
              onClick={handleConfirm}
            >
              Potwierdź
            </Button>
          </Stack>
        </Box>
      </Stack>

      <Stack style={{ width: 340, flexShrink: 0 }} gap="lg">
        <Box
          p="lg"
          style={{
            borderRadius: 14,
            background: 'linear-gradient(160deg, #132030, #0b1018)',
            border: 'var(--border)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Group justify="space-between" mb={30}>
            <Text size="xs" tt="uppercase" c="dimmed" style={{ letterSpacing: 2 }}>
              {account.kind === 'personal' ? 'Personal' : 'Shared'}
            </Text>
            <Text fw={800} className="fb-gradient-text" style={{ fontStyle: 'italic' }}>
              FLEECA
            </Text>
          </Group>
          <Title order={2} fw={800} mb={30}>
            ${account.balance.toLocaleString()}
          </Title>
          <Group justify="space-between">
            <Box>
              <Text size="xs" c="dimmed">
                Numer konta
              </Text>
              <Text fw={600}>{account.iban}</Text>
            </Box>
            <Box>
              <Text size="xs" c="dimmed">
                Ważność
              </Text>
              <Text fw={600}>{account.expireDate}</Text>
            </Box>
          </Group>
          <Text size="xs" c="dimmed" mt={10}>
            Nazwa konta
          </Text>
          <Text fw={600}>{account.name}</Text>
        </Box>

        <Box className="fb-card" p="lg" style={{ flex: 1 }}>
          <Group justify="space-between" mb="md">
            <Group gap={6}>
              <IconClock size={16} />
              <Text fw={700} size="sm">
                Ostatnie transakcje
              </Text>
            </Group>
          </Group>
          <Stack gap={10}>
            {recent.map((t) => (
              <Group key={t.id} justify="space-between" wrap="nowrap">
                <Group gap={10} wrap="nowrap">
                  <Box
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: t.type === 'withdraw' ? 'var(--risk-bg)' : 'var(--normal-bg)',
                      color: t.type === 'withdraw' ? 'var(--risk)' : 'var(--normal)',
                      flexShrink: 0,
                    }}
                  >
                    {t.type === 'withdraw' ? <IconArrowDownRight size={16} /> : <IconArrowUpRight size={16} />}
                  </Box>
                  <Box style={{ minWidth: 0 }}>
                    <Text size="sm" fw={600} truncate>
                      {t.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {t.date}
                    </Text>
                  </Box>
                </Group>
                <Text size="sm" fw={700} c={t.type === 'withdraw' ? 'red.5' : 'teal.5'}>
                  {t.type === 'withdraw' ? '-' : '+'}${t.amount.toLocaleString()}
                </Text>
              </Group>
            ))}
          </Stack>
          <Button fullWidth variant="light" color="teal" mt="md" onClick={onViewAll}>
            Zobacz wszystkie transakcje
          </Button>
        </Box>
      </Stack>
    </Group>
  )
}
