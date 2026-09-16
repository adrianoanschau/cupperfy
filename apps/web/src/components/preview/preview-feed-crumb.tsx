import Link from 'next/link';

export function PreviewFeedCrumb() {
  return (
    <p className="mb-3 text-sm">
      <Link
        href="/preview"
        className="text-white/70 underline-offset-4 hover:text-white hover:underline"
      >
        ← Voltar ao feed
      </Link>
    </p>
  );
}
