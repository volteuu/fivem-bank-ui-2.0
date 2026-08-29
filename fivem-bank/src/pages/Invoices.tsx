import { Box, Stack, Text, Title } from '@mantine/core'
import { IconFileInvoice } from '@tabler/icons-react'

export function Invoices() {
  return (
    <Box className="fb-card" p="xl">
      <Stack align="center" gap={8} py={60}>
        <IconFileInvoice size={40} color="var(--mcolor)" />
        <Title order={4}>Brak faktur do opłacenia</Title>
        <Text size="sm" c="dimmed" ta="center" maw={360}>
          Gdy otrzymasz fakturę od innego gracza lub firmy, pojawi się ona w tym miejscu wraz z opcją opłacenia jej
          bezpośrednio z Twojego konta.
        </Text>
      </Stack>
    </Box>
  )
}
