import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MyPropyto - Dashboard',
  description: 'Manage your property listings and responses',
}

export default function MyPropytoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
    </section>
  )
} 