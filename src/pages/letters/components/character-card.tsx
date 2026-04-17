import { X as CloseIcon } from '@untitledui/icons';
import { Button as AriaButton } from 'react-aria-components';
import { DialogTrigger, Modal, ModalOverlay, Dialog } from '@/components/application/modals/modal';
import type { CharacterEntry } from '@/types/letters';
import { cx } from '@/utils/cx';

interface CharacterCardProps {
  entry: CharacterEntry;
  variant?: 'sm' | 'md';
  /** When true, shows meaning below char instead of romaji (for kanji) */
  isKanji?: boolean;
}

export function CharacterCard({ entry, variant = 'sm', isKanji = false }: CharacterCardProps) {
  const sublabel = isKanji ? (entry.meaning ?? entry.romaji) : entry.romaji;

  return (
    <DialogTrigger>
      <AriaButton
        aria-label={`${entry.char} — ${isKanji ? entry.meaning : entry.romaji}`}
        className={cx(
          'group flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-secondary bg-primary shadow-xs outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2',
          variant === 'sm' ? 'gap-1 py-2.5 px-1.5' : 'gap-2 py-4 px-3',
        )}
      >
        <span
          className={cx(
            'font-medium text-primary leading-none',
            variant === 'sm' ? 'text-xl' : 'text-3xl',
          )}
        >
          {entry.char}
        </span>
        <span
          className={cx(
            'text-tertiary leading-none text-center truncate w-full',
            variant === 'sm' ? 'text-xs' : 'text-sm',
          )}
        >
          {sublabel}
        </span>
      </AriaButton>

      <ModalOverlay isDismissable>
        <Modal className="max-w-sm">
          <Dialog>
            {({ close }) => (
              <div className="w-full rounded-2xl border border-secondary bg-primary shadow-xl">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-secondary px-6 py-4">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-medium text-primary leading-none">{entry.char}</span>
                    <div className="flex flex-col gap-1">
                      {isKanji ? (
                        <>
                          <p className="text-base font-semibold text-primary">{entry.meaning}</p>
                          {entry.onyomi && (
                            <p className="text-xs text-tertiary">音読み: <span className="text-secondary">{entry.onyomi}</span></p>
                          )}
                          {entry.kunyomi && entry.kunyomi !== '—' && (
                            <p className="text-xs text-tertiary">訓読み: <span className="text-secondary">{entry.kunyomi}</span></p>
                          )}
                        </>
                      ) : (
                        <>
                          <p className="text-lg font-semibold text-primary">{entry.romaji}</p>
                          <p className="text-xs text-tertiary capitalize">{entry.char.length > 1 ? 'Kombinasi' : 'Kana'}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <AriaButton
                    onPress={close}
                    aria-label="Tutup"
                    className="flex shrink-0 items-center justify-center rounded-lg p-2 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-secondary focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    <CloseIcon className="size-5" aria-hidden="true" />
                  </AriaButton>
                </div>

                {/* Examples */}
                {entry.examples && entry.examples.length > 0 && (
                  <div className="px-6 py-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-tertiary">Contoh Kata</p>
                    <ul className="flex flex-col gap-2">
                      {entry.examples.map((ex) => (
                        <li key={ex.word} className="flex items-center justify-between gap-3 rounded-lg bg-secondary px-3 py-2.5">
                          <div className="min-w-0">
                            <span className="text-base font-medium text-primary">{ex.word}</span>
                            <span className="ml-2 text-sm text-tertiary">({ex.reading})</span>
                          </div>
                          <span className="shrink-0 text-sm text-secondary">{ex.meaning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
