import { useEffect, useRef, useState } from 'react'
import { Check, Mail } from 'lucide-react'
import { copyText } from '@/lib/clipboard'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const EMAIL = 'gummaakshay@gmail.com'

type State = 'idle' | 'copied' | 'failed'

/**
 * `mailto:` silently does nothing for anyone without a mail client
 * registered, so clicking copies the address instead. Clipboard access can
 * itself be denied (Safari quirks, permissions policy, insecure contexts), so
 * the failure path surfaces the address with `user-select: all` — one click
 * then selects the whole thing. Either way the click is never dead.
 */
export function EmailButton({
  variant = 'icon',
  className,
}: {
  variant?: 'icon' | 'inline'
  className?: string
}) {
  const [state, setState] = useState<State>('idle')
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleCopy = async () => {
    const ok = await copyText(EMAIL)
    setState(ok ? 'copied' : 'failed')
    clearTimeout(timer.current)
    // Leave the manual fallback up longer — it has to be read, not just seen.
    timer.current = setTimeout(() => setState('idle'), ok ? 2000 : 8000)
  }

  if (variant === 'inline') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title={`Copy ${EMAIL}`}
        className={cn(
          'inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground',
          className,
        )}
      >
        {state === 'copied' ? (
          <Check className="size-3.5 text-emerald-500" />
        ) : (
          <Mail className="size-3.5" />
        )}
        <span className="select-all">{EMAIL}</span>
        {state === 'copied' && <span className="text-xs text-emerald-500">copied</span>}
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={state === 'copied' ? 'Email address copied' : `Copy email address ${EMAIL}`}
        title={state === 'copied' ? 'Copied!' : `Copy ${EMAIL}`}
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), className)}
      >
        {state === 'copied' ? (
          <Check className="size-4 text-emerald-500" />
        ) : (
          <Mail className="size-4" />
        )}
      </button>

      {state !== 'idle' && (
        <div
          role="status"
          className="glass absolute right-0 top-full z-50 mt-2 whitespace-nowrap rounded-md border border-border px-3 py-2 text-xs shadow-lg"
        >
          {state === 'copied' ? (
            <span className="text-emerald-500">Copied to clipboard</span>
          ) : (
            <>
              <span className="select-all font-mono">{EMAIL}</span>
              <span className="ml-2 text-muted-foreground">click to select</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}
