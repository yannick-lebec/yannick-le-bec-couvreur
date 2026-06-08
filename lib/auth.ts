import { cookies } from 'next/headers'

export async function getSession() {
  const cookieStore = await cookies()
  return cookieStore.get('admin-session')
}

export async function isAuthenticated() {
  const session = await getSession()
  return session?.value === process.env.ADMIN_PASSWORD
}
