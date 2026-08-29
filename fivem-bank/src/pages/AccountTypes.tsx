import { Carousel } from '@mantine/carousel'
import { Badge, Box, Button, Divider, Group, Stack, Text, ThemeIcon, Title, Tooltip } from '@mantine/core'
import {
  IconBolt,
  IconCash,
  IconCreditCard,
  IconCrown,
  IconHistory,
  IconLock,
  IconSend,
  IconShieldCheck,
  IconWallet,
  IconChartBar,
} from '@tabler/icons-react'
import { PackageTier } from '../types'
import { packages } from '../data/mockData'

interface Props {
  currentTier: PackageTier
  onUpgrade: (tier: PackageTier) => void
}

const tierOrder: PackageTier[] = ['basic', 'silver', 'gold', 'diamond']

const iconMap: Record<string, JSX.Element> = {
  wallet: <IconWallet size={16} />,
  cash: <IconCash size={16} />,
  send: <IconSend size={16} />,
  history: <IconHistory size={16} />,
  creditCard: <IconCreditCard size={16} />,
  shield: <IconShieldCheck size={16} />,
  chart: <IconChartBar size={16} />,
  crown: <IconCrown size={16} />,
  bolt: <IconBolt size={16} />,
}

const tierGradient: Record<PackageTier, string> = {
  basic: 'linear-gradient(160deg, #16202c, #0b1018)',
  silver: 'linear-gradient(160deg, #232b38, #0b1018)',
  gold: 'linear-gradient(160deg, #3a300f, #0b1018)',
  diamond: 'linear-gradient(160deg, #10262b, #0b1018)',
}

export function AccountTypes({ currentTier, onUpgrade }: Props) {
  const currentIndex = tierOrder.indexOf(currentTier)

  return (
    <Stack gap="lg">
      <Box>
        <Title order={3} fw={800} mb={4}>
          Rodzaje konta
        </Title>
        <Text size="sm" c="dimmed">
          Ulepszaj swój pakiet bankowy krok po kroku, aby odblokować niższe prowizje i dodatkowe korzyści. Pakiety
          wykupuje się kolejno — aby aktywować Diamond, musisz posiadać Basic, Silver oraz Gold.
        </Text>
      </Box>

      <Carousel slideSize={{ base: '85%', sm: '340px' }} slideGap="lg" align="start" withControls>
        {packages.map((pkg, i) => {
          const isLocked = i > currentIndex + 1
          const isCurrent = i === currentIndex
          const isNext = i === currentIndex + 1

          return (
            <Carousel.Slide key={pkg.tier}>
              <Box
                p="lg"
                className={isLocked ? 'fb-locked' : ''}
                style={{
                  borderRadius: 16,
                  background: tierGradient[pkg.tier],
                  border: isCurrent ? '1px solid var(--mcolor)' : 'var(--border)',
                  height: '100%',
                  minHeight: 380,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Group justify="space-between" mb="xs">
                  <Title order={4} fw={800}>
                    {pkg.label}
                  </Title>
                  {isCurrent && <Badge color="cyan">Aktywny</Badge>}
                  {isLocked && <IconLock size={18} />}
                </Group>
                <Text size="xl" fw={800} className={!isLocked ? 'fb-gradient-text' : ''} mb={4}>
                  {pkg.price}
                </Text>
                <Group gap={16} mb="sm">
                  <Box>
                    <Text size="xs" c="dimmed">
                      Prowizja bankomat
                    </Text>
                    <Text fw={700}>{pkg.atmFee}</Text>
                  </Box>
                  <Box>
                    <Text size="xs" c="dimmed">
                      Prowizja przelew
                    </Text>
                    <Text fw={700}>{pkg.transferFee}</Text>
                  </Box>
                </Group>
                <Divider my="sm" />
                <Stack gap={8} style={{ flex: 1 }}>
                  {pkg.benefits.map((b, idx) => (
                    <Group key={idx} gap={8} wrap="nowrap">
                      <ThemeIcon variant="light" color="cyan" size={26} radius="md">
                        {iconMap[b.icon]}
                      </ThemeIcon>
                      <Text size="sm">{b.text}</Text>
                    </Group>
                  ))}
                </Stack>

                {isCurrent && (
                  <Badge variant="light" color="teal" mt="md" fullWidth={undefined}>
                    Posiadasz ten pakiet
                  </Badge>
                )}
                {isNext && !isLocked && (
                  <Button mt="md" fullWidth onClick={() => onUpgrade(pkg.tier)}>
                    Ulepsz do {pkg.label}
                  </Button>
                )}
                {isLocked && (
                  <Tooltip label={`Najpierw wykup pakiet ${packages[i - 1].label}`}>
                    <Button mt="md" fullWidth variant="default" disabled leftSection={<IconLock size={14} />}>
                      Zablokowane
                    </Button>
                  </Tooltip>
                )}
              </Box>
            </Carousel.Slide>
          )
        })}
      </Carousel>
    </Stack>
  )
}
