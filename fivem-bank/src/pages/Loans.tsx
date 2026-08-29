import { Box, Stack, Text, Title } from '@mantine/core'
import { IconBuildingBank } from '@tabler/icons-react'

export function Loans() {
  return (
    <Box className="fb-card" p="xl">
      <Stack align="center" gap={8} py={60}>
        <IconBuildingBank size={40} color="var(--mcolor)" />
        <Title order={4}>Brak aktywnych pożyczek</Title>
        <Text size="sm" c="dimmed" ta="center" maw={360}>
          Złóż wniosek o pożyczkę u swojego doradcy bankowego, aby zobaczyć tutaj harmonogram spłat i oprocentowanie.
        </Text>
      </Stack>
    </Box>
  )
}
