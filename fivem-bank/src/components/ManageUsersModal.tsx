import { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Group,
  Modal,
  MultiSelect,
  Stack,
  Text,
  TextInput,
  ActionIcon,
  Tooltip,
} from '@mantine/core'
import { IconUserPlus, IconUserMinus, IconPlus } from '@tabler/icons-react'
import { Account, AccountMember, Permission } from '../types'

interface Props {
  opened: boolean
  onClose: () => void
  account: Account
  onAddMember: (member: AccountMember) => void
  onRemoveMember: (memberId: string) => void
}

const permissionOptions: { value: Permission; label: string }[] = [
  { value: 'deposit', label: 'Wpłata' },
  { value: 'withdraw', label: 'Wypłata' },
  { value: 'transfer', label: 'Przelewy z konta' },
  { value: 'addUser', label: 'Dodanie użytkownika' },
  { value: 'removeUser', label: 'Usunięcie użytkownika' },
  { value: 'renameAccount', label: 'Zmiana nazwy konta' },
  { value: 'manageUsers', label: 'Zarządzanie użytkownikami' },
  { value: 'payInvoice', label: 'Opłacanie faktur' },
  { value: 'logs', label: 'Logi' },
  { value: 'createCard', label: 'Tworzenie karty' },
  { value: 'removeCard', label: 'Usuwanie karty' },
]

export function ManageUsersModal({ opened, onClose, account, onAddMember, onRemoveMember }: Props) {
  const [addOpen, setAddOpen] = useState(false)
  const [playerId, setPlayerId] = useState('')
  const [perms, setPerms] = useState<Permission[]>(['deposit', 'withdraw'])

  const handleAdd = () => {
    if (!playerId.trim()) return
    onAddMember({ id: `p-${Date.now()}`, name: playerId.trim(), permissions: perms })
    setPlayerId('')
    setPerms(['deposit', 'withdraw'])
    setAddOpen(false)
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Zarządzaj użytkownikami" size="lg" centered>
      <Group justify="space-between" mb="md">
        <TextInput placeholder="Szukaj użytkowników..." style={{ flex: 1 }} />
        <Button leftSection={<IconPlus size={16} />} onClick={() => setAddOpen((o) => !o)}>
          Dodaj użytkownika
        </Button>
      </Group>

      {addOpen && (
        <Box className="fb-card" p="md" mb="md">
          <Stack gap="sm">
            <TextInput
              label="Player ID"
              placeholder="Wpisz player ID..."
              value={playerId}
              onChange={(e) => setPlayerId(e.currentTarget.value)}
            />
            <MultiSelect
              label="Uprawnienia"
              placeholder="Wybierz uprawnienia..."
              data={permissionOptions}
              value={perms}
              onChange={(v) => setPerms(v as Permission[])}
            />
            <Button onClick={handleAdd}>Zapisz użytkownika</Button>
          </Stack>
        </Box>
      )}

      <Stack gap={8}>
        {account.members.length === 0 && (
          <Text size="sm" c="dimmed">
            To konto nie ma jeszcze dodatkowych użytkowników.
          </Text>
        )}
        {account.members.map((m) => (
          <Group key={m.id} justify="space-between" className="fb-card" p="sm">
            <Group gap={10}>
              <Avatar radius="xl" color="cyan" variant="light">
                {m.name.slice(0, 2).toUpperCase()}
              </Avatar>
              <Box>
                <Text fw={600} size="sm">
                  {m.name}
                </Text>
                <Text size="xs" c="dimmed">
                  {m.permissions.length} uprawnień
                </Text>
              </Box>
            </Group>
            <Group gap={6}>
              <Tooltip label="Edytuj uprawnienia">
                <ActionIcon variant="light" color="teal">
                  <IconUserPlus size={16} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Usuń użytkownika">
                <ActionIcon variant="light" color="red" onClick={() => onRemoveMember(m.id)}>
                  <IconUserMinus size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>
        ))}
      </Stack>
    </Modal>
  )
}
