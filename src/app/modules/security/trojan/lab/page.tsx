// File: src/app/modules/security/trojan/lab/page.tsx
import { redirect } from 'next/navigation';

export default function TrojanLabRedirectPage() {
  redirect('/modules/security/malware/lab/trojan');
}
