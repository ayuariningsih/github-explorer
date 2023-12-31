import { UserList } from '@/components'

export default function Home() {
  return (
    <main className="overflow-hidden max-w-[1440px] mx-auto px-8 py-5">
      <h1 className="text-2xl font-extrabold py-5 text-center">GitHub Repository Explorer</h1>
      <UserList />
    </main>
  )
}
