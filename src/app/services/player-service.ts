import { Injectable } from '@angular/core';
import { Track } from '../models/track.model';
import { ApiService } from './api-service';

@Injectable()
export class PlayerService {

  visible = false;
  tracks: Track[];
  track: Track;
  audio: any;

  trackPosition: number;
  trackPositionText: string;
  trackDuration: number;
  trackDurationText: string;
  playing: boolean;
  canPlay: boolean;
  progress: number;
  index: number;

  constructor(private api: ApiService) {
    this.playing = false;
    this.canPlay = false;
    this.tracks = [];
  }

  setTracks(tracks: Track[]) {
    this.tracks = tracks;
  }


  playTrack(track: Track) {
    let index = this.tracks.indexOf(track);
    if (index < 0) {
      this.setTracks([track]);
      index = 0;
    }
    this.changeTrack(index);
  }

  playFirst() {
    this.changeTrack(0);
  }

  private changeTrack(index: number) {
    this.index = index;
    this.visible = true;
    this.track = this.tracks[index];
    this.canPlay = false;
    this.playing = false;
    this.progress = 0;
    const url = this.api.getMp3(this.track.pid);
    if (this.audio) {
      this.audio.setAttribute('src', url);
      this.audio.load();
    } else {
      this.audio = new Audio(url);
      this.audio.load();
    }
    this.audio.ontimeupdate = () => {
      this.trackPosition = Math.round(this.audio.currentTime);
      this.trackPositionText = this.formatTime(this.trackPosition);
      if (this.trackDuration) {
        this.progress = this.trackPosition / this.trackDuration;
      }
    };
    this.audio.onloadedmetadata = () => {
      this.trackDuration = Math.round(this.audio.duration);
      this.trackDurationText = this.formatTime(this.trackDuration);
      this.trackPosition = Math.round(this.audio.currentTime);
      this.trackPositionText = this.formatTime(this.trackPosition);
    };
    this.audio.onended = () => {
      if (this.hasNext()) {
        this.playNext();
      } else {
        this.playing = false;
      }
    };
    this.audio.oncanplay = () => {
      this.canPlay = true;
      this.play();
    };
  }

  hasNext() {
    return this.index < this.tracks.length - 1;
  }

  hasPrevious() {
    return this.index > 0;
  }

  isActive(track: Track) {
    return this.track && this.track.pid == track.pid;
  }

  playPrevious() {
    if (!this.hasPrevious()) {
      return;
    }
    this.changeTrack(this.index - 1);
  }

  playNext() {
    if (!this.hasNext()) {
      return;
    }
    this.changeTrack(this.index + 1);
  }

  isPlaying(): boolean {
    return this.playing;
  }

  changeProgress(progress: number) {
    this.audio.currentTime = progress * this.trackDuration;
  }

  play() {
    if (this.audio && this.canPlay) {
      this.playing = true;
      this.audio.play();
    }
  }

  pause() {
    if (this.audio && this.canPlay) {
      this.playing = false;
      this.audio.pause();
    }
  }

  getAlbumImage() {
    return this.api.getThumb(this.track.albumPid);
  }

  private formatTime(secs: number) {
    const hr  = Math.floor(secs / 3600);
    const min = Math.floor((secs - (hr * 3600)) / 60);
    const sec = Math.floor(secs - (hr * 3600) -  (min * 60));
    const m = min < 10 ? '0' + min : '' + min;
    const s = sec < 10 ? '0' + sec : '' + sec;
    const h = hr > 0 ? hr + ':' : '';
    return h + m + ':' + s;
  }

}
