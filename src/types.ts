import type { X, RecordType, QuantizationBit, WaveExportType } from 'xsound';

declare global {
  interface Window {
    X: typeof X;
    clonedXSound: ReturnType<typeof X.clone>;
  }
}

export type SoundSource = 'oscillator' | 'piano' | 'guitar' | 'electric-guitar' | 'whitenoise' | 'pinknoise' | 'browniannoise' | 'stream' | 'midi';

export type VisualizerType = 'bitmap' | 'vector';

export type CustomizedParameters = {
  analyser?: {
    visualizer: VisualizerType;
  };
  recorder?: {
    channel: RecordType;
    bit: QuantizationBit;
    type: Pick<WaveExportType, 'dataURL' | 'objectURL'>;
  };
  audio?: {
    playbackRate: boolean;
  };
};

export type RIRDescriptor = {
  url: string;
  value: number;
  label: string;
  group: string;
};

export type MMLDescriptor = {
  title: string;
  artist: string;
  description: string;
  melody: string;
  bass: string;
};
