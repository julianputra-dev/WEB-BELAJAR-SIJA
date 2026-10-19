// File: src/app/modules/security/ransomware/lab/page.tsx
'use client';

import MalwareLabWorkspacePage from '@/app/modules/security/malware/lab/[malwareType]/page';

export default function RansomwareLabPage() {
  return <MalwareLabWorkspacePage params={Promise.resolve({ malwareType: 'ransomware' })} />;
}
