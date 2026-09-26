'use client';

import { useMemo, useState } from 'react';

import Image from 'next/image';

import {
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Inbox,
  Mail,
  Paperclip,
  Phone,
  Search,
  Undo2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { updateRequestReplied, type RequestRow } from '@/actions/requests.action';

type Filter = 'all' | 'new' | 'replied';

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'replied', label: 'Replied' },
];

/** Muted tints for the initials tile, so senders stay distinguishable at a glance. */
const TILE_TINTS = [
  'bg-green-soft text-green-dark',
  'bg-amber-soft text-amber',
  'bg-navy/10 text-navy',
] as const;

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const letters = parts.map((part) => part[0] ?? '').join('');

  return letters.toUpperCase() || '?';
}

function tintFor(name: string) {
  let sum = 0;
  for (const character of name) sum += character.charCodeAt(0);

  return TILE_TINTS[sum % TILE_TINTS.length];
}

export default function RequestsClient({
  initialRequests,
}: {
  initialRequests: RequestRow[];
}) {
  const [requests, setRequests] = useState<RequestRow[]>(initialRequests);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  async function toggleReplied(id: string) {
    const request = requests.find((item) => item.id === id);

    if (!request || updatingId) return;

    const replied = !request.replied;

    setUpdatingId(id);

    try {
      await updateRequestReplied(id, replied);

      setRequests((current) =>
        current.map((item) => (item.id === id ? { ...item, replied } : item)),
      );
    } catch (error) {
      console.error('Failed to update request:', error);
    } finally {
      setUpdatingId(null);
    }
  }

  async function copyToClipboard(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      // Clipboard access can be refused; the text stays selectable either way.
    }
  }

  const newCount = requests.filter((request) => !request.replied).length;
  const repliedCount = requests.length - newCount;

  const counts: Record<Filter, number> = {
    all: requests.length,
    new: newCount,
    replied: repliedCount,
  };

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return requests.filter((request) => {
      if (filter === 'new' && request.replied) return false;
      if (filter === 'replied' && !request.replied) return false;

      if (!needle) return true;

      return (
        request.name.toLowerCase().includes(needle) ||
        request.email.toLowerCase().includes(needle) ||
        request.phone.toLowerCase().includes(needle) ||
        request.message.toLowerCase().includes(needle)
      );
    });
  }, [requests, filter, query]);

  // Filtering away the open request falls back to the summary panel.
  const selected = visible.find((request) => request.id === selectedId) ?? null;

  return (
    <div className="mx-auto w-full max-w-[1400px] px-5 py-8 sm:px-6 sm:py-10">
      {/* ------------------------------- page head ------------------------------- */}
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
        <div>
          <h1 className="text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight font-extrabold tracking-[-0.015em] text-navy">
            Requests
          </h1>

          <p className="mt-1.5 text-sm text-subtle">
            Messages sent through the contact form.
          </p>
        </div>

        <dl className="flex items-stretch gap-6 rounded-xl border border-line bg-surface px-5 py-3">
          <div>
            <dt className="text-[11px] font-semibold tracking-[0.06em] text-faint uppercase">
              Waiting
            </dt>
            <dd className="mt-0.5 text-xl font-extrabold tracking-[-0.02em] text-amber">
              {newCount}
            </dd>
          </div>

          <div className="border-l border-line pl-6">
            <dt className="text-[11px] font-semibold tracking-[0.06em] text-faint uppercase">
              Answered
            </dt>
            <dd className="mt-0.5 text-xl font-extrabold tracking-[-0.02em] text-green">
              {repliedCount}
            </dd>
          </div>
        </dl>
      </div>

      {/* --------------------------------- toolbar -------------------------------- */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-[320px]">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-faint" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, email, phone or message"
            aria-label="Search requests"
            className="h-9 bg-surface pl-8"
          />
        </div>

        <div
          role="tablist"
          aria-label="Filter requests"
          className="flex items-center gap-1 rounded-lg border border-line bg-surface p-1"
        >
          {FILTERS.map((option) => {
            const active = filter === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(option.value)}
                className={
                  active
                    ? 'flex items-center gap-1.5 rounded-md bg-green-soft px-3 py-1.5 text-sm font-semibold text-green-dark'
                    : 'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-subtle transition-colors hover:bg-paper hover:text-navy'
                }
              >
                {option.label}
                <span
                  className={
                    active
                      ? 'text-[12px] font-semibold text-green'
                      : 'text-[12px] text-faint'
                  }
                >
                  {counts[option.value]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------ inbox + reader ----------------------------- */}
      <div className="mt-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
        {/* queue */}
        <div
          className={`overflow-hidden rounded-xl border border-line bg-surface lg:block ${
            selected ? 'hidden' : 'block'
          }`}
        >
          <div className="border-b border-line px-4 py-2.5 text-[12px] font-semibold tracking-[0.04em] text-faint uppercase">
            {visible.length} {visible.length === 1 ? 'request' : 'requests'}
          </div>

          <ul className="m-0 max-h-[min(560px,70svh)] list-none overflow-y-auto p-0">
            {visible.map((request) => {
              const active = request.id === selectedId;

              return (
                <li key={request.id} className="border-b border-line last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setSelectedId(request.id)}
                    aria-current={active ? 'true' : undefined}
                    className={`flex w-full items-start gap-3 border-l-2 px-4 py-3.5 text-left transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none ${
                      active
                        ? 'border-l-navy bg-paper'
                        : 'border-l-transparent hover:bg-paper/70'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex size-8 flex-none items-center justify-center rounded-full text-[12px] font-bold ${tintFor(
                        request.name,
                      )}`}
                      aria-hidden="true"
                    >
                      {initials(request.name)}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        {!request.replied ? (
                          <span
                            className="size-1.5 flex-none rounded-full bg-amber"
                            aria-label="Not answered yet"
                          />
                        ) : null}

                        <span
                          className={`min-w-0 flex-1 truncate text-[14px] ${
                            request.replied
                              ? 'font-medium text-subtle'
                              : 'font-bold text-navy'
                          }`}
                        >
                          {request.name}
                        </span>

                        {request.imageUrl ? (
                          <Paperclip
                            className="size-3 flex-none text-faint"
                            aria-label="Has an attachment"
                          />
                        ) : null}
                      </span>

                      <span className="mt-1 block truncate text-[12px] text-faint">
                        {request.received}
                      </span>

                      <span className="mt-1 line-clamp-2 block text-[13px] leading-snug text-subtle">
                        {request.message}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}

            {visible.length === 0 ? (
              <li className="px-4 py-12 text-center">
                <Inbox className="mx-auto size-6 text-line-strong" />
                <p className="mt-3 text-sm font-medium text-navy">
                  {requests.length === 0
                    ? 'No requests yet'
                    : 'Nothing matches that search'}
                </p>
                <p className="mt-1 text-[13px] text-faint">
                  {requests.length === 0
                    ? 'Messages sent through the contact form land here.'
                    : 'Try a different name, email or phrase.'}
                </p>
              </li>
            ) : null}
          </ul>
        </div>

        {/* reader */}
        <div className={`lg:block ${selected ? 'block' : 'hidden'}`}>
          {selected ? (
            <article className="rounded-xl border border-line bg-surface lg:sticky lg:top-24">
              <div className="border-b border-line p-5 sm:p-6">
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="mb-4 flex items-center gap-1.5 text-[13px] font-medium text-subtle transition-colors hover:text-navy lg:hidden"
                >
                  <ArrowLeft className="size-3.5" />
                  All requests
                </button>

                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`flex size-11 flex-none items-center justify-center rounded-full text-sm font-bold ${tintFor(
                        selected.name,
                      )}`}
                      aria-hidden="true"
                    >
                      {initials(selected.name)}
                    </span>

                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-bold tracking-[-0.01em] text-navy">
                        {selected.name}
                      </h2>
                      <p className="mt-0.5 text-[13px] text-faint">
                        {selected.received}
                      </p>
                    </div>
                  </div>

                  <span
                    className={
                      selected.replied
                        ? 'rounded-full bg-green-soft px-2.5 py-1 text-[11px] font-semibold tracking-[0.04em] text-green-dark uppercase'
                        : 'rounded-full bg-amber-soft px-2.5 py-1 text-[11px] font-semibold tracking-[0.04em] text-amber uppercase'
                    }
                  >
                    {selected.replied ? 'Answered' : 'Waiting'}
                  </span>
                </div>

                {/* contact details */}
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <div className="flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-2">
                    <Mail className="size-3.5 flex-none text-faint" />
                    <a
                      href={`mailto:${selected.email}`}
                      className="min-w-0 flex-1 truncate text-[13px] text-ink no-underline hover:text-green"
                    >
                      {selected.email}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(selected.email, 'email')}
                      className="flex-none text-[11px] font-semibold text-faint transition-colors hover:text-navy"
                    >
                      {copied === 'email' ? (
                        'Copied'
                      ) : (
                        <Copy className="size-3.5" aria-label="Copy email address" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-2">
                    <Phone className="size-3.5 flex-none text-faint" />
                    <a
                      href={`tel:${selected.phone}`}
                      className="min-w-0 flex-1 truncate font-mono text-[13px] text-ink no-underline hover:text-green"
                    >
                      {selected.phone}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(selected.phone, 'phone')}
                      className="flex-none text-[11px] font-semibold text-faint transition-colors hover:text-navy"
                    >
                      {copied === 'phone' ? (
                        'Copied'
                      ) : (
                        <Copy className="size-3.5" aria-label="Copy phone number" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* message */}
              <div className="p-5 sm:p-6">
                <p className="text-[15px] leading-relaxed whitespace-pre-line text-ink">
                  {selected.message}
                </p>

                {selected.imageUrl ? (
                  <a
                    href={selected.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 flex items-center gap-3 rounded-lg border border-line bg-paper p-3 no-underline transition-colors hover:border-green"
                  >
                    <Image
                      src={selected.imageUrl}
                      alt={`Attachment from ${selected.name}`}
                      width={160}
                      height={112}
                      className="h-16 w-24 flex-none rounded-md border border-line object-cover"
                    />

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-navy">
                        {selected.imageName ?? 'Screenshot'}
                      </span>
                      <span className="mt-0.5 block text-[12px] text-faint">
                        Opens in a new tab
                      </span>
                    </span>

                    <ExternalLink className="size-4 flex-none text-faint" />
                  </a>
                ) : null}
              </div>

              {/* actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-paper/60 p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-green text-white hover:bg-green-dark"
                    nativeButton={false}
                    render={
                      <a
                        href={`mailto:${selected.email}?subject=${encodeURIComponent(
                          `Re: your request to eGramSwaraj Automation`,
                        )}`}
                      />
                    }
                  >
                    <Mail className="size-3.5" />
                    Reply by email
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-line text-subtle"
                    nativeButton={false}
                    render={<a href={`tel:${selected.phone}`} />}
                  >
                    <Phone className="size-3.5" />
                    Call
                  </Button>
                </div>

                <Button
                  variant={selected.replied ? 'ghost' : 'outline'}
                  size="sm"
                  disabled={updatingId === selected.id}
                  onClick={() => toggleReplied(selected.id)}
                  className={
                    selected.replied
                      ? 'text-faint hover:text-navy'
                      : 'border-green/30 text-green hover:bg-green-soft hover:text-green-dark'
                  }
                >
                  {selected.replied ? (
                    <>
                      <Undo2 className="size-3.5" />
                      {updatingId === selected.id
                        ? 'Marking as waiting'
                        : 'Mark as waiting'}
                    </>
                  ) : (
                    <>
                      <Check className="size-3.5" />
                      {updatingId === selected.id
                        ? 'Marking as answered'
                        : 'Mark as answered'}
                    </>
                  )}
                </Button>
              </div>
            </article>
          ) : (
            <div className="hidden rounded-xl border border-dashed border-line-strong bg-surface px-6 py-16 text-center lg:block">
              <Inbox className="mx-auto size-7 text-line-strong" />
              <p className="mt-4 text-base font-bold tracking-[-0.01em] text-navy">
                {requests.length === 0
                  ? 'No requests yet'
                  : 'Pick a request to read it'}
              </p>
              <p className="mx-auto mt-2 max-w-[42ch] text-sm text-subtle">
                {requests.length === 0
                  ? 'Anything sent through the contact form on the website will show up here.'
                  : newCount > 0
                    ? `${newCount} ${newCount === 1 ? 'request is' : 'requests are'} still waiting for an answer.`
                    : 'Every request has been answered.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
