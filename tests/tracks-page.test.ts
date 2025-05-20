import { test, expect } from '@playwright/test';

async function createTrack(page, track) {
  const createTrackButton = page.getByTestId('create-track-button');
  await createTrackButton.click();

  const trackForm = page.getByTestId('track-form');
  await expect(trackForm).toBeVisible();

  await trackForm.getByTestId('input-title').fill(track.title);
  await trackForm.getByTestId('input-artist').fill(track.artist);
  await trackForm.getByTestId('input-album').fill(track.album);
  await trackForm.getByTestId('input-cover-image').fill(track.coverImage);

  await trackForm.getByTestId('genre-selector').click();
  const input = trackForm.getByTestId('genre-selector').locator('input');
  await input.fill(track.genre);
  await page.getByRole('option', { name: track.genre }).click();
  await trackForm.click({ position: { x: 10, y: 10 } });
  await page.waitForTimeout(300);

  await trackForm.getByTestId('submit-button').click();
  await page.waitForTimeout(500);
}

test.describe('Tracks Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have title and icon', async ({ page }) => {
    await expect(page).toHaveTitle('Music Platform');
    const icon = page.locator('link[rel="icon"]');
    await expect(icon).toHaveAttribute('href', '/favicon.svg');
  });

  test.describe('Tracks list', () => {
    test('should show loading state', async ({ page }) => {
      const loadingElement = page.getByTestId('loading-tracks');
      await expect(loadingElement).toBeVisible();
      await expect(loadingElement).toHaveAttribute('data-loading', 'true');
    });

    test('should show empty state when no tracks are available', async ({
      page,
    }) => {
      await page.getByTestId('loading-tracks').waitFor({ state: 'hidden' });

      const searchInput = page.getByTestId('search-input');
      await searchInput.fill('nonexistent track');

      const emptyMessage = page.getByText('No tracks found');
      await expect(emptyMessage).toBeVisible();
    });

    test('should display tracks when data is loaded', async ({ page }) => {
      await page.getByTestId('loading-tracks').waitFor({ state: 'hidden' });

      const tracksList = page.getByTestId('tracks-list');
      await expect(tracksList).toBeVisible();

      const trackItemsCount = await tracksList.locator('*').count();
      expect(trackItemsCount).toBeGreaterThan(0);
    });
  });

  test.describe('Tracks filters', () => {
    test('should filter tracks by title', async ({ page }) => {
      await page.getByTestId('loading-tracks').waitFor({ state: 'hidden' });

      const searchTerm = 'Love Story';
      const searchInput = page.getByTestId('search-input');
      await searchInput.fill(searchTerm);

      await page.waitForTimeout(1000);

      const trackItems = await page.getByTestId(/^track-item-/).all();

      if (trackItems.length > 0) {
        let hasMatch = false;

        for (const item of trackItems) {
          const titleElement = item.getByTestId(/title$/);
          const titleText = await titleElement.textContent();

          if (titleText?.toLowerCase().includes(searchTerm.toLowerCase())) {
            hasMatch = true;
            break;
          }
        }

        expect(hasMatch).toBeTruthy();
      } else {
        console.log('No tracks match the search term');
      }
    });

    test('should filter tracks by artist', async ({ page }) => {
      await page.getByTestId('loading-tracks').waitFor({ state: 'hidden' });

      const searchTerm = 'Lady Gaga';
      const searchInput = page.getByTestId('filter-artist');
      await searchInput.fill(searchTerm);

      await page.waitForTimeout(500);
      
      const noTracksMessage = page.getByText('No tracks found');
      const isNoTracksVisible = await noTracksMessage.isVisible();
      
      if (isNoTracksVisible) {
        console.log(`No tracks found for artist: ${searchTerm}`);
        return;
      }

      const trackItems = await page.getByTestId(/^track-item-/).all();

      if (trackItems.length > 0) {
        let hasMatch = false;

        for (const item of trackItems) {
          const artistElement = item.getByTestId(/artist$/);
          const artistText = await artistElement.textContent();

          if (artistText?.toLowerCase().includes(searchTerm.toLowerCase())) {
            hasMatch = true;
            break;
          }
        }

        expect(hasMatch).toBeTruthy();
      } else {
        console.log('No tracks match the search term');
      }
    });

    test('should filter tracks by album', async ({ page }) => {
      await page.getByTestId('loading-tracks').waitFor({ state: 'hidden' });

      const searchTerm = '30';
      const searchInput = page.getByTestId('filter-album');
      await searchInput.fill(searchTerm);

      await page.waitForTimeout(500);
      
      const noTracksMessage = page.getByText('No tracks found');
      const isNoTracksVisible = await noTracksMessage.isVisible();
      
      if (isNoTracksVisible) {
        console.log(`No tracks found for album: ${searchTerm}`);
        return;
      }

      const trackItems = await page.getByTestId(/^track-item-/).all();

      if (trackItems.length > 0) {
        let hasMatch = false;

        for (const item of trackItems) {
          const albumElement = item.getByTestId(/album$/);
          const albumText = await albumElement.textContent();

          if (albumText?.toLowerCase().includes(searchTerm.toLowerCase())) {
            hasMatch = true;
            break;
          }
        }

        expect(hasMatch).toBeTruthy();
      } else {
        console.log('No tracks match the search term');
      }
    });

    test('should filter tracks by genre', async ({ page }) => {
      await page.getByTestId('loading-tracks').waitFor({ state: 'hidden' });

      const genreFilter = page.getByTestId('filter-genre');
      await genreFilter.click();

      await page.waitForTimeout(300);

      const genreOptions = await page.locator('div[role="dialog"] [role="option"]').all();
      
      if (genreOptions.length > 1) {
        const selectedGenre = await genreOptions[1].textContent();
        const trimmedGenre = selectedGenre?.trim();
        await genreOptions[1].click();
        
        await page.waitForTimeout(1000);
        
        const noTracksMessage = page.getByText('No tracks found');
        const isNoTracksVisible = await noTracksMessage.isVisible();
        
        if (isNoTracksVisible) {
          console.log(`No tracks found for genre: ${trimmedGenre}`);
          return;
        }

        const trackItems = await page.getByTestId(/^track-item-/);
        
        const genreElement = await trackItems.getByTestId(`genre-${trimmedGenre}`).count();
        expect(genreElement).toBeGreaterThan(0);
      } else {
        console.log('No genre options available for testing');
      }
    });
  });

  test.describe('Tracks operations', () => {
    const testTrack = {
      title: 'Test Track',
      artist: 'New Artist',
      album: 'New Album',
      coverImage: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
      genre: 'Pop'
    };
    
    const updatedTrack = {
      title: 'Updated Track',
      artist: 'Updated Artist',
      album: 'Updated Album',
      coverImage: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
      genre: 'Rock'
    };

    test('should allow to create, edit, and delete track', async ({ page }) => {
      await createTrack(page, testTrack);

      const tracksList = page.getByTestId('tracks-list');
      await expect(tracksList).toBeVisible();

      const trackItems = await page.getByTestId(/^track-item-/).all();
      expect(trackItems.length).toBeGreaterThan(0);

      const editButton = await trackItems[0].getByTestId(/edit/).first();
      await editButton.click();

      const editForm = page.getByTestId('track-form');
      await expect(editForm).toBeVisible();

      await editForm.getByTestId('input-title').fill(updatedTrack.title);
      await editForm.getByTestId('input-artist').fill(updatedTrack.artist);
      await editForm.getByTestId('input-album').fill(updatedTrack.album);
      await editForm.getByTestId('input-cover-image').fill(updatedTrack.coverImage);
      
      await editForm.getByTestId('genre-selector').click();
      const editInput = editForm.getByTestId('genre-selector').locator('input');
      await editInput.fill(updatedTrack.genre);
      await page.getByRole('option', { name: updatedTrack.genre }).click();
      await editForm.click({ position: { x: 10, y: 10 } });
      await page.waitForTimeout(300);
      
      await editForm.getByTestId('submit-button').click();
      await page.waitForTimeout(500);

      const updatedTrackTitle = page.getByTestId(/title$/).filter({ hasText: updatedTrack.title });
      await expect(updatedTrackTitle).toBeVisible();
      await expect(updatedTrackTitle).toHaveText(updatedTrack.title);

      const updatedTrackItem = page.getByTestId(/^track-item-/).filter({ has: updatedTrackTitle });
      const deleteButton = updatedTrackItem.getByTestId(/delete/).first();
      await deleteButton.click();

      const confirmButton = page.getByTestId('confirm-delete');
      await confirmButton.click();

      await page.waitForTimeout(500);
      const trackItem = await page.getByTestId(/^track-item-/).first();
      const updatedTitleElement = trackItem.getByTestId(/title$/);
      const titleText = await updatedTitleElement.textContent();
      expect(titleText).not.toBe(updatedTrack.title);
    });

    test.describe('Multiple tracks operations', () => {
      const testTrack1 = {
        title: 'Test Track 1',
        artist: 'New Artist 1',
        album: 'New Album 1',
        coverImage: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
        genre: 'Pop'
      };
      
      const testTrack2 = {
        title: 'Test Track 2',
        artist: 'New Artist 2',
        album: 'New Album 2',
        coverImage: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
        genre: 'Rock'
      };
      
      test.beforeEach(async ({ page }) => {
        await page.goto('/');
        
        await page.waitForLoadState('networkidle');
        
        await createTrackWithForce(page, testTrack1);
        
        await createTrackWithForce(page, testTrack2);
      });
      
      async function createTrackWithForce(page, track) {
        const createTrackButton = page.getByTestId('create-track-button');
        await createTrackButton.click({ force: true });
      
        const trackForm = page.getByTestId('track-form');
        await expect(trackForm).toBeVisible();
      
        await trackForm.getByTestId('input-title').fill(track.title);
        await trackForm.getByTestId('input-artist').fill(track.artist);
        await trackForm.getByTestId('input-album').fill(track.album);
        await trackForm.getByTestId('input-cover-image').fill(track.coverImage);
      
        await trackForm.getByTestId('genre-selector').click({ force: true });
        const input = trackForm.getByTestId('genre-selector').locator('input');
        await input.fill(track.genre);
        await page.getByRole('option', { name: track.genre }).click({ force: true });
        await trackForm.click({ position: { x: 10, y: 10 }, force: true });
        await page.waitForTimeout(300);
      
        await trackForm.getByTestId('submit-button').click({ force: true });
        await page.waitForTimeout(1000);
      }
      
      test.afterAll(async ({ browser }) => {
      });

      test('should allow to delete multiple tracks', async ({ page }) => {
        await page.getByTestId('loading-tracks').waitFor({ state: 'hidden' });
        
        const trackItems = await page.getByTestId(/^track-item-/).all();
        expect(trackItems.length).toBeGreaterThanOrEqual(2);

        const selectMode = page.getByTestId('select-mode-toggle');
        await selectMode.click();
        
        await page.waitForTimeout(500);
        
        const track1 = page.getByTestId(/title$/).filter({ hasText: testTrack1.title });
        const track2 = page.getByTestId(/title$/).filter({ hasText: testTrack2.title });
        
        await expect(track1).toBeVisible();
        await expect(track2).toBeVisible();
        
        const trackItem1 = page.getByTestId(/^track-item-/).filter({ has: track1 });
        const trackItem2 = page.getByTestId(/^track-item-/).filter({ has: track2 });
        
        const firstTrackCheckbox = trackItem1.getByTestId(/^track-checkbox-/);
        const secondTrackCheckbox = trackItem2.getByTestId(/^track-checkbox-/);
        
        await firstTrackCheckbox.check({ force: true });
        await secondTrackCheckbox.check({ force: true });

        const deleteButton = page.getByTestId('bulk-delete-button');
        await deleteButton.click();

        const confirmButton = page.getByTestId('confirm-delete');
        await confirmButton.click();

        await page.waitForTimeout(1000);
        
        const notification = page.getByText('Tracks deleted successfully');
        await expect(notification).toBeVisible();
        
        await expect(track1).not.toBeVisible({ timeout: 5000 });
        await expect(track2).not.toBeVisible({ timeout: 5000 });
        
        const track1Count = await page.getByTestId(/title$/).filter({ hasText: testTrack1.title }).count();
        const track2Count = await page.getByTestId(/title$/).filter({ hasText: testTrack2.title }).count();
        
        expect(track1Count).toBe(0);
        expect(track2Count).toBe(0);
      });
    });

    test('should allow to upload and play audio for a track', async ({ page }) => {
      const audioTestTrack = {
        title: 'Audio Test Track',
        artist: 'Test Artist',
        album: 'Test Album',
        coverImage: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
        genre: 'Rock'
      };
      
      await createTrack(page, audioTestTrack);
      
      const trackTitle = page.getByTestId(/title$/).filter({ hasText: audioTestTrack.title });
      await expect(trackTitle).toBeVisible();
      
      const trackItem = page.getByTestId(/^track-item-/).filter({ has: trackTitle });
      
      const uploadButton = trackItem.getByTestId(/^upload-track-/);
      await expect(uploadButton).toBeVisible();
      
      await page.evaluate(() => {
        const audioBlob = new Blob(['dummy audio content'], { type: 'audio/mp3' });
        const file = new File([audioBlob], 'test-audio.mp3', { type: 'audio/mp3' });
        
        (window as any).testAudioFile = file;
      });
      
      const fileChooserPromise = page.waitForEvent('filechooser');
      await uploadButton.click();
      const fileChooser = await fileChooserPromise;
      
      await fileChooser.setFiles({
        name: 'test-audio.mp3',
        mimeType: 'audio/mp3',
        buffer: Buffer.from('dummy audio content')
      });
      
      await page.waitForTimeout(1000);
      
      const playButton = trackItem.getByTestId(/^play-button-/).first();
      await expect(playButton).toBeVisible({ timeout: 5000 });
      
      await playButton.click();
      
      const pauseButton = trackItem.getByTestId(/^pause-button-/);
      await expect(pauseButton).toBeVisible({ timeout: 5000 });
      
      const deleteButton = trackItem.getByTestId(/delete/).first();
      await deleteButton.click();
      
      const confirmButton = page.getByTestId('confirm-delete');
      await confirmButton.click();
      
      await page.waitForTimeout(1000);
      const deletedTrackCount = await page.getByTestId(/title$/).filter({ hasText: audioTestTrack.title }).count();
      expect(deletedTrackCount).toBe(0);
    });
  });
});
