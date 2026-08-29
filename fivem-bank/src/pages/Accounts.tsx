import { useState } from 'react'
import { Carousel } from '@mantine/carousel'
import {
  Badge,
  Box,
  Button,
  CopyButton,
  Group,
  Modal,
  Stack,
  Table,
  Text,
  TextInput,
  Tooltip,
  ActionIcon,
} from '@mantine/core'
import {
  IconCheck,
  IconCopy,
  IconInfoCircle,
  IconPencil,
  IconPlus,
  IconSettings,
  IconTrash,
  IconUserCog,
  IconUsers,
} from '@tabler/icons-react'
import { Account, AccountLog, AccountMember } from '../types'
import { ManageUsersModal } from '../components/ManageUsersModal'
import { CreateAccountModal } from '../components/CreateAccountModal'

interface Props {
  accounts: Account[]
  logs: AccountLog[]
  selectedId: string
  onSelect: (id: string) => void
  onCreateAccount: (name: string, kind: Account['kind'], tier: Account['tier']) => void
  onRenameAccount: (id: string, name: string) => void
  onChangeOwner: (id: string, owner: string) => void
  onDeleteAccount: (id: string) => void
  onAddMember: (id: string, member: AccountMember) => void
  onRemoveMember: (id: string, memberId: string) => void
}

const logTypeColor: Record<string, { bg: string; color: string }> = {
  Normal: { bg: 'var(--normal-bg)', color: 'var(--normal)' },
  Risk: { bg: 'var(--risk-bg)', color: 'var(--risk)' },
  Medium: { bg: 'var(--medium-bg)', color: 'var(--medium)' },
}

const ACCOUNT_LIMIT_BASIC = 3

