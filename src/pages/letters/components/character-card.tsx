import { X as CloseIcon } from '@untitledui/icons';
import { Button as AriaButton } from 'react-aria-components';
import { DialogTrigger, Modal, ModalOverlay, Dialog } from '@/components/application/modals/modal';
import type { CharacterEntry } from '@/types/letters';
import { cx } from '@/utils/cx';

interface CharacterCardProps {
  entry: CharacterEntry;
  variant?: 'sm' | 'md';
}

export function CharacterCard({ entry, variant = 'sm' }: CharacterCardProps) {
  return (
    <DialogTrigger>
      <AriaButton
        aria-label={`${entry.char} — ${entry.romaji}`}
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
        <span className={cx('text-tertiary leading-none', variant === 'sm' ? 'text-xs' : 'text-sm')}>
          {entry.romaji}
        </span>
      </AriaButton>

      <ModalOverlay isDismissable>
        <Modal className="max-w-sm">
          <Dialog>
            {({ close }) => (
              <div className="w-full rounded-2xl border border-secondary bg-primary shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-secondary px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-medium text-primary leading-none">{entry.char}</span>
                    <div>
                      <p className="text-lg font-semibold text-primary">{entry.romaji}</p>
                      <p className="text-sm text-tertiary">Hiragana</p>
                    </div>
                  </div>
                  <AriaButton
                    onPress={close}
                    aria-label="Tutup"
                    className="flex items-center justify-center rounded-lg p-2 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear hover:bg-primary_hover hover:text-fg-secondary focus-visible:outline-2 focus-visible:outline-offset-2"
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
                        <li key={ex.word} className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2.5">
                          <div>
                            <span className="text-base font-medium text-primary">{ex.word}</span>
                            <span className="ml-2 text-sm text-tertiary">({ex.reading})</span>
                          </div>
                          <span className="text-sm text-secondary">{ex.meaning}</span>
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
