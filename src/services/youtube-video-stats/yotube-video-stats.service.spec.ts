import { TestBed, inject } from '@angular/core/testing';

import { YotubeVideoStatsService } from './yotube-video-stats.service';

describe('YotubeVideoStatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YotubeVideoStatsService]
    });
  });

  it('should be created', inject([YotubeVideoStatsService], (service: YotubeVideoStatsService) => {
    expect(service).toBeTruthy();
  }));
});
