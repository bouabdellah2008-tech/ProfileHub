'use client'

import { useState, useEffect } from 'react'

export interface ToastProps {
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: 'default' | 'destructive'
  duration?: number
}

type Toast = ToastProps & { id: string }

let toasts: Array<Toast> = []
type ToastListener = (toasts: Array<Toast>) => void
let listeners: Array<ToastListener> = []

export function toast(props: ToastProps) {
  const id = crypto.randomUUID()
  toasts = [...toasts, { ...props, id }]
  listeners.forEach((listener) => listener(toasts))
  
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id)
    listeners.forEach((listener) => listener(toasts))
  }, props.duration || 4000)
}

export function useToast() {
  return { toasts, toast }
}

export function Toaster() {
  const [currentToasts, setCurrentToasts] = useState(toasts)
  
  useEffect(() => {
    const listener = (newToasts: Toast[]) => {
      setCurrentToasts([...newToasts])
    }
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }, [])

  if (currentToasts.length === 0) return null

  return (
    <div className="fixed top-0 right-0 z-50 flex flex-col gap-2 p-4 w-full max-w-sm pointer-events-none">
      {currentToasts.map(({ id, title, description, variant = 'default' }) => (
        <div
          key={id}
          className={`pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg ${
            variant === 'destructive' 
              ? 'border-destructive bg-destructive text-destructive-foreground' 
              : 'bg-card'
          }`}
        >
          <div className="flex-1">
            {title && <div className="font-semibold">{title}</div>}
            {description && <div className="text-sm mt-1 opacity-90">{description}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}