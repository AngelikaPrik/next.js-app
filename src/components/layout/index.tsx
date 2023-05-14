import { Header } from "./header"

export default function Layout({ children }: PropsType) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

interface PropsType {
  children: React.ReactNode
}
