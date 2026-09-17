'use client';

import Link from 'next/link';
import { useRef } from 'react';

import { signOut } from '@/app/actions/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { HeaderAccount } from '@/lib/auth/account';

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'C';
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return `${parts[0].slice(0, 1)}${parts[1].slice(0, 1)}`.toUpperCase();
}

export function UserMenu({ account }: { account: HeaderAccount }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <form ref={formRef} action={signOut} className="hidden" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="gap-2 text-white hover:bg-white/10 hover:text-white"
            aria-label={`Conta de ${account.displayName}`}
          >
            <Avatar size="sm" className="ring-1 ring-white/20">
              {account.avatarUrl ? <AvatarImage src={account.avatarUrl} alt="" /> : null}
              <AvatarFallback className="bg-white/10 text-white">
                {initials(account.displayName)}
              </AvatarFallback>
            </Avatar>
            <span className="hidden max-w-28 truncate sm:inline">{account.displayName}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="cf-glass-strong min-w-56">
          <DropdownMenuLabel className="font-normal">
            <span className="text-foreground block truncate font-medium">
              {account.displayName}
            </span>
            {account.email ? (
              <span className="text-muted-foreground block truncate text-xs">{account.email}</span>
            ) : null}
            {account.roleLabels.length > 0 ? (
              <span className="text-muted-foreground mt-1 block text-xs">
                {account.roleLabels.join(' · ')}
              </span>
            ) : null}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={account.primaryHref}>{account.primaryLabel}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => {
              formRef.current?.requestSubmit();
            }}
          >
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
