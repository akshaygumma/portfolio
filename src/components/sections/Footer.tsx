import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { EmailButton } from '@/components/EmailButton'

export function Footer() {
  return (
    <footer className="glass border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Let's talk</p>
          <EmailButton variant="inline" className="mt-1.5" />
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a
            href="https://github.com/akshaygumma"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-4" />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/akshaygumma"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="size-4" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-5xl px-6 py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Akshay Gumma · Built with React, Tailwind &amp; a canvas
          that follows your cursor.
        </p>
      </div>
    </footer>
  )
}
