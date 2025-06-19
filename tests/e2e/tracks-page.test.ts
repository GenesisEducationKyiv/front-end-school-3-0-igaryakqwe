import { expect } from '@playwright/test';
import { test } from '../fixtures/test-tracks-fixture';

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

      const genreOptions = await page
        .locator('div[role="dialog"] [role="option"]')
        .all();

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

        const genreElement = await trackItems
          .getByTestId(`genre-${trimmedGenre}`)
          .count();
        expect(genreElement).toBeGreaterThan(0);
      } else {
        console.log('No genre options available for testing');
      }
    });
  });

  test.describe('Tracks operations', () => {
    const updatedTrack = {
      title: 'Updated Track',
      artist: 'Updated Artist',
      album: 'Updated Album',
      coverImage:
        'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg',
      genre: 'Rock',
    };

    test('should allow to create track', async ({
      page,
      deleteTrack,
      getFullTrack,
    }) => {
      const track = getFullTrack();
      const createTrackButton = page.getByTestId('create-track-button');
      await createTrackButton.click();

      const trackForm = page.getByTestId('track-form');
      await expect(trackForm).toBeVisible();

      await trackForm.getByTestId('input-title').fill(track.title);
      await trackForm.getByTestId('input-artist').fill(track.artist);
      await trackForm.getByTestId('input-album').fill(track.album as string);
      await trackForm
        .getByTestId('input-cover-image')
        .fill(track.coverImage as string);

      await trackForm.getByTestId('genre-selector').click();
      const input = trackForm.getByTestId('genre-selector').locator('input');
      await input.fill(track.genres[0]);
      await page.getByRole('option', { name: track.genres[0] }).click();
      await trackForm.click({ position: { x: 10, y: 10 } });
      await page.waitForTimeout(300);

      await trackForm.getByTestId('submit-button').click();
      await page.waitForTimeout(500);

      const trackItem = await page.getByTestId(/^track-item-/).first();
      await expect(trackItem).toBeVisible();

      const titleElement = await trackItem.getByTestId(/title$/);
      await expect(titleElement).toBeVisible();
      await expect(titleElement).toHaveText(track.title);

      const testId = await trackItem.getAttribute('data-testid');
      const trackId = testId?.split('-').at(-1);

      await deleteTrack(trackId as string);
    });

    test('should allow to edit track', async ({
      page,
      createTrack,
      deleteTrack,
      getTrack,
    }) => {
      const data = await createTrack(getTrack());

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
      await editForm
        .getByTestId('input-cover-image')
        .fill(updatedTrack.coverImage);

      await editForm.getByTestId('genre-selector').click();
      const editInput = editForm.getByTestId('genre-selector').locator('input');
      await editInput.fill(updatedTrack.genre);
      await page.getByRole('option', { name: updatedTrack.genre }).click();
      await editForm.click({ position: { x: 10, y: 10 } });
      await page.waitForTimeout(300);

      await editForm.getByTestId('submit-button').click();
      await page.waitForTimeout(500);

      const updatedTrackTitle = page
        .getByTestId(/title$/)
        .filter({ hasText: updatedTrack.title });
      await expect(updatedTrackTitle).toBeVisible();
      await expect(updatedTrackTitle).toHaveText(updatedTrack.title);

      await deleteTrack(data.id);
    });

    test('should allow to delete track', async ({
      page,
      createTrack,
      getTrack,
    }) => {
      await createTrack(getTrack());

      const tracksList = page.getByTestId('tracks-list');
      await expect(tracksList).toBeVisible();

      const trackItem = await page.getByTestId(/^track-item-/).first();
      const deleteButton = trackItem.getByTestId(/delete/).first();
      await deleteButton.click();

      const confirmButton = page.getByTestId('confirm-delete');
      await confirmButton.click();

      await page.waitForTimeout(500);
      const titleElement = trackItem.getByTestId(/title$/);
      const titleText = await titleElement.textContent();
      expect(titleText).not.toBe(updatedTrack.title);
    });

    test('should allow to delete multiple tracks', async ({
      page,
      createTrack,
      getTrack,
      getUpdatedTrack,
    }) => {
      const testTrack1 = getTrack();
      const testTrack2 = getUpdatedTrack();

      const [data1, data2] = await Promise.all([
        createTrack(testTrack1),
        createTrack(testTrack2),
      ]);

      await page.getByTestId('loading-tracks').waitFor({ state: 'hidden' });

      const trackItems = await page.getByTestId(/^track-item-/).all();
      expect(trackItems.length).toBeGreaterThanOrEqual(2);

      const selectMode = page.getByTestId('select-mode-toggle');
      await selectMode.click();

      await page.waitForTimeout(500);

      const track1 = page.getByTestId(`track-item-${data1.id}-title`);
      const track2 = page.getByTestId(`track-item-${data2.id}-title`);

      await expect(track1).toBeVisible();
      await expect(track2).toBeVisible();

      const trackItem1 = page.getByTestId(`track-item-${data1.id}`);
      const trackItem2 = page.getByTestId(`track-item-${data2.id}`);

      const firstTrackCheckbox = trackItem1.getByTestId(
        `track-checkbox-${data1.id}`
      );
      const secondTrackCheckbox = trackItem2.getByTestId(
        `track-checkbox-${data2.id}`
      );
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

      const track1Count = await page
        .getByTestId(/title$/)
        .filter({ hasText: testTrack1.title })
        .count();
      const track2Count = await page
        .getByTestId(/title$/)
        .filter({ hasText: testTrack2.title })
        .count();

      expect(track1Count).toBe(0);
      expect(track2Count).toBe(0);
    });

    test('should allow to upload and play audio for a track', async ({
      page,
      createTrack,
      getTrack,
    }) => {
      const audioTestTrack = getTrack();
      await createTrack(audioTestTrack);

      const trackTitle = page
        .getByTestId(/title$/)
        .filter({ hasText: audioTestTrack.title });
      await expect(trackTitle).toBeVisible();

      const trackItem = page
        .getByTestId(/^track-item-/)
        .filter({ has: trackTitle });

      const uploadButton = trackItem.getByTestId(/^upload-track-/);
      await expect(uploadButton).toBeVisible();

      await page.evaluate(() => {
        const audioBlob = new Blob(['dummy audio content'], {
          type: 'audio/mp3',
        });
        const file = new File([audioBlob], 'test-audio.mp3', {
          type: 'audio/mp3',
        });

        if ('testAudioFile' in window && window.testAudioFile instanceof File) {
          window.testAudioFile = file;
        }
      });

      const fileChooserPromise = page.waitForEvent('filechooser');
      await uploadButton.click();
      const fileChooser = await fileChooserPromise;

      await fileChooser.setFiles({
        name: 'test-audio.mp3',
        mimeType: 'audio/mp3',
        buffer: Buffer.from('dummy audio content'),
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
      const deletedTrackCount = await page
        .getByTestId(/title$/)
        .filter({ hasText: audioTestTrack.title })
        .count();
      expect(deletedTrackCount).toBe(0);
    });
  });
});
