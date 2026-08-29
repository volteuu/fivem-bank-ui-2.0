import { Avatar, Box, Stack, Text, UnstyledButton, Group } from '@mantine/core'
import {
  IconLayoutDashboard,
  IconArrowsExchange,
  IconFileInvoice,
  IconWallet,
  IconCreditCard,
  IconBuildingBank,
  IconLogout,
} from '@tabler/icons-react'
import type { Page } from '../App'

interface Props {
  page: Page
  onNavigate: (page: Page) => void
  playerName: string
  onExit: () => void
}

const items: { key: Page; label: string; icon: JSX.Element }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <IconLayoutDashboard size={19} /> },
  { key: 'transactions', label: 'Transakcje', icon: <IconArrowsExchange size={19} /> },
  { key: 'invoices', label: 'Faktury', icon: <IconFileInvoice size={19} /> },
  { key: 'accounts', label: 'Konta', icon: <IconWallet size={19} /> },
  { key: 'accountTypes', label: 'Rodzaje konta', icon: <IconCreditCard size={19} /> },
  { key: 'loans', label: 'Pożyczki', icon: <IconBuildingBank size={19} /> },
]

export function Sidebar({ page, onNavigate, playerName, onExit }: Props) {
  return (
    <Stack
      justify="space-between"
      h="100%"
      p="lg"
      style={{ width: 250, background: 'var(--bg1)', borderRight: 'var(--border)', flexShrink: 0 }}
    >
      <Stack gap={30}>
        <Group gap={10}>
          <Avatar radius="xl" color="cyan" variant="light">
            {playerName.slice(0, 1)}
          </Avatar>
          <Box>
            <Text size="xs" c="cyan.4">
              Witaj ponownie
            </Text>
            <Text fw={700} size="sm">
              {playerName}
            </Text>
          </Box>
        </Group>

        <Stack gap={4}>
          {items.map((item) => {
            const active = page === item.key
            return (
              <UnstyledButton
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className="fb-nav-link"
                px={12}
                py={10}
                style={{
                  background: active ? 'var(--button-active)' : 'transparent',
                  color: active ? 'var(--mcolor)' : 'var(--divider2)',
                }}
              >
                <Group gap={10}>
                  {item.icon}
                  <Text size="sm" fw={active ? 700 : 500}>
                    {item.label}
                  </Text>
                </Group>
              </UnstyledButton>
            )
          })}
        </Stack>
      </Stack>

      <UnstyledButton
        onClick={onExit}
        className="fb-nav-link"
        px={12}
        py={10}
        c="red.5"
      >
        <Group gap={10}>
          <IconLogout size={19} />
          <Text size="sm" fw={500}>
            Wyjdź
          </Text>
        </Group>
      </UnstyledButton>
    </Stack>
  )
}
