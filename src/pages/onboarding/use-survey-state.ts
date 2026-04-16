import { useState, useEffect } from 'react';

type OnboardingResponses = {
  source: string;
  motivation: string;
  knowledge: string;
  path: string;
};

function persistKey(key: keyof OnboardingResponses, value: string) {
  try {
    const raw = localStorage.getItem('onboarding_responses');
    const stored: Partial<OnboardingResponses> = raw ? (JSON.parse(raw) as Partial<OnboardingResponses>) : {};
    stored[key] = value;
    localStorage.setItem('onboarding_responses', JSON.stringify(stored));
  } catch { /* ignore */ }
}

export function useSurveyState() {
  // Initialize with stable defaults — no localStorage reads in render (SSR-safe)
  const [source, setSourceRaw] = useState('');
  const [motivation, setMotivationRaw] = useState('');
  const [knowledge, setKnowledgeRaw] = useState('');
  const [path, setPathRaw] = useState('');

  // Hydrate from localStorage after mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('onboarding_responses');
      if (!raw) return;
      const stored = JSON.parse(raw) as Partial<OnboardingResponses>;
      if (stored.source) setSourceRaw(stored.source);
      if (stored.motivation) setMotivationRaw(stored.motivation);
      if (stored.knowledge) setKnowledgeRaw(stored.knowledge);
      if (stored.path) setPathRaw(stored.path);
    } catch { /* ignore */ }
  }, []);

  function setSource(val: string) { setSourceRaw(val); persistKey('source', val); }
  function setMotivation(val: string) { setMotivationRaw(val); persistKey('motivation', val); }
  function setKnowledge(val: string) { setKnowledgeRaw(val); persistKey('knowledge', val); }
  function setPath(val: string) { setPathRaw(val); persistKey('path', val); }

  function persist() {
    try {
      localStorage.setItem(
        'onboarding_responses',
        JSON.stringify({ source, motivation, knowledge, path }),
      );
    } catch { /* ignore */ }
  }

  return { source, setSource, motivation, setMotivation, knowledge, setKnowledge, path, setPath, persist };
}
