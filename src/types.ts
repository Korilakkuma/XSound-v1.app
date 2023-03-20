import type { store } from './store';
import type {
  OscillatorModule,
  OneshotModule,
  NoiseModule,
  AudioModule,
  MediaModule,
  StreamModule,
  ProcessorModule,
  MixerModule,
  MIDI,
  MML,
  Source
} from 'xsound';

export type RootState = ReturnType<typeof store.getState>;

export type SoundSource = 'oscillator'
                        | 'piano'
                        | 'guitar'
                        | 'electric-guitar'
                        | 'whitenoise'
                        | 'pinknoise'
                        | 'browniannoise'
                        | 'stream'
                        | 'midi';

export type RIRDescriptor = {
  url: string,
  value: number,
  label: string,
  group: string
};

export type MMLDescriptor = {
  title: string,
  artist: string,
  description: string,
  melody: string,
  bass: string
};

// HACK:
export function ClonedXSound(sourceName: 'oscillator'): OscillatorModule;
export function ClonedXSound(sourceName: 'oneshot'): OneshotModule;
export function ClonedXSound(sourceName: 'noise'): NoiseModule;
export function ClonedXSound(sourceName: 'audio'): AudioModule;
export function ClonedXSound(sourceName: 'media'): MediaModule;
export function ClonedXSound(sourceName: 'stream'): StreamModule;
export function ClonedXSound(sourceName: 'processor'): ProcessorModule;
export function ClonedXSound(sourceName: 'mixer'): MixerModule;
export function ClonedXSound(sourceName: 'midi'): MIDI;
export function ClonedXSound(sourceName: 'mml'): MML;
export function ClonedXSound(sourecName: string): Source | null {
  switch (sourecName) {
    case 'oscillator':
      return {} as OscillatorModule;
    case 'oneshot':
      return {} as OneshotModule;
    case 'noise':
      return {} as NoiseModule;
    case 'audio':
      return {} as AudioModule;
    case 'media':
      return {} as MediaModule;
    case 'stream':
      return {} as StreamModule;
    case 'processor':
      return {} as ProcessorModule;
    case 'mixer':
      return {} as MixerModule;
    case 'midi':
      return {} as MIDI;
    case 'mml':
      return {} as MML;
    default:
      return null;
  }
}

ClonedXSound.free = (_unusedSources: Source[]): void => {
};
