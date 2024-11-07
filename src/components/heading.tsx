interface HeadingProps {
  readonly children: React.ReactNode
  readonly level?: number
}

export default function Heading(props: HeadingProps) {
  const { children, level = 1 } = props

  const classMap = [
    'text-5xl font-extrabold',
    'text-4xl font-bold',
    'text-3xl font-bold',
    'text-2xl font-bold',
    'text-xl font-bold',
    'text-lg font-bold'
  ]

  return (
    <h1 className={classMap[level - 1]}>{children}</h1>
  )
}