import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { EmailButton } from '@/components/EmailButton'
import { ThemeToggle } from '@/components/ThemeToggle'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Games', href: '#games' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
]

export function Nav() {
  return (
    <header className="glass sticky top-0 z-50 border-b border-border/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
          akshay<span className="text-primary">.</span>gumma
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <a
            href="https://github.com/akshaygumma"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href="https://linkedin.com/in/akshaygumma"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
          >
            <LinkedinIcon className="size-4" />
          </a>
          <EmailButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
