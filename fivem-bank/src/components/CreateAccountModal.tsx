import { useState } from 'react'
import { Box, Button, Group, Modal, SegmentedControl, Stack, Text, TextInput, Tooltip } from '@mantine/core'
import { IconLock, IconUser, IconUsers } from '@tabler/icons-react'
import { AccountKind, PackageTier } from '../types'
import { packages } from '../data/mockData'

interface Props {
  opened: boolean
  onClose: () => void
  unlockedTier: PackageTier
  onCreate: (name: string, kind: AccountKind, tier: PackageTier) => void
}

const tierOrder: PackageTier[] = ['basic', 'silver', 'gold', 'diamond']

export function CreateAccountModal({ opened, onClose, unlockedTier, onCreate }: Props) {
  const [name, setName] = useState('')
  const [kind, setKind] = useState<AccountKind>('personal')
  const [tier, setTier] = useState<PackageTier>('basic')

  const unlockedIndex = tierOrder.indexOf(unlockedTier)

  const handleSubmit = () => {
    if (!name.trim()) return
    onCreate(name.trim(), kind, tier)
    setName('')
    setKind('personal')
    setTier('basic')
    onClose()
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Utwórz nowe konto" centered size="md">
      <Stack gap="md">
        <TextInput
          label="Nazwa konta"
          placeholder="np. Oszczędności"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />

        <Box>
          <Text size="sm" fw={600} mb={6}>
            Rodzaj konta
          </Text>
          <SegmentedControl
            fullWidth
            value={kind}
            onChange={(v) => setKind(v as AccountKind)}
            data={[
              { value: 'personal', label: 'Personalne' },
              { value: 'shared', label: 'Współdzielone' },
            ]}
          />
        </Box>

        <Box>
          <Text size="sm" fw={600} mb={6}>
            Pakiet konta
          </Text>
          <Group gap={10}>
            {packages.map((p, i) => {
              const locked = i > unlockedIndex
              return (
                <Tooltip
                  key={p.tier}
                  label={locked ? `Musisz najpierw wykupić pakiet ${packages[i - 1].label}` : p.label}
                  disabled={!locked}
                >
                  <Box
                    onClick={() => !locked && setTier(p.tier)}
                    className={locked ? 'fb-locked' : ''}
                    style={{
                      cursor: locked ? 'not-allowed' : 'pointer',
                      border: tier === p.tier && !locked ? '2px solid var(--mcolor)' : 'var(--border)',
                      borderRadius: 10,
                      padding: '10px 14px',
                      minWidth: 84,
                      textAlign: 'center',
                      background: 'var(--bg3)',
                    }}
                  >
                    {locked && <IconLock size={14} style={{ marginBottom: 4 }} />}
                    <Text size="sm" fw={700}>
                      {p.label}
                    </Text>
                  </Box>
                </Tooltip>
              )
            })}
          </Group>
        </Box>

        <Group gap={8} c="dimmed">
          {kind === 'personal' ? <IconUser size={16} /> : <IconUsers size={16} />}
          <Text size="xs">
            {kind === 'personal'
              ? 'Konto personalne widoczne tylko dla Ciebie.'
              : 'Konto współdzielone — możesz dodać innych graczy i zarządzać ich uprawnieniami.'}
          </Text>
        </Group>

        <Button fullWidth onClick={handleSubmit}>
          Utwórz konto
        </Button>
      </Stack>
    </Modal>
  )
}
