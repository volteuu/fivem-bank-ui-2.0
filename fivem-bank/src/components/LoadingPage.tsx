import { useState } from 'react'
import { Box, Center, Stack, Text, Title, UnstyledButton, Loader, Group } from '@mantine/core'
import { IconUser, IconBuildingBank, IconArrowRight } from '@tabler/icons-react'
import { ProfileType } from '../types'

interface Props {
  onSelect: (type: ProfileType) => void
}

const options: { type: ProfileType; label: string; desc: string; icon: JSX.Element }[] = [
  {
    type: 'private',
    label: 'Konto prywatne',
    desc: 'Zarządzaj swoimi osobistymi finansami i oszczędnościami.',
    icon: <IconUser size={34} stroke={1.5} />,
  },
  {
    type: 'business',
    label: 'Konto służbowe',
    desc: 'Dostęp do finansów firmy, wypłat i kont współdzielonych.',
    icon: <IconBuildingBank size={34} stroke={1.5} />,
  },
]

export function LoadingPage({ onSelect }: Props) {
  const [pending, setPending] = useState<ProfileType | null>(null)

  const handlePick = (type: ProfileType) => {
    setPending(type)
    setTimeout(() => onSelect(type), 900)
  }

  return (
    <Center h="100vh" w="100vw" style={{ background: 'var(--bg1)' }}>
      <Stack align="center" gap={48} className="fb-fade-in">
        <Stack align="center" gap={4}>
          <Text tt="uppercase" fw={700} size="xs" c="dimmed" style={{ letterSpacing: 4 }}>
            Fleeca Financial Group
          </Text>
          <Title order={1} fw={800} style={{ letterSpacing: -1 }}>
            Wybierz typ profilu
          </Title>
        </Stack>

        {pending ? (
          <Stack align="center" gap={16}>
            <Loader color="cyan" size={38} />
            <Text c="dimmed" size="sm">
              Logowanie do panelu {pending === 'private' ? 'prywatnego' : 'służbowego'}...
            </Text>
          </Stack>
        ) : (
          <Group gap={24}>
            {options.map((opt) => (
              <UnstyledButton
                key={opt.type}
                onClick={() => handlePick(opt.type)}
                className="fb-card fb-card-hover"
                style={{
                  width: 260,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                <Box
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--note-bg)',
                    color: 'var(--mcolor)',
                  }}
                >
                  {opt.icon}
                </Box>
                <Text fw={700} size="lg">
                  {opt.label}
                </Text>
                <Text size="sm" c="dimmed">
                  {opt.desc}
                </Text>
                <Group gap={6} c="cyan.5" mt={4}>
                  <Text size="sm" fw={600}>
                    Kontynuuj
                  </Text>
                  <IconArrowRight size={16} />
                </Group>
              </UnstyledButton>
            ))}
          </Group>
        )}
      </Stack>
    </Center>
  )
}