export function Accounts({
  accounts,
  logs,
  selectedId,
  onSelect,
  onCreateAccount,
  onRenameAccount,
  onChangeOwner,
  onDeleteAccount,
  onAddMember,
  onRemoveMember,
}: Props) {
  const account = accounts.find((a) => a.id === selectedId) ?? accounts[0]
  const [createOpen, setCreateOpen] = useState(false)
  const [usersOpen, setUsersOpen] = useState(false)
  const [renameOpen, setRenameOpen] = useState(false)
  const [ownerOpen, setOwnerOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [ownerInput, setOwnerInput] = useState('')

  const accountLogs = logs.filter((l) => l.accountId === account.id)

  return (
    <Stack gap="lg">
      <Box>
        <Group justify="space-between" mb={8}>
          <Text fw={700}>Twoje konta</Text>
          <Text size="xs" c="dimmed">
            Limit kont dla pakietu Basic: {ACCOUNT_LIMIT_BASIC} / posiadasz {accounts.length}
          </Text>
        </Group>
        <Carousel
          slideSize={{ base: '45%', sm: '220px' }}
          slideGap="md"
          align="start"
          withControls={accounts.length > 3}
          dragFree
        >
          <Carousel.Slide>
            <Box
              onClick={() => accounts.length < ACCOUNT_LIMIT_BASIC && setCreateOpen(true)}
              className="fb-card fb-card-hover"
              style={{
                height: 130,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: accounts.length < ACCOUNT_LIMIT_BASIC ? 'pointer' : 'not-allowed',
                opacity: accounts.length < ACCOUNT_LIMIT_BASIC ? 1 : 0.5,
                border: '1px dashed rgba(255,255,255,0.15)',
              }}
            >
              <IconPlus size={26} />
              <Text size="xs" c="dimmed" mt={6}>
                Nowe konto
              </Text>
            </Box>
          </Carousel.Slide>
          {accounts.map((a) => {
            const active = a.id === account.id
            return (
              <Carousel.Slide key={a.id}>
                <Box
                  onClick={() => onSelect(a.id)}
                  className="fb-card fb-card-hover"
                  p="md"
                  style={{
                    height: 130,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderColor: active ? 'var(--mcolor)' : undefined,
                  }}
                >
                  <Group justify="space-between">
                    <Text fw={800} size="lg">
                      ${a.balance.toLocaleString()}
                    </Text>
                    <Badge
                      size="sm"
                      variant="light"
                      color={a.kind === 'personal' ? 'teal' : 'yellow'}
                    >
                      {a.kind === 'personal' ? 'PERSONAL' : 'SHARED'}
                    </Badge>
                  </Group>
                  <Box>
                    <Text size="xs" c="dimmed">
                      Właściciel karty
                    </Text>
                    <Text fw={600} size="sm">
                      {a.name}
                    </Text>
                  </Box>
                </Box>
              </Carousel.Slide>
            )
          })}
        </Carousel>
      </Box>

      <Box
        p="sm"
        style={{ background: 'var(--note-bg)', border: 'var(--note-border)', borderRadius: 10 }}
      >
        <Group gap={8}>
          <IconInfoCircle size={16} color="var(--mcolor)" />
          <Text size="xs" c="dimmed">
            Twój pakiet <b>Basic</b> pozwala na maksymalnie {ACCOUNT_LIMIT_BASIC} konta. Odblokuj wyższy pakiet w
            sekcji „Rodzaje konta”, aby zwiększyć limit.
          </Text>
        </Group>
      </Box>

      <Group align="flex-start" gap="lg" wrap="nowrap">
        <Box className="fb-card" p="lg" style={{ flex: 1 }}>
          <Group justify="space-between" mb="md">
            <Text fw={700}>Szczegóły konta</Text>
            <IconInfoCircle size={18} />
          </Group>
          <Group grow mb="lg">
            <Box>
              <Text size="xs" c="dimmed">
                Nazwa konta
              </Text>
              <Text fw={600}>{account.name}</Text>
            </Box>
            <Box>
              <Text size="xs" c="dimmed">
                Właściciel konta
              </Text>
              <Text fw={600}>{account.owner}</Text>
            </Box>
            <Box>
              <Text size="xs" c="dimmed">
                Stan konta
              </Text>
              <Text fw={600} c="teal.5">
                ${account.balance.toLocaleString()}
              </Text>
            </Box>
          </Group>
          <Group grow mb="lg">
            <Box>
              <Text size="xs" c="dimmed">
                Rodzaj konta
              </Text>
              <Text fw={600}>{account.displayLabel}</Text>
            </Box>
            <Box>
              <Text size="xs" c="dimmed">
                Numer konta
              </Text>
              <Group gap={6}>
                <Text fw={600}>{account.iban}</Text>
                <CopyButton value={account.iban}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Skopiowano' : 'Kopiuj'}>
                      <ActionIcon size="sm" variant="subtle" onClick={copy}>
                        {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Group>
            </Box>
            <Box>
              <Text size="xs" c="dimmed">
                Twoja rola
              </Text>
              <Badge variant="light" color="cyan" tt="capitalize">
                {account.role}
              </Badge>
            </Box>
          </Group>

          <Text fw={700} mb="sm" mt="lg">
            Logi konta
          </Text>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Gracz</Table.Th>
                <Table.Th>Akcja</Table.Th>
                <Table.Th>Typ</Table.Th>
                <Table.Th>Data</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {accountLogs.length === 0 && (
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <Text size="sm" c="dimmed">
                      Brak logów dla tego konta.
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )}
              {accountLogs.map((log) => (
                <Table.Tr key={log.id}>
                  <Table.Td>#{log.id}</Table.Td>
                  <Table.Td>{log.player}</Table.Td>
                  <Table.Td>{log.action}</Table.Td>
                  <Table.Td>
                    <Badge
                      size="sm"
                      styles={{
                        root: {
                          background: logTypeColor[log.type].bg,
                          color: logTypeColor[log.type].color,
                        },
                      }}
                    >
                      {log.type.toUpperCase()}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{log.date}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>

        <Box className="fb-card" p="lg" style={{ width: 300, flexShrink: 0 }}>
          <Group justify="space-between" mb="md">
            <Text fw={700}>Ustawienia konta</Text>
            <IconSettings size={18} />
          </Group>
          <Stack gap={10}>
            <Button
              variant="light"
              color="blue"
              leftSection={<IconPencil size={16} />}
              justify="start"
              onClick={() => {
                setNameInput(account.name)
                setRenameOpen(true)
              }}
            >
              Zmień nazwę konta
            </Button>
            <Button
              variant="light"
              color="teal"
              leftSection={<IconUserCog size={16} />}
              justify="start"
              onClick={() => {
                setOwnerInput(account.owner)
                setOwnerOpen(true)
              }}
            >
              Zmień właściciela
            </Button>
            <Button
              variant="light"
              color="gray"
              leftSection={<IconUsers size={16} />}
              justify="start"
              onClick={() => setUsersOpen(true)}
            >
              Zarządzaj użytkownikami
            </Button>
            <Button
              variant="light"
              color="red"
              leftSection={<IconTrash size={16} />}
              justify="start"
              onClick={() => setDeleteOpen(true)}
            >
              Usuń konto
            </Button>
          </Stack>
        </Box>
      </Group>

      <ManageUsersModal
        opened={usersOpen}
        onClose={() => setUsersOpen(false)}
        account={account}
        onAddMember={(m) => onAddMember(account.id, m)}
        onRemoveMember={(id) => onRemoveMember(account.id, id)}
      />

      <CreateAccountModal
        opened={createOpen}
        onClose={() => setCreateOpen(false)}
        unlockedTier={account.tier}
        onCreate={onCreateAccount}
      />

      <Modal opened={renameOpen} onClose={() => setRenameOpen(false)} title="Zmień nazwę konta" centered>
        <Stack>
          <TextInput label="Nowa nazwa" value={nameInput} onChange={(e) => setNameInput(e.currentTarget.value)} />
          <Button
            onClick={() => {
              onRenameAccount(account.id, nameInput)
              setRenameOpen(false)
            }}
          >
            Zapisz
          </Button>
        </Stack>
      </Modal>

      <Modal opened={ownerOpen} onClose={() => setOwnerOpen(false)} title="Zmień właściciela konta" centered>
        <Stack>
          <TextInput
            label="Nowy właściciel (Player ID)"
            value={ownerInput}
            onChange={(e) => setOwnerInput(e.currentTarget.value)}
          />
          <Button
            color="teal"
            onClick={() => {
              onChangeOwner(account.id, ownerInput)
              setOwnerOpen(false)
            }}
          >
            Zapisz
          </Button>
        </Stack>
      </Modal>

      <Modal opened={deleteOpen} onClose={() => setDeleteOpen(false)} title="Usuń konto" centered>
        <Stack>
          <Text size="sm">
            Czy na pewno chcesz usunąć konto <b>{account.name}</b>? Tej operacji nie można cofnąć.
          </Text>
          <Group grow>
            <Button variant="default" onClick={() => setDeleteOpen(false)}>
              Anuluj
            </Button>
            <Button
              color="red"
              onClick={() => {
                onDeleteAccount(account.id)
                setDeleteOpen(false)
              }}
            >
              Usuń konto
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  )
}
