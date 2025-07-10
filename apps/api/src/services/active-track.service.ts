import { Server as SocketIOServer } from 'socket.io';
import { getTracks } from '../utils/db';
import { Track } from '../types';

export class ActiveTrackManager {
  private io: SocketIOServer;
  private currentTrack: Track | null = null;
  private tracks: Track[] = [];
  private intervalId: NodeJS.Timeout | null = null;

  constructor(io: SocketIOServer) {
    this.io = io;
  }

  async start(): Promise<void> {
    try {
      this.tracks = (await getTracks()).tracks;

      if (this.tracks.length === 0) {
        console.warn('No tracks found for active track streaming');
        return;
      }

      this.setRandomTrack();

      this.startTrackRotation();

      console.log('Active track streaming started');
    } catch (error) {
      console.error('Error starting active track manager:', error);
    }
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private setRandomTrack(): void {
    if (this.tracks.length === 0) return;

    const randomIndex = Math.floor(Math.random() * this.tracks.length);
    const newTrack = this.tracks[randomIndex];

    if (
      this.tracks.length > 1 &&
      this.currentTrack &&
      newTrack.id === this.currentTrack.id
    ) {
      this.setRandomTrack();
      return;
    }

    this.currentTrack = newTrack;
    this.broadcastActiveTrack();
  }

  private startTrackRotation(): void {
    this.intervalId = setInterval(() => {
      this.setRandomTrack();
    }, this.getRandomInterval());
  }

  private getRandomInterval(): number {
    return Math.floor(Math.random() * 1000) + 1000;
  }

  private broadcastActiveTrack(): void {
    if (!this.currentTrack) return;

    const activeTrackData = {
      id: this.currentTrack.id,
      title: this.currentTrack.title,
    };

    this.io.emit('activeTrackUpdate', activeTrackData);
  }

  getCurrentTrack(): Track | null {
    return this.currentTrack;
  }

  setTrack(trackId: string): boolean {
    const track = this.tracks.find((t) => t.id === trackId);
    if (track) {
      this.currentTrack = track;
      this.broadcastActiveTrack();
      return true;
    }
    return false;
  }
}
