import { Suspense } from 'react'
import { Web3Provider } from './Web3Provider'

export const Web3PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Web3Provider>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        {children}
      </Suspense>
    </Web3Provider>
  )
}